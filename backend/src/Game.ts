import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    private countMove = 0;

    constructor(player1:WebSocket, player2:WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.countMove = 0;
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
            
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
            
        }))
    }

    makeMove(socket:WebSocket, move: {
        from:string;
        to:string;
    }){
        // validation here
        // is it this user
        // is move valid 
        console.log("makeMove start")
        console.log(move)
        // console.log(socket)
        try{
            this.board.move(move);
            console.log("ascii board")
            console.log(this.board.ascii());
        }catch(e){
            return;
        }
        console.log("correct move")
        if(this.board.isGameOver()){
            // send the game over message to both the player

            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === "w" ? "black": "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === "w" ? "black": "white"
                }
            }))
            return;
        }
        console.log("countMove %2:", this.countMove%2)
        if(this.countMove % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        
        this.countMove++;
        console.log("countMove:", this.countMove)

        // update the bard
        // push the move 


        // check if game is over 


        // send the updated board to both the player

    }

}