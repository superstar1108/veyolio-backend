@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
set NEXT_TELEMETRY_DISABLED=1

rem ---------------------------------------------------------------
rem  VPN-friendly installer (tested approach for Astrill VPN)
rem  - Uses Astrill's system proxy automatically if it is turned on
rem  - Retries dropped connections, keeps already-downloaded packages
rem  - Falls back to a single connection on later attempts
rem ---------------------------------------------------------------

set "PROXY_ARGS="
set "PROXY_ON="
set "PROXY_SERVER="
set "REGKEY=HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings"
for /f "tokens=3" %%a in ('reg query "%REGKEY%" /v ProxyEnable 2^>nul ^| find "ProxyEnable"') do set "PROXY_ON=%%a"
if "%PROXY_ON%"=="0x1" (
  for /f "tokens=3" %%a in ('reg query "%REGKEY%" /v ProxyServer 2^>nul ^| find "ProxyServer"') do set "PROXY_SERVER=%%a"
)
if not defined PROXY_SERVER goto noproxy
rem Skip per-protocol formats like "http=host:port;https=host:port"
echo %PROXY_SERVER%| find "=" >nul
if not errorlevel 1 goto noproxy
echo Using Windows/Astrill system proxy: http://%PROXY_SERVER%
set "PROXY_ARGS=--proxy=http://%PROXY_SERVER% --https-proxy=http://%PROXY_SERVER%"
rem Prisma downloads its engine separately and reads these variables
set "HTTP_PROXY=http://%PROXY_SERVER%"
set "HTTPS_PROXY=http://%PROXY_SERVER%"
:noproxy
if not defined PROXY_ARGS echo No system proxy detected - connecting directly (or through Astrill's tunnel).

if exist node_modules (
  echo Removing old partial install...
  rmdir /s /q node_modules
)
if exist node_modules (
  echo.
  echo Could not delete node_modules - files are locked.
  echo Close VS Code and any "npm run dev" windows, or restart your PC, then run this again.
  exit /b 1
)

set /a tries=0
:retry
set /a tries+=1
set "EXTRA="
if !tries! GEQ 3 set "EXTRA=--maxsockets=1"
echo.
echo === npm install - attempt !tries! of 6 !EXTRA! ===
call npm install !PROXY_ARGS! !EXTRA!
if !errorlevel!==0 goto ok
if !tries! GEQ 6 goto fail
echo Connection dropped. Retrying in 15 seconds (already-downloaded packages are kept)...
timeout /t 15 /nobreak >nul
goto retry

:ok
echo.
echo Install complete.
if exist prisma (
  echo Next: set DATABASE_URL in .env, then run  npm run db:generate  and  npm run dev
) else (
  echo Next: npm run dev
)
exit /b 0

:fail
echo.
echo Install still failing. See VPN-SETUP.md - add node.exe to Astrill's App Filter exclusions.
exit /b 1
