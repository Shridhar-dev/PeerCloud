@echo off
:: BatchGotAdmin
:-------------------------------------
REM --> Check for permissions
net session >nul 2>&1
if %errorLevel% == 0 (
    goto gotAdmin
) else (
    echo Requesting administrative privileges...
    powershell start-process -verb runAs -FilePath "%~f0"
    exit /b
)

:gotAdmin
pushd "%~dp0"

setlocal

echo Installing 'peer://' protocol handler...

REM Get current directory of this script
set "CURRENT_DIR=%~dp0"

REM Add the main protocol key
reg add "HKEY_CLASSES_ROOT\peer" /ve /d "URL:Peer Protocol" /f

REM Add the URL Protocol flag (required)
reg add "HKEY_CLASSES_ROOT\peer" /v "URL Protocol" /d "" /f

REM Add the command to execute your EXE
reg add "HKEY_CLASSES_ROOT\peer\shell\open\command" /ve /d "\"%CURRENT_DIR%peer.exe\" \"%%1\"" /f

echo.
echo Successfully registered peer:// protocol!
pause
