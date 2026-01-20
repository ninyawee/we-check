# WebState Implementation Summary

## Overview
This PR introduces a WebState simulation feature that allows developers and testers to simulate different election day scenarios using query parameters. This makes it easier to test UI behavior without waiting for actual election times.

## Changes Made

### 1. Core Implementation (`src/utils/webState.ts`)
Created a comprehensive WebState middleware module with:
- **WebState Enum**: Four states for different election scenarios
  - `beforeElection` - Before election day
  - `openUnitTime` - Election day during voting (10:00)
  - `vote62ShowTime` - At vote62 threshold (16:30)
  - `startCountingTime` - At counting start (17:00)

- **WebStateManager Class**: Provides methods for:
  - `getCurrentTime()` - Returns simulated or actual Bangkok time
  - `isReportDay()` - Checks if current date is a report day
  - `shouldShowVote62()` - Determines Vote62 button visibility
  - `isCountingTime()` - Checks if in counting period
  - `getDebugState()` - Returns current debug state
  - `isDebugging()` - Checks if debugging is active

- **Singleton Pattern**: `getWebStateManager()` provides a singleton instance
- **SSR-Safe**: Handles server-side rendering gracefully
- **Security**: Only works when explicitly enabled via config

### 2. Configuration (`src/config/statusConfig.tsx`)
Added:
```typescript
export const isAllowParamDebugging = false;
```
- Disabled by default for production safety
- Must be explicitly enabled for testing

### 3. Application Initialization (`src/pages/_app.tsx`)
- Added `useEffect` to initialize WebState configuration on app mount
- Imports and passes `isAllowParamDebugging` to `initWebState()`

### 4. Time Store Integration (`src/store/time.store.ts`)
Updated `getCurrentTime()` to:
- Use WebStateManager to get current time
- Respect debug state when active
- Maintain backward compatibility with mock time

### 5. Component Refactoring
Refactored four components to use WebState middleware:

#### a. `src/components/forms/locationInfoForm/vote62Button.tsx`
- Replaced manual time checks with `webStateManager.shouldShowVote62()`
- Simplified logic from 8 lines to 2 lines

#### b. `src/components/forms/locationInfoForm/index.tsx`
- Replaced manual date formatting and checking with `webStateManager.isReportDay()`
- Removed `useCurrentTime` hook dependency (no longer needed)

#### c. `src/components/panels/introductionPanel.tsx`
- Updated to use `webStateManager.shouldShowVote62()`
- Replaced complex timeout logic with interval-based checking
- Cleaner and more maintainable

#### d. `src/utils/urlBuilder.ts`
- Updated `buildWeWatchUrl()` to use `webStateManager.isCountingTime()`
- Removed direct config imports
- Centralized time logic through middleware

### 6. Documentation
Created comprehensive documentation:
- **WEBSTATE_TESTING.md**: Complete testing guide with usage examples
- **webstate-test.html**: Interactive HTML testing interface (gitignored)
- **test-webstate.js**: Node.js test script (gitignored)

### 7. Build Configuration
Updated `.gitignore` to exclude:
- `tsconfig.tsbuildinfo` - TypeScript build info
- `.eslintrc.json` - Generated ESLint config
- `test-webstate.js` - Test script
- `webstate-test.html` - Test HTML file

## How It Works

### Normal Operation (Production)
1. `isAllowParamDebugging` is `false`
2. Query parameters are ignored
3. WebStateManager returns actual Bangkok time
4. App behaves normally based on real time

### Debug Mode (Development)
1. Developer sets `isAllowParamDebugging = true`
2. Navigates to URL with `?webState=<state>` parameter
3. WebStateManager detects debug state
4. Returns simulated time for that state
5. All components using the middleware automatically reflect the simulated state

### Example Flow
```
URL: http://localhost:3000/?webState=vote62ShowTime
↓
WebStateManager detects debug state
↓
getCurrentTime() returns simulated date at 16:30 on election day
↓
shouldShowVote62() returns true
↓
Vote62 button becomes visible
```

## Usage

### Enabling Debug Mode
```typescript
// src/config/statusConfig.tsx
export const isAllowParamDebugging = true; // Enable for testing
```

### Testing Different States
```
http://localhost:3000/?webState=beforeElection      # Before election
http://localhost:3000/?webState=openUnitTime        # Voting period
http://localhost:3000/?webState=vote62ShowTime      # Vote62 visible
http://localhost:3000/?webState=startCountingTime   # Counting mode
```

### Programmatic Usage
```typescript
import { getWebStateManager } from '@/src/utils/webState';

const manager = getWebStateManager();
const currentTime = manager.getCurrentTime();
const shouldShow = manager.shouldShowVote62();
```

## Benefits

1. **Easier Testing**: Test different election scenarios without waiting
2. **Centralized Logic**: All time-based logic in one place
3. **Type Safety**: TypeScript enum ensures valid states
4. **Backward Compatible**: Existing mock time still works
5. **Secure**: Disabled by default, requires explicit enabling
6. **Clean Code**: Simplified component logic
7. **Maintainable**: Single source of truth for time logic

## Testing Verification

✅ TypeScript compilation: Passed (`npx tsc --noEmit`)
✅ Linting: No new errors introduced
✅ All affected components updated consistently
✅ Documentation provided
✅ Security considered (disabled by default)

## Files Changed

### Created
- `src/utils/webState.ts` (208 lines)
- `WEBSTATE_TESTING.md` (142 lines)

### Modified
- `src/config/statusConfig.tsx` (+3 lines)
- `src/pages/_app.tsx` (+6 lines)
- `src/store/time.store.ts` (+3 lines, -5 lines)
- `src/components/forms/locationInfoForm/vote62Button.tsx` (+3 lines, -8 lines)
- `src/components/forms/locationInfoForm/index.tsx` (+2 lines, -5 lines)
- `src/components/panels/introductionPanel.tsx` (+6 lines, -9 lines)
- `src/utils/urlBuilder.ts` (+3 lines, -8 lines)
- `.gitignore` (+7 lines)

### Total Impact
- **Lines Added**: ~360
- **Lines Removed**: ~35
- **Net Change**: +325 lines (mostly new middleware and documentation)
- **Components Simplified**: 4
- **Code Quality**: Improved (centralized logic, better maintainability)

## Security Considerations

1. **Production Safety**: `isAllowParamDebugging` defaults to `false`
2. **No Data Exposure**: Debug mode only affects time simulation
3. **Query Validation**: Invalid states are safely ignored
4. **SSR Handling**: Works correctly during server-side rendering
5. **Type Safety**: Enum prevents invalid state strings

## Next Steps for Deployment

Before deploying to production:
1. ✅ Verify `isAllowParamDebugging = false` in statusConfig
2. ✅ Run production build
3. ✅ Test normal operation without query params
4. ✅ Verify no debug states leak into production

## Conclusion

This implementation successfully introduces a robust, secure, and easy-to-use WebState simulation feature that significantly improves the testing experience while maintaining production safety and code quality.
