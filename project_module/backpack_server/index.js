const http = require('http');

class Server{
    constructor(config){
        this._host = config.host;
        this._port = config.port;
        this.eventEmitter = config.eventEmitter;
        this.routeReq = config.routeReq;
    }

    start(){
        http.createServer((request,response)=>{
            this._eventEmitter(this._routeReq,request,response);
        })
        .listen(this._port,this._host,()=>{
            console.log(`server start on ${this._port} port successfully`);
        });
    }
}
module.exports = Server;