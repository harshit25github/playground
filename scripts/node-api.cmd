@echo off
setlocal
pushd "%~dp0..\10-node-http-api" >nul
node server.js
popd >nul

