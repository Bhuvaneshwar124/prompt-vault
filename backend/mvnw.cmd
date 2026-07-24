@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script for Windows
@REM ----------------------------------------------------------------------------

@if "%DEBUG%" == "" @echo off
@classloader wrapper

set ERROR_CODE=0

@REM set LOCAL_JAVA_HOME
if not "%JAVA_HOME%" == "" goto OkJHome
set JAVA_HOME=C:\Program Files\Java\jdk-16.0.1

:OkJHome
if exist "%JAVA_HOME%\bin\java.exe" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory.
echo.
goto error

:init
set MAVEN_PROJECTBASEDIR=%~dp0
if not "%MAVEN_PROJECTBASEDIR%" == "" goto strip
set MAVEN_PROJECTBASEDIR=.

:strip
if "%MAVEN_PROJECTBASEDIR:~-1%" == "\" set MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%
goto run

:run
set MAVEN_WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

"%JAVA_HOME%\bin\java.exe" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -classpath %MAVEN_WRAPPER_JAR% %WRAPPER_LAUNCHER% %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
cmd /C exit /B %ERROR_CODE%
