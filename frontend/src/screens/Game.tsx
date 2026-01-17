import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import { useSocket } from "../webSockets/useSockets";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

function Game() {

    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    console.log("INIT_TYPE: Game Initialized");
                    setChess(new Chess());
                    setBoard(chess.board());
                    break;
                case MOVE:
                    console.log("move made");
                    const move = message.playload;
                    chess.move(move);
                    setBoard(chess.board);
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }
        }
    }, [socket])

    if (!socket) return <div>connecting......</div>

    return (
        <>
            <div className="justify-center flex">
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-3 gap-4 ">
                        <div className="col-span-2 justify-center bg-[#1c202a59] flex p-6">
                            <ChessBoard socket = {socket} board={board} />
                        </div>
                        <div className="col-span-1 justify-center flex">
                            <div className="pt-8">
                                <Button onClick={() => {
                                    socket.send(JSON.stringify({
                                        type: INIT_GAME
                                    }))
                                }}>
                                    Play
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Game