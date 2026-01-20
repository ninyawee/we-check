# WebState Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
│                                                                  │
│  URL: http://localhost:3000/?webState=vote62ShowTime           │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Application                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  _app.tsx (Entry Point)                                │    │
│  │  - Initializes WebState with config on mount           │    │
│  │  - useEffect(() => initWebState({ isAllowParamDebugging })) │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  statusConfig.tsx (Configuration)                      │    │
│  │  - isAllowParamDebugging: boolean                      │    │
│  │  - VOTE62_SHOW_TIME: { hour: 16, minute: 30 }        │    │
│  │  - START_COUNTING_TIME: { hour: 17, minute: 0 }      │    │
│  │  - REPORT_DATES: string[]                             │    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  webState.ts (Middleware - Core Logic)                │    │
│  │                                                         │    │
│  │  ┌─────────────────────────────────────────────┐      │    │
│  │  │ WebState Enum                                │      │    │
│  │  │ - beforeElection                             │      │    │
│  │  │ - openUnitTime                              │      │    │
│  │  │ - vote62ShowTime                            │      │    │
│  │  │ - startCountingTime                         │      │    │
│  │  └─────────────────────────────────────────────┘      │    │
│  │                                                         │    │
│  │  ┌─────────────────────────────────────────────┐      │    │
│  │  │ WebStateManager (Class)                      │      │    │
│  │  │                                               │      │    │
│  │  │ Methods:                                      │      │    │
│  │  │ • getCurrentTime() → Date                     │      │    │
│  │  │ • isReportDay() → boolean                     │      │    │
│  │  │ • shouldShowVote62() → boolean                │      │    │
│  │  │ • isCountingTime() → boolean                  │      │    │
│  │  │ • getDebugState() → WebState | null           │      │    │
│  │  │ • isDebugging() → boolean                     │      │    │
│  │  └─────────────────────────────────────────────┘      │    │
│  │                                                         │    │
│  │  Function: getWebStateManager() → Singleton           │    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  time.store.ts (Zustand Store)                         │    │
│  │  - getCurrentTime() uses WebStateManager               │    │
│  │  - Respects both mockTime and debug state              │    │
│  └────────────────────────────────────────────────────────┘    │
│                             │                                    │
│                    ┌────────┴────────┐                          │
│                    ↓                 ↓                          │
│  ┌─────────────────────┐  ┌──────────────────────┐            │
│  │ React Components    │  │ Utility Functions    │            │
│  │                     │  │                      │            │
│  │ • vote62Button      │  │ • urlBuilder         │            │
│  │ • locationInfoForm  │  │   (buildWeWatchUrl)  │            │
│  │ • introductionPanel │  │                      │            │
│  └─────────────────────┘  └──────────────────────┘            │
│           │                          │                          │
│           └──────────┬───────────────┘                          │
│                      ↓                                          │
│  ┌────────────────────────────────────────────────────────┐   │
│  │         Uses getWebStateManager()                      │   │
│  │                                                         │   │
│  │  const manager = getWebStateManager();                 │   │
│  │  if (manager.shouldShowVote62()) { ... }              │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Normal Mode (Production)
```
User visits site
    ↓
_app.tsx initializes: initWebState({ isAllowParamDebugging: false })
    ↓
WebStateManager created
    ↓
getDebugStateFromUrl() → returns null (debugging disabled)
    ↓
getCurrentTime() → returns actual Bangkok time
    ↓
Components render based on real time
```

### Debug Mode (Development)
```
User visits: /?webState=vote62ShowTime
    ↓
_app.tsx initializes: initWebState({ isAllowParamDebugging: true })
    ↓
WebStateManager created
    ↓
getDebugStateFromUrl() → returns WebState.VOTE62_SHOW_TIME
    ↓
getCurrentTime() → returns simulated date at 16:30 on election day
    ↓
shouldShowVote62() → returns true (16:30 >= 16:30)
    ↓
Components render as if it's 16:30 on election day
```

## Component Integration

```
┌──────────────────────────────────────────────────────────────┐
│                     vote62Button.tsx                          │
│                                                               │
│  Old Code (8 lines):                                         │
│  const hour = currentTime.getHours();                        │
│  const minute = currentTime.getMinutes();                    │
│  const { hour: thresholdHour, minute: thresholdMinute }     │
│    = VOTE62_SHOW_TIME;                                       │
│  const isBeforeThreshold =                                   │
│    hour < thresholdHour ||                                   │
│    (hour === thresholdHour && minute < thresholdMinute);     │
│  if (isBeforeThreshold) return null;                         │
│                                                               │
│  New Code (2 lines):                                         │
│  const manager = getWebStateManager();                       │
│  if (!manager.shouldShowVote62()) return null;              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  locationInfoForm/index.tsx                   │
│                                                               │
│  Old Code (5 lines):                                         │
│  const currentTime = useCurrentTime();                       │
│  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);           │
│  const todayIso = `${currentTime.getFullYear()}-...`;       │
│  const isReportDay = REPORT_DATES.includes(todayIso);       │
│                                                               │
│  New Code (2 lines):                                         │
│  const manager = getWebStateManager();                       │
│  const isReportDay = manager.isReportDay();                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  introductionPanel.tsx                        │
│                                                               │
│  Old Code (9 lines with complex timeout logic):             │
│  const now = new Date();                                     │
│  const threshold = new Date();                               │
│  threshold.setHours(VOTE62_SHOW_TIME.hour, ...);           │
│  setShowCounting(now >= threshold);                          │
│  if (now < threshold) {                                      │
│    const msUntilThreshold = threshold.getTime() - ...       │
│    const timeoutId = setTimeout(...);                        │
│    return () => clearTimeout(timeoutId);                     │
│  }                                                            │
│                                                               │
│  New Code (6 lines with simple interval):                   │
│  const manager = getWebStateManager();                       │
│  const shouldShow = manager.shouldShowVote62();             │
│  setShowCounting(shouldShow);                                │
│  const interval = setInterval(() => {                        │
│    setShowCounting(manager.shouldShowVote62());             │
│  }, 60000);                                                  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      urlBuilder.ts                            │
│                                                               │
│  Old Code (8 lines):                                         │
│  const hour = currentTime.getHours();                        │
│  const minutes = currentTime.getMinutes();                   │
│  const startHour = START_COUNTING_TIME.hour;                │
│  const startMinute = START_COUNTING_TIME.minute;            │
│  const isCountingTime =                                      │
│    hour > startHour ||                                       │
│    (hour === startHour && minutes >= startMinute);          │
│                                                               │
│  New Code (2 lines):                                         │
│  const manager = getWebStateManager();                       │
│  const isCountingTime = manager.isCountingTime();           │
└──────────────────────────────────────────────────────────────┘
```

## State Transition Timeline

```
Time:     12:00        16:00        16:30        17:00        18:00
          ┊            ┊            ┊            ┊            ┊
State:    │ beforeE... │ openUnit   │ vote62...  │ startCo... │
          │            │            │            │            │
Features: │            │            │            │            │
          │            │            │            │            │
Report    ├────────────┼────────────┼────────────┼────────────┤
Features  │     ❌     │     ✅     │     ✅     │     ✅     │
          │            │            │            │            │
Vote62    ├────────────┼────────────┼────────────┼────────────┤
Button    │     ❌     │     ❌     │     ✅     │     ✅     │
          │            │            │            │            │
Counting  ├────────────┼────────────┼────────────┼────────────┤
Status    │     ❌     │     ❌     │     ✅     │     ✅     │
          │            │            │            │            │
WeWatch   ├────────────┼────────────┼────────────┼────────────┤
Form      │     N/A    │    Open    │    Open    │   Close    │
          └────────────┴────────────┴────────────┴────────────┘

Legend:
  beforeE... = beforeElection (day before election)
  openUnit = openUnitTime (election day, voting period)
  vote62... = vote62ShowTime (16:30 - counting visible)
  startCo... = startCountingTime (17:00 - full counting)
```

## Security Model

```
┌─────────────────────────────────────────────────────────┐
│              Production Environment                      │
│                                                          │
│  statusConfig.tsx:                                       │
│    isAllowParamDebugging = false ← Default              │
│                                                          │
│  Query params: /?webState=vote62ShowTime                │
│                                                          │
│  getDebugStateFromUrl():                                │
│    if (!config.isAllowParamDebugging) {                 │
│      return null; ← Blocked                             │
│    }                                                     │
│                                                          │
│  Result: Normal operation, no simulation                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            Development Environment                       │
│                                                          │
│  statusConfig.tsx:                                       │
│    isAllowParamDebugging = true ← Enabled               │
│                                                          │
│  Query params: /?webState=vote62ShowTime                │
│                                                          │
│  getDebugStateFromUrl():                                │
│    if (!config.isAllowParamDebugging) { ... }           │
│    validates state against WebState enum                │
│    return WebState.VOTE62_SHOW_TIME ← Allowed           │
│                                                          │
│  Result: Simulation active, testing enabled             │
└─────────────────────────────────────────────────────────┘
```

## Benefits Summary

### Before WebState
- ❌ Manual time calculations in each component
- ❌ Duplicate logic across 4+ files
- ❌ Hard to test different scenarios
- ❌ Complex timeout/interval logic
- ❌ No centralized time management

### After WebState
- ✅ Single source of truth for time logic
- ✅ One-line integration in components
- ✅ Easy scenario testing via URL params
- ✅ Simplified component code
- ✅ Type-safe state management
- ✅ Production-safe by default
- ✅ SSR-compatible

## File Structure

```
we-check/
├── src/
│   ├── config/
│   │   └── statusConfig.tsx         ← Configuration + flag
│   ├── utils/
│   │   ├── webState.ts              ← Middleware (NEW)
│   │   └── urlBuilder.ts            ← Updated to use middleware
│   ├── store/
│   │   └── time.store.ts            ← Updated to use middleware
│   ├── pages/
│   │   └── _app.tsx                 ← Initialize WebState
│   └── components/
│       ├── forms/
│       │   └── locationInfoForm/
│       │       ├── index.tsx        ← Updated
│       │       └── vote62Button.tsx ← Updated
│       └── panels/
│           └── introductionPanel.tsx ← Updated
├── WEBSTATE_QUICKSTART.md           ← Quick reference
├── WEBSTATE_TESTING.md              ← Testing guide
├── IMPLEMENTATION_SUMMARY.md        ← Technical details
└── ARCHITECTURE.md                  ← This file
```
