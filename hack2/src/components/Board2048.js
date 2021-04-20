import Row from './Row'

export default function Board2048 ({ board, gameover, initializeBoard, win}) {

    let boardClassName = "board ";
    let infoClassName = "info ";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";

    return (
        <>
        <table className={boardClassName+(gameover|win?" game-over-board":"")} id="board-full">
            <tbody>
                {board.map((row_vector, row_idx) => (<Row i={row_idx} vector={row_vector} />))}
            </tbody>
        </table>
        <div className={infoClassName+(gameover|win?" game-over-wrapper":"")} id="game-over-info">
            <span id="game-over-text">{win?phdSentence:outSentence}</span>
            <div className="button" id="game-over-button" onClick={initializeBoard}>Try again</div>
        </div>
        </>
    );
};