import { io } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'production' ? 'https://knowledge-cafe-cc-production.up.railway.app/' : 'http://localhost:3000';

export const socket = io(URL, { transports: ['websocket', 'polling', 'flashsocket'] })