import express = require('express');
import socketIO from 'socket.io';
import path = require('path');
import http from 'http';

import * as socket from '../sockets/sockets'; 

export default class Server{
    private static _instance: Server;
    
    public app: express.Application;
    public port: any;
    public httpServer: http.Server;

    // Varialbes para sockets
    public io: socketIO.Server;
    //public hostname: string;

    private constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        // this.hostname = '10.11.118.91';
        // this.hostname = '10.11.126.114';
        //this.hostname = 'localhost'
        
        // Inicializar configuración de sockets 
        this.httpServer = new http.Server( this.app );
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    // Evita la declaración de varias instancias 
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static init(){
        return new Server();
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use( express.static( publicPath ));
        // this.app.use( express.static(__dirname + '/public'));
    }

    start(callback: any){
        this.httpServer.listen( this.port, callback);
        this.publicFolder();
    }

    // S O C K E T S
    escucharSockets(){
        this.io.on('connection', (cliente) =>{
            socket.SK_USUARIO_CONECTADO(cliente);
        });
    }

    public emitirConsultasActualizadas( consultas: Object){
        this.io.emit('listaConsultasActualizada', consultas);
    }

}
