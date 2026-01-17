# 🧪 WebState Quick Start Guide

## What is WebState?

WebState is a testing middleware that lets you simulate different election day scenarios using URL parameters. No more waiting for specific times to test features!

## Quick Setup (2 Steps)

### 1️⃣ Enable Debug Mode
```typescript
// File: src/config/statusConfig.tsx
export const isAllowParamDebugging = true; // ⚠️ Development only!
```

### 2️⃣ Start Testing
```bash
npm run dev
```

## 🎯 Test URLs

Copy and paste these URLs to test different states:

```
🕐 Before Election (nothing visible)
http://localhost:3000/?webState=beforeElection

🗳️ Voting Period (report features visible, no Vote62)
http://localhost:3000/?webState=openUnitTime

📊 Vote62 Appears (16:30 - counting visible)
http://localhost:3000/?webState=vote62ShowTime

🔢 Counting Mode (17:00 - full counting mode)
http://localhost:3000/?webState=startCountingTime

🔄 Normal Mode (no simulation)
http://localhost:3000/
```

## 📱 What Changes Per State?

| Feature | beforeElection | openUnitTime | vote62ShowTime | startCountingTime |
|---------|---------------|--------------|----------------|-------------------|
| Report Day Features | ❌ | ✅ | ✅ | ✅ |
| Vote62 Button | ❌ | ❌ | ✅ | ✅ |
| Counting Status | ❌ | ❌ | ✅ | ✅ |
| WeWatch Form Type | - | Open | Open | Close |

## 💻 Code Usage

```typescript
import { getWebStateManager } from '@/src/utils/webState';

const manager = getWebStateManager();

// Check what time it is (respects debug state)
const currentTime = manager.getCurrentTime();

// Check if Vote62 should show
if (manager.shouldShowVote62()) {
  // Show Vote62 button
}

// Check if we're in counting mode
if (manager.isCountingTime()) {
  // Use close unit form
}

// Check if it's a report day
if (manager.isReportDay()) {
  // Show report features
}
```

## 🔒 Production Safety

**IMPORTANT**: Always set this to `false` before deploying!

```typescript
// Production setting
export const isAllowParamDebugging = false;
```

When `false`, all query parameters are ignored and the app works normally.

## 🐛 Troubleshooting

**Q: Query parameter doesn't work?**  
A: Check that `isAllowParamDebugging = true` in `statusConfig.tsx`

**Q: Changes don't appear?**  
A: Refresh the page after changing the URL parameter

**Q: How do I test without query params?**  
A: Just visit `http://localhost:3000/` without any parameters

## 📚 More Information

- **Full Testing Guide**: See `WEBSTATE_TESTING.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Interactive Test Page**: Open `webstate-test.html` in browser (if created)

## 🎨 Visual State Flow

```
┌──────────────────┐
│ beforeElection   │ → Nothing visible
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ openUnitTime     │ → Report features appear
└────────┬─────────┘   (10:00 on election day)
         │
         ↓
┌──────────────────┐
│ vote62ShowTime   │ → Vote62 button + counting status
└────────┬─────────┘   (16:30 on election day)
         │
         ↓
┌──────────────────┐
│ startCountingTime│ → Full counting mode, form switches
└──────────────────┘   (17:00 on election day)
```

## ⚡ One-Liner Examples

Test Vote62 button:
```bash
open http://localhost:3000/?webState=vote62ShowTime
```

Test form switching:
```bash
# Before 17:00
open http://localhost:3000/?webState=openUnitTime

# After 17:00  
open http://localhost:3000/?webState=startCountingTime
```

Test report day features:
```bash
open http://localhost:3000/?webState=openUnitTime
```

---

**Happy Testing! 🚀**

Remember: This is a development tool. Always disable in production!
