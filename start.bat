@echo off
echo ==========================================
echo    ClaimNet - Insurance Claim AI System
echo ==========================================
echo.

:: Check if virtual environment exists
if not exist "backend\venv" (
    echo Creating Python virtual environment...
    cd backend
    python -m venv venv
    cd ..
)

:: Start Backend
echo Starting Backend Server...
echo.
start "ClaimNet Backend" cmd /k "cd backend && venv\Scripts\activate && pip install -r requirements.txt && python app.py"

:: Wait a bit for backend to start
timeout /t 3 /nobreak > nul

:: Start Frontend
echo Starting Frontend Development Server...
echo.
start "ClaimNet Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ==========================================
echo    Both servers are starting!
echo.
echo    Backend:  http://localhost:5000
echo    Frontend: http://localhost:5173
echo ==========================================
echo.
echo Press any key to close this window...
pause > nul
