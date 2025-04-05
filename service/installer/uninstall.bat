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

echo Uninstalling 'peer://' protocol handler...

REM Delete the protocol key
reg delete "HKEY_CLASSES_ROOT\peer" /f

echo.
echo 'peer://' protocol handler removed successfully!
pause
