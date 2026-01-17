import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

function ChessBoard({ board, socket }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],
    socket: WebSocket
}) {
    const [from, setForm] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    const moveHandeler = (i: number, j: number, square: Square) => {
        // const r = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        if (!from) {
            setForm(square);
        } else {
            setTo(square);
            socket.send(JSON.stringify({
                type: "move",
                move: {
                    from: from,
                    to: to
                }
            }))
            setForm(null)
            console.log(`button clicked`, from, to);
            
        }

    }

    return (
        <>
            <div className="text-white-200">
                {
                    board.map((row, i) => {
                        return <div key={i} className="flex">
                            {
                                row.map((square, j) => {
                                    return <div key={j} className={`w-16 h-16 ${(i + j) % 2 == 0 ? 'bg-green-500' : 'bg-white'}`}>
                                        <div className={`justify-center flex w-full h-full ${square ? "cursor-pointer" : ""}`}
                                            onClick={() =>  moveHandeler(i, j, square?.square) }
                                        >
                                            <div className="h-full justify-center flex flex-col" >
                                                {square ? square.type : ""}
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })}
            </div>
        </>
    )
}

export default ChessBoard