@echo off

if "%1"=="--test" (
    uvicorn main:app --host 0.0.0.0 --port 8000 --log-level debug --reload
) else (
    REM print the value of the WORKERS environment variable
    echo WORKERS: %WORKERS%
    waitress-serve --listen=localhost:8000 main:app

)
