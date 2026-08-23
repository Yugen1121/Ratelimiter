import express, {Request, Response} from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import { Socket } from "node:net";
import { Server, ServerResponse, type IncomingMessage } from 'node:http';


const gatewayServers = [
    "http://127.0.0.1:5432",
    "http://127.0.0.1:5433",
    "http://127.0.0.1:5434",
];

const servers = [
    "http://127.0.0.1:4567",
    "http://127.0.0.1:4568",
    "http://127.0.0.1:4569",
];

const app = express();

var apiGatewayIndex = 0;
var serverIndex = 0;

function getApiGateway(){
    apiGatewayIndex = (apiGatewayIndex + 1) % gatewayServers.length;
    return gatewayServers[apiGatewayIndex]
}

function getServer(){
    serverIndex = (serverIndex + 1) % servers.length;
    return servers[serverIndex]
}

app.use((req: Request, res: Response, next)=>{
    const apiGateway = getApiGateway();
    const server = getServer();

    req.headers["target-server"] = server;
    console.log(1)
    const proxy = createProxyMiddleware({
        target: apiGateway,
        changeOrigin: true,
        on:{ 
            error: (err: Error, req: IncomingMessage, res: ServerResponse | Socket) => {
                if (res instanceof ServerResponse){
                    res.writeHead(502, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Bad Gateway: Could not reach the API Gateway.' }));
                }
                else {
                    res.destroy();
                }
            }
        }
    })
    console.log(2)
    return proxy(req, res, next)
})

app.listen(3000, ()=>{

})