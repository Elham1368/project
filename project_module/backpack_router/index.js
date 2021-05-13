const conf = require('.\config.js');

class Router{
    constructor(config){
        this._eventEmitter = config._eventEmitter;
        this._routes = {};
        this._routeReq = config.routeReq;
        this._requestListener();
    }

    addRoute(routeObj){
        if(!this._routes.hasOwnProperty(routeObj.route)){
            this._routes[routeObj.route] = {};
        }

        this._routes[routeObj.route][routeObj.method]={
            function : routeObj.function,
            middleWares : routeObj.middleWares
        };

    }
    _route(request,response){
        const route = request.url.split('?')[0];
        if(!this._routes.hasOwnProperty(route) || !this._routes[route].hasOwnProperty(request.method)){
            console.log(`${conf.error.code}:${conf.error.message}`);
        }

        const middleWares = this._routes[route][request.method].middleWares;
        const handler = this._routes[route][request.method].function;
    }

    _requestListener(){
        this._eventEmitter.on(this._routeReq,(request,response)=>{
            this._route(request,response);
        })
    }

    _notFoundResponse(response){
        response.setStatusCode(conf.statusCode);
        response.setHead('content_type',conf.content_type.json);
        response.end(JSON.stringify(conf.error.notFound));
    }
}

module.exports = Router;