# WebState Testing Guide

This document explains how to use the WebState simulation feature for testing different election states.

## Overview

The WebState middleware allows developers and testers to simulate different election day scenarios using query parameters, making it easier to test UI behavior without waiting for actual election times.

## Configuration

The feature is controlled by the `isAllowParamDebugging` flag in `src/config/statusConfig.tsx`:

```typescript
export const isAllowParamDebugging = false; // Set to true to enable debugging
```

**Important:** This should be set to `false` in production to prevent unauthorized state simulation.

## Available States

The following states can be simulated via the `webState` query parameter:

### 1. beforeElection
Simulates a time before election day.
```
http://localhost:3000/?webState=beforeElection
```
**Behavior:**
- Report day features are hidden
- Vote62 button is hidden
- Counting status is not shown

### 2. openUnitTime
Simulates election day during voting hours (10:00 AM), before vote62ShowTime.
```
http://localhost:3000/?webState=openUnitTime
```
**Behavior:**
- Report day features are visible (if configured)
- Vote62 button is hidden
- Counting status is not shown
- WeWatch form uses "open unit" form

### 3. vote62ShowTime
Simulates election day at vote62ShowTime (16:30).
```
http://localhost:3000/?webState=vote62ShowTime
```
**Behavior:**
- Report day features are visible
- Vote62 button becomes visible
- Counting status is shown in intro panel
- WeWatch form uses "open unit" form

### 4. startCountingTime
Simulates election day at startCountingTime (17:00).
```
http://localhost:3000/?webState=startCountingTime
```
**Behavior:**
- All features are visible
- Vote62 button is visible
- Counting status is shown
- WeWatch form switches to "close unit" form

## Usage Examples

### Development Testing
1. Enable debugging in `statusConfig.tsx`:
   ```typescript
   export const isAllowParamDebugging = true;
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Navigate to the app with a query parameter:
   ```
   http://localhost:3000/?webState=startCountingTime
   ```

4. The UI will behave as if it's currently at the start of counting time on election day.

### Testing Different Scenarios

To test the Vote62 button appearance:
```
http://localhost:3000/?webState=vote62ShowTime
```

To test the WeWatch form switching:
- Before 17:00: `http://localhost:3000/?webState=openUnitTime`
- After 17:00: `http://localhost:3000/?webState=startCountingTime`

To test report day features:
```
http://localhost:3000/?webState=openUnitTime
```

## Implementation Details

### WebState Manager API

The WebState manager provides the following methods:

```typescript
import { getWebStateManager } from '@/src/utils/webState';

const webStateManager = getWebStateManager();

// Get current time (respects debug state)
const currentTime = webStateManager.getCurrentTime();

// Check if it's a report day
const isReportDay = webStateManager.isReportDay();

// Check if Vote62 should be shown
const shouldShowVote62 = webStateManager.shouldShowVote62();

// Check if we're in counting time
const isCountingTime = webStateManager.isCountingTime();

// Get current debug state (if any)
const debugState = webStateManager.getDebugState();

// Check if debugging is active
const isDebugging = webStateManager.isDebugging();
```

### Integration with Time Store

The existing `useCurrentTime` hook from `time.store.ts` automatically uses WebState when debugging is enabled. No changes are needed to components that already use this hook.

## Security Notes

- The `isAllowParamDebugging` flag **must** be set to `false` in production builds
- Query parameter debugging only works when explicitly enabled
- The WebState manager safely handles SSR scenarios
- No sensitive data is exposed through debug states

## Debugging Tips

1. Check browser console for any WebState-related messages
2. Use React DevTools to inspect component state
3. Verify the query parameter is correctly formatted
4. Ensure `isAllowParamDebugging` is enabled in config
5. Refresh the page after changing query parameters
