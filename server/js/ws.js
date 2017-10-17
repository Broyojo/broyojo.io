
var cls = require("./lib/class"),
    url = require('url'),
    Utils = require('./utils'),
    _ = require('underscore'),
    BISON = require('bison'),
    WS = {},
    useBison = false;

module.exports = WS;


/**
 * Abstract Server and Connection classes
 */
var Server = cls.Class.extend({
    _connections: {},
    _counter: 0,

    init: function(port) {
        this.port = port;
    },
    
    onConnect: function(callback) {
        this.connection_callback = callback;
    },
    
    onError: function(callback) {
        this.error_callback = callback;
    },
    
    broadcast: function(message) {
        throw "Not implemented";
    },
    
    forEachConnection: function(callback) {
        _.each(this._connections, callback);
    },
    
    addConnection: function(connection) {
        this._connections[connection.id] = connection;
    },
    
    removeConnection: function(id) {
        delete this._connections[id];
    },
    
    getConnection: function(id) {
        return this._connections[id];
    },

    connectionsCount: function()
    {
        return Object.keys(this._connections).length
    }
});


var Connection = cls.Class.extend({
    init: function(id, connection, server) {
        this._connection = connection;
        this._server = server;
        this.id = id;
    },
    
    onClose: function(callback) {
        this.close_callback = callback;
    },
    
    listen: function(callback) {
        this.listen_callback = callback;
    },
    
    broadcast: function(message) {
        throw "Not implemented";
    },
    
    send: function(message) {
        throw "Not implemented";
    },
    
    sendUTF8: function(data) {
        throw "Not implemented";
    },
    
    close: function(logError) {
        log.info("Closing connection to "+this._connection.remoteAddress+". Error: "+logError);
        this._connection.close();
    }
});

/***************
    SOCKET.IO
    Author: Nenu Adrian
            http://nenuadrian.com
            http://codevolution.com
 ***************/

WS.socketIOServer = Server.extend({
    init: function(host, port) {
        self = this;
        self.host = host;
        self.port = port;
        var express = require('express');
        var app = express();
        var http = require('http').createServer(app);
        self.io = require('socket.io')(http);
        
        app.use(express.static('client-build'));

        self.io.on('connection', function(connection){

          log.info('a user connected');

          connection.remoteAddress = connection.handshake.address.address
          var c = new WS.socketIOConnection(self._createId(), connection, self);
          if(self.connection_callback) {
                self.connection_callback(c);
          }
          self.addConnection(c);
        });

        self.io.on('error', function (err) { 
            log.error(err.stack); 
            self.error_callback()
         })

        http.listen(port, function(){
          log.info('listening on: ' + host +":"+ port);
        });
    },

    _createId: function() {
        return '5' + Utils.random(99) + '' + (this._counter++);
    },
    
    broadcast: function(message) {
        self.io.emit("message", message)
    },

    onRequestStatus: function(status_callback) {
        this.status_callback = status_callback;
    }
  
});

WS.socketIOConnection = Connection.extend({
    init: function(id, connection, server) {

        var self = this

        this._super(id, connection, server);

        // HANDLE DISPATCHER IN HERE
        connection.on("dispatch", function (message) {
            log.info("Received dispatch request")
            self._connection.emit("dispatched",  { "status" : "OK", host : server.host, port : server.port } )
        });

        connection.on("message", function (message) {
            log.info("Received: " + message)
            if (self.listen_callback)
                self.listen_callback(message)
        });

        connection.on("disconnect", function () {
            if(self.close_callback) {
                self.close_callback();
            }
            delete self._server.removeConnection(self.id);
        });

    },
    
    broadcast: function(message) {
        throw "Not implemented";
    },
    
    send: function(message) {
        this._connection.emit("message", message);
    },
    
    sendUTF8: function(data) {
        this.send(data)
    },

    close: function(logError) {
        log.info("Closing connection to socket"+". Error: " + logError);
        this._connection.disconnect();
    }

});