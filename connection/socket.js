import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*', //모든 도메인 허용 3000, 8080 이런 거 상관없이. 원래는 다르면 블럭처리됨
            }
        });
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('인증에러1'));
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if (error) {
                    return next(new Error('인증에러2'));
                }
                // socket.user = decoded;
                next();
            });
        });
        this.io.on('connection', (socket) => {
            console.log('클라이언트 접속!', socket.id);
            // socket.on('chat', (data) => {
            //     console.log(data);
            //     this.io.emit('chat', data);
            });
        };
    }
let socket;
export function initSocket(server) {
    if (!socket) {
        socket = new Socket();
    }
}

export function getSocketIO() {
    if (!socket) {
        throw new Error('먼저 소켓을 초기화 해주세요.');
    }
    return socket.io;
}