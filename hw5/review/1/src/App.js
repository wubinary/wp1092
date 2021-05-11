import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')

    const startMenu = (
        <div>
        <button
            onClick={async () => {
            var response = await startGame();
            if(response === 'The game has started.') {
                setHasStarted(true);
                setStatus('');
            }
            else {
                setStatus(response);
            }
            }}
        >
            start game
        </button>
        <p>{status}</p>
        </div>
    )

    const winningMode = (
        <>
        <p>you won! the number was {number}.</p>
        <button
            onClick={async () => {
            var response = await restart();
            if(response === 'The game has restarted.') {
                setHasWon(false)
                setStatus('')
                setNumber('')
            }
            else {
                setStatus(response);
            }
            }}
        >
            restart
        </button>
        <p>{status}</p>
        </>
    )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
    const handleGuess = async() => {
        var num = document.getElementsByTagName('input')[0].value;
        // console.log(num);
        var response = await guess(num);
        if(response === 'Equal') {
            setHasWon(true);
            setStatus('');
        }
        else {
            setStatus(response);
        }
    }

    const gameMode = (
        <>
        <p>Guess a number between 1 to 100</p>
        <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
        ></input>
        <button
            onClick={handleGuess}
            disabled={!number}
        >
            guess!
        </button>
        <p>{status}</p>
        </>
    )

    const game = (
        <div>
        {hasWon ? winningMode : gameMode}
        </div>
    )

    return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
