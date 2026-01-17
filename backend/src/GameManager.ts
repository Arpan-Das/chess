import { WebSocket } from "ws";
import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";



export class GameManager{
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];

    }

    addUser(socket : WebSocket){
        this.users.push(socket);
        this.addHandeler(socket);
    }

    removeUser(socket : WebSocket){
        this.users = this.users.filter(user => user != socket);
        // stop the game here because the user has left 
    }

    private addHandeler(socket: WebSocket){
        socket.on("message", (data)=>{
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    // start the game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }else{
                    // user will wait to connect to the game 
                    this.pendingUser = socket;
                }
            }
            console.log("above Move condition in side gameManager")
            if(message.type === MOVE){
                console.log("check 1")
                const game = this.games.find(game =>  game.player1 == socket || game.player2 == socket);
                console.log("check 2")
                if(game){
                    console.log("calling the makeMove")
                    console.log(message)
                    game.makeMove(socket, message.move);
                }
            }
        })
    }

}