#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "No se encontro npm en el PATH."
  echo "Instala Node.js o abre una terminal donde node y npm funcionen."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install
fi

echo
echo "Levantando portafolio Astro en:"
echo "http://localhost:1212/Alex/"
echo
npm run dev -- --host 127.0.0.1 --port 1212
