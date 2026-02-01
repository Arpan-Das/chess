import type { Color, PieceSymbol, Square } from "chess.js";
import { useEffect, useState } from "react";

function ChessBoard({ board, socket, chess, setBoard }: {
    chess: any,
    setBoard: any,
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],
    socket: WebSocket
}) {
    // const [from, setForm] = useState<null | Square>(null);
    // const [to, setTo] = useState<null | Square>(null);

    const [from, setForm] = useState("");
    const [to, setTo] = useState("");

    // const moveHandeler = (square: Square | null) => {
    //     // const r = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // }

    // useEffect(() => {
    //     console.log("from : ", from)
    //     console.log("to : ", to)
    //     console.log(`button clicked from : ${from} to : ${to}`);
    // }, [from, to])

    return (
        <>
            <div className="text-white-200">
                {
                    board.map((row, i) => {
                        return <div key={i} className="flex">
                            {
                                row.map((square, j) => {
                                    return <div key={j} className={`w-16 h-16 ${(i + j) % 2 == 0 ? 'bg-green-500' : 'bg-white'}`}>
                                        <div className={`justify-center flex w-full h-full`}
                                            onClick={() => {
                                                // moveHandeler(square?.square)
                                                const r = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                                                const pos = r[j] + (8 - i).toString();
                                                // console.log(pos)
                                                // console.log(from.length)

                                                console.log("pos : ", pos)

                                                if (from === ""){
                                                    setForm(pos)
                                                }else{
                                                    setTo(pos)
                                                    
                                                    try {
                                                        // either correct move
                                                        socket.send(JSON.stringify({
                                                            type: "move",
                                                            move: {
                                                                from: from,
                                                                to: pos
                                                            }
                                                        }))
                                                        chess.move({
                                                            from: from,
                                                            to: pos
                                                        });
                                                        setBoard(chess.board())
                                                        
                                                    } catch (e) {
                                                        // either incorrect move 
                                                       console.log(e) 
                                                       console.log("early return -> reset -> from")
                                                       setForm("")
                                                    }    

                                                    // reset the from and to
                                                    console.log(`button clicked from : ${from} to : ${pos}`);
                                                    console.log("reset -> from")
                                                    setForm("")
                                                }
                                                

                                                // console.log("from : ", from)
                                                // console.log("to : ", to)

                                                
                                                // if ((from.length == 0)) {
                                                //     setForm(pos);

                                                // } else {
                                                //     setTo(pos);
                                                //     console.log(to)

                                                //     try {
                                                //         socket.send(JSON.stringify({
                                                //             type: "move",
                                                //             move: {
                                                //                 from: from,
                                                //                 to: pos
                                                //             }
                                                //         }))
                                                //         chess.move({
                                                //             from: from,
                                                //             to: pos
                                                //         });
                                                //         setBoard(chess.board())
                                                //     } catch (e) {
                                                //         console.log(e)
                                                //         setForm("")
                                                //         setTo("")
                                                //         return;
                                                //     }


                                                //     console.log(`button clicked from : ${from} to : ${to}`);

                                                //     // setForm("")
                                                // }
                                            }}
                                        >
                                            <div className="h-full justify-center flex flex-col" >
                                                {/* {square ? square.type : ""} */}
                                                {square ? <img className="object-contain" alt={`${square ? square.type : ""}`} src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()}_`}.svg`}/> : null}
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