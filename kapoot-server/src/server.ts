import * as express from 'express';
import * as socketio from 'socket.io';
import * as path from 'path';
import { Socket } from 'socket.io';

const app = express();
app.set('port', process.env.PORT || 8080);

let http = require('http').Server(app);
let io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('./index.html'));
});

let participants: string[] = [];

// simple '/' endpoint sending a Hello World
// response
app.get('/hello-world', (req: any, res: any) => {
  res.send('hello world');
});

io.use((socket: any, next: any) => {
  const name = socket.handshake.auth.name;
  console.log('name middleware', name);
  if (!name) {
    return next(new Error('invalid name'));
  }
  socket.name = name;
  next();
});

io.on('connection', (socket: Socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on('RegisterParticipant', (participantName: string) => {
    let success: boolean = false;
    if (participants.indexOf(participantName) !== -1) {
      participants.push(participantName);
      io.emit('PartipantsUpdated', { participants });
    }

    socket.emit('PartipantRegistered', {
      success,
    });
  });

  socket.on('GameStarted', () => {
    console.log('Game has started');
    io.emit('NewQuestion', { participants });
  });
});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});
