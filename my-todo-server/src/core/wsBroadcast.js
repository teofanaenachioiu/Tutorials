import WebSocket from "ws";
import jwt from 'jsonwebtoken';
import {jwtConfig} from "../core";

let wss;

export const init = server => {
    wss = new WebSocket.Server({server});

    wss.on('connection', ws => {
        ws.on('message', message => {
            console.log('received: %s', message);
            const {token} = JSON.parse(message);
            try {
                const signInfo = jwt.verify(token, jwtConfig.secret);
                ws.user = {userId: signInfo._id};
                console.log(signInfo);
            } catch (e) {
                ws.close();
                console.log('Connection closed!!!!');
                console.log(e);
            }
        });

    });
};

export const brodcast = ({event, payload}) =>
    wss.clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            const userId = ws.user ? ws.user.userId : null;
            console.log(ws.user);
            if (ws.readyState === WebSocket.OPEN && userId === payload.userId) {
                ws.send(JSON.stringify({event, payload}));
            }

        }
    });