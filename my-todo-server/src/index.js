import Koa from 'koa';
import {router as itemRouter} from './item/itemRouter';
import {router as authRouter} from './auth';
import {logger, errorHandler} from "./utils";
import WebSocket from 'ws';
import bodyparser from 'koa-bodyparser';
import {init} from './core/wsBroadcast';
import cors from '@koa/cors';
import koaJwt from 'koa-jwt'
import {jwtConfig} from "./core";
import Router from 'koa-router'
const app = new Koa();
const server = require('http').createServer(app.callback());

app.use(cors());

init(server);

app.use(logger);
app.use(errorHandler);
app.use(bodyparser());


app.use(async(ctx, next) => {
    // await new Promise((resolve => {
    //     setTimeout(resolve, 3000);
    // }));
    console.log(ctx.request);
    await next();

});

const prefix = '/api';
//public
const publicApiRouter = new Router({ prefix });
publicApiRouter
  .use('/auth', authRouter.routes());
app
  .use(publicApiRouter.routes())
  .use(publicApiRouter.allowedMethods());

// app.use(async (ctx,next)=>{
//     console.log('before ', ctx.state);
//     await next();
// });
app.use(koaJwt(jwtConfig));
// app.use(async (ctx,next)=>{
//     console.log('after ', ctx.state);
//     await next();
// });

// protected
const protectedApiRouter = new Router({ prefix });
protectedApiRouter
    .use('/item', itemRouter.routes());
app
    .use(protectedApiRouter.routes())
    .use(protectedApiRouter.allowedMethods());



server.listen(3000);


// app
//     .use(itemRouter.routes())
//     .use(itemRouter.allowedMethods());

// wss.on('connection', ws => {
//     ws.on('message', message => {
//         console.log('received: %s', message);
//     });
//
//     ws.send('something');
// });
