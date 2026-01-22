# Troubleshooting Guide

Common issues and solutions for the Issue Tracker frontend.

## 🔗 API Connection Issues

### Problem: "Cannot connect to API" or 404 errors

**Symptoms:**
- Network request fails
- "Failed to fetch" error in console
- Blank issue list

**Solutions:**
1. **Check if backend is running**
   ```bash
   # In terminal, verify backend is on port 5000
   curl http://localhost:5000/health
   ```

2. **Verify API base URL**
   - Check `.env.local` file
   - Ensure `VITE_API_BASE_URL=http://localhost:5000`
   - Restart dev server after changing env variables: `npm run dev`

3. **Check CORS settings (backend)**
   - Backend must allow `http://localhost:5173`
   - Check backend `.env` for CORS configuration

---

## 🔐 Authentication Issues

### Problem: "401 Unauthorized" when accessing protected routes

**Symptoms:**
- Redirected to login page
- "Unauthorized" error messages
- Can't access dashboard after login

**Solutions:**
1. **Token not being stored**
   - Check browser DevTools → Application → Local Storage
   - Should have `auth_token`, `user_id`, `user_email` keys
   - If missing, registration/login failed silently

2. **Token has expired**
   - Log out and log in again
   - Current tokens don't have refresh mechanism

3. **Incorrect credentials**
   - Email must be valid format: `user@example.com`
   - Password must have:
     - Minimum 6 characters
     - At least one number
     - At least one special character (!@#$%^&*)
   - Example: `Password123!`

### Problem: "Can't log in" or "Invalid credentials"

**Solutions:**
1. **Check email format**
   ```
   ✅ user@example.com
   ❌ user@example
   ❌ userexample.com
   ```

2. **Check password requirements**
   ```
   ✅ Pass123!
   ✅ MyPassword2022$
   ❌ password (no number/special char)
   ❌ Pass1 (too short)
   ```

3. **User already exists**
   - Try logging in instead of registering
   - If forgot password, no recovery option (out of scope)

4. **Backend validation error**
   - Check browser console for exact error message
   - Verify backend is running and accepting requests

---

## 📊 Data Display Issues

### Problem: Issues list is empty

**Symptoms:**
- Dashboard shows no issues
- Search doesn't work
- Filters disabled

**Solutions:**
1. **No issues created yet**
   - Click green FAB button (bottom-right)
   - Create your first issue
   - Make sure title is filled in

2. **Search filter too restrictive**
   - Clear search input
   - Reset all filters to "All"
   - Click Previous/Next to check other pages

3. **API not returning data**
   - Open DevTools → Network tab
   - Make a request to `/issue/all`
   - Check response status and body
   - If 500 error, backend has a problem

### Problem: Labels don't show up

**Symptoms:**
- Label filter shows no options
- Can't assign labels to issues
- Label management page is empty

**Solutions:**
1. **Create labels first**
   - Go to Dashboard → Click "Labels" button (top-right)
   - Click "Create Label" button
   - Fill in label name and color
   - Click "Save"

2. **Labels not fetching**
   - Check network tab for `/label/all` request
   - Verify response status is 200
   - Check browser console for errors

3. **Label color not visible**
   - Hex color format required: `#FF5733`
   - Some colors may not contrast well
   - Try: `#FF0000` (red), `#00FF00` (green), `#0000FF` (blue)

---

## 💬 Comments Issues

### Problem: "Comment doesn't appear after posting"

**Symptoms:**
- Comment form submits but no comment shows up
- Need to refresh page to see comment
- Comment appears then disappears

**Solutions:**
1. **Automatic refetch working**
   - This is normal behavior during development
   - React Query refetches after mutation
   - If persists, check network tab

2. **Comment form validation**
   - Make sure comment text is not empty
   - Minimum 1 character
   - No maximum limit

3. **API error silently failing**
   - Check browser console
   - Look for 400/500 errors
   - Verify issue ID is valid

### Problem: Can't edit/delete own comments

**Symptoms:**
- Edit/Delete buttons don't appear
- Can see comments but no action buttons
- Buttons disabled/grayed out

**Solutions:**
1. **User ID mismatch**
   - System checks `comment.user_id === current_user_id`
   - Make sure you're logged in as the comment author
   - Comments from other users are read-only

2. **UI not rendering**
   - Hard refresh page: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Clear browser cache
   - Try different browser

---

## 🔄 Pagination Issues

### Problem: "Next button doesn't work" or pagination stuck

**Symptoms:**
- Next/Previous buttons disabled when shouldn't be
- Page doesn't change when clicking
- Always showing page 1

**Solutions:**
1. **Invalid page parameters**
   - Page size must be: 10, 25, or 50
   - Page number must be >= 1
   - Reset page size dropdown

2. **Data hasn't loaded**
   - Wait for loading spinner to disappear
   - Check network tab for pending requests
   - Verify API returned proper `total` count

3. **Filter changed, pagination reset**
   - When you apply filters, it goes back to page 1
   - This is expected behavior
   - Apply filters then navigate pages

### Problem: "Wrong issue count or missing issues"

**Solutions:**
1. **Page size changed issues count**
   - Change page size: 10 items → 25 items
   - Same issues, different pagination
   - Issue count should be total across all pages

2. **Search filter hiding issues**
   - Clear search input to see all
   - Only matching issues shown in search results

---

## 🚫 Permission/Validation Errors

### Problem: "403 Forbidden" or "Not allowed to..."

**Symptoms:**
- Can view but can't edit/delete
- Permission denied errors
- Action buttons disabled

**Solutions:**
1. **Not the issue creator**
   - Can only edit/delete your own issues
   - Comments: can only edit/delete your own comments
   - Labels: check backend permissions

2. **Session expired**
   - Token may have expired
   - Log out and log in again
   - Token refresh not implemented (out of scope)

### Problem: Form validation errors

**Symptoms:**
- "Invalid input" error
- Form won't submit
- Red error messages

**Common validation errors:**

| Error | Solution |
|-------|----------|
| Invalid email | Use format: `user@domain.com` |
| Password too weak | Add number + special char (!@#$%^&*) |
| Title required | Fill in issue title |
| Status required | Select status from dropdown |
| Priority required | Select priority from dropdown |

---

## ⚙️ Development Issues

### Problem: HMR (Hot Module Replacement) not working

**Symptoms:**
- Changes don't appear automatically
- Need to manually refresh browser
- Vite server running but not updating

**Solutions:**
```bash
# Stop dev server
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### Problem: TypeScript errors in IDE but build passes

**Symptoms:**
- Red squiggly lines in VS Code
- `npm run build` succeeds
- No actual errors

**Solutions:**
1. **Reload VS Code**
   - Press `Ctrl+Shift+P`
   - Type "reload window"
   - Press Enter

2. **TypeScript version mismatch**
   ```bash
   npm install typescript@latest
   ```

3. **Update workspace settings**
   - Settings → TypeScript Version
   - Choose "Use Workspace Version"

---

## 🧹 General Troubleshooting

### "Clear Everything" Reset

If you're stuck, try these steps in order:

```bash
# 1. Stop dev server (Ctrl+C in terminal)

# 2. Clear all caches
rm -rf node_modules
npm cache clean --force

# 3. Reinstall
npm install

# 4. Clear browser data
# DevTools → Application → Local Storage → Clear All

# 5. Restart dev server
npm run dev

# 6. Hard refresh browser
# Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

---

## 📞 Getting More Help

### Check These Resources

1. **API Documentation**
   - See [API_INTEGRATION.md](./API_INTEGRATION.md)
   - Request/response formats
   - Common API patterns

2. **Component Documentation**
   - See [COMPONENTS.md](./COMPONENTS.md)
   - How components work
   - Props and usage

3. **Development Guide**
   - See [DEVELOPMENT.md](./DEVELOPMENT.md)
   - Common patterns
   - Debugging tips

4. **Postman Collection**
   - File: `issue_tracker.postman_collection.json`
   - Test backend endpoints directly
   - Import into Postman to validate API
   - **Location:** `/frontend/docs/issue_tracker.postman_collection.json`

### Browser DevTools Debugging

**Network Tab:**
- Monitor API requests
- Check status codes (200, 400, 401, 500)
- View request/response bodies
- Verify Authorization header present

**Console Tab:**
- Check for JavaScript errors
- Log messages from app
- Clear console: `console.clear()`

**Application Tab:**
- View Local Storage (auth tokens)
- Check Cookies
- View IndexedDB (if used)

**React DevTools Extension:**
- Install: [React DevTools](https://chrome.google.com/webstore)
- Inspect component state
- Track re-renders
- Debug hooks

---

## 🐛 Reporting Bugs

When reporting an issue:

1. **Browser DevTools output**
   - Screenshot of error message
   - Console logs (copy-paste)

2. **Postman request/response**
   - Export request from Postman
   - Show request headers
   - Show response body

3. **Environment info**
   - Node version: `node --version`
   - npm version: `npm --version`
   - OS: Windows/Mac/Linux

4. **Steps to reproduce**
   - Clear steps
   - "After logging in, clicking X causes Y"
   - Include any error messages

---

Last Updated: January 2026
