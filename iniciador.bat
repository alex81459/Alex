@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo No se encontro npm en el PATH.
  echo Instala Node.js o abre una terminal donde node y npm funcionen.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo Fallo npm install.
    pause
    exit /b 1
  )
)

echo.
echo Levantando portafolio Astro en:
echo http://localhost:1212/Alex/
echo.
call npm run dev -- --host 127.0.0.1 --port 1212

pause
