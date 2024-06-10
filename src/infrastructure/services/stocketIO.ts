import { Server, Socket } from "socket.io";
import {  Server as HttpServer } from "http";

interface IUser{
    userId:string;
    socketId:string;
}

export class SocketManager{
    private httpServer:HttpServer;
    private io:Server;
    private users:IUser[];
    constructor(httpServer:HttpServer){
        this.httpServer = httpServer;
        this.users = [];
        this.io = new Server(httpServer,{
            cors:{
                origin: ["http://localhost:5173","http://10.4.2.182:5173"],
            }
        })
        this.io.on('connection',this.handleConnection)
    }

    private handleConnection = (socket:Socket) => {
        console.log('A user connected');
        
        socket.on('addUser',userId => {
            console.log("------",userId)
            this.addUser(userId, socket.id);
            socket.emit('getUsers', this.users)
        })

        socket.on('sendMessage',({senderId, receiverId, text}) => {
            const user = this.getUser(receiverId);
            console.log("sendMessage",user, senderId, receiverId, text)
            if (user && user.socketId) {
                socket.to(user.socketId).emit('getMessage', {
                    receiverId,
                    senderId,
                    text
                });
            }
        })

        socket.on('disconnect',() => {
            console.log('disconnected')
            this.removeUser(socket.id)
        })
    }

    addUser(userId:string, socketId:string){
        let user = this.users.find(user => user.userId == userId)
        if(user){
            user.socketId = socketId
        }else{
            this.users.push({userId, socketId});
        }
    }

    removeUser(socketId:string){
        this.users.filter((user) =>  user.socketId != socketId)
    }

    getUser(receiverId:string){
        return this.users.find(user => user.userId == receiverId)
    }
}