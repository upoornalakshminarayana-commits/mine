@echo off
echo ========================================================
echo   Launching KarmaSiksha Government Portal...
echo ========================================================
cd /d "%~dp0client"
start http://localhost:5173
npm run dev
