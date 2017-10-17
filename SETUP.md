## Browser Quest Server
The server settings (number of worlds, number of players per world, etc.) can be configured. Edit `config_local.json` file, and it will override the default settings with this file.

## Browser Quest Client
The client directory should never be directly deployed to staging/production. Deployment steps:

1) Configure the websocket host/port:

In the client/config/ directory, edit `config_build.json` and set the host/port settings.

2) Run the following commands from the project root:

* cd bin
* chmod +x build.sh
* ./build.sh

This will use the RequireJS optimizer tool to create a client-build/ directory containing a production-ready version of BrowserQuest. 
