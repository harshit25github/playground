@echo off
setlocal
pushd "%~dp0..\11-node-json-db" >nul
node server.js
popd >nul

