Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Launching KarmaSiksha Government Portal..." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Start-Process "http://localhost:5173"
Set-Location -Path "$PSScriptRoot\client"
npm run dev
