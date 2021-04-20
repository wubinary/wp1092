export default function Header(props){

    return (
        <>
        <h1 id="title">Merging School</h1>
        <div className="btn-groups">
            <div className="qs-ranking" id="general-qs-ranking">QS: <p id="general-qs-ranking-value">{props.qs_ranking}</p></div>
            <div className="qs-ranking" id="general-step">Step: <p id="general-step-value">{props.step}</p></div>
            <div className="qs-ranking" id="best-qs-ranking">Best: <p id="best-qs-ranking-value">{props.best_qs_ranking}</p></div>
            <div className="button" id="reset-button" onClick={props.initializeBoard} >New Game</div>
        </div>
        </>
    );
}