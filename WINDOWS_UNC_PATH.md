# Windows UNC Path Build Issue

## Problem

If you're running this project from a UNC path (network drive like `\\server\share\folder`), you'll encounter this error:

```
CMD.EXE was started with the above path as the current directory.
UNC paths are not supported. Defaulting to Windows directory.
Could not resolve entry module "index.html".
```

This is a **Windows CMD.EXE limitation**, not a project issue.

## Solutions

### Option 1: Map Network Drive (Recommended for Windows)

```cmd
# Map the network drive to a letter
net use Z: \\andy\d /persistent:yes

# Navigate to the project
cd Z:\Ai_directory

# Now you can build
npm run build
```

### Option 2: Clone to Local Drive

```bash
# Clone to C: drive
git clone <your-repo-url> C:\Ai_directory
cd C:\Ai_directory
npm install
npm run build
```

### Option 3: Use WSL (Windows Subsystem for Linux)

```bash
# In WSL
cd /mnt/andy/d/Ai_directory
npm install
npm run build
```

### Option 4: Use PowerShell with Push-Location

```powershell
# In PowerShell
Push-Location \\andy\d\Ai_directory
npm run build
Pop-Location
```

## For Deployment

**Good news**: This issue **only affects local Windows builds**.

Netlify uses Linux servers, so deployment will work perfectly! Just push your code to Git and deploy via Netlify - no build issues.

## Testing Without Building

You can still develop locally:

```bash
# Development server works fine even on UNC paths
npm run dev
```

The dev server (Vite) handles UNC paths better than the build process.
