import { useState } from "react";
import Tablero from "./Tablero";

// import BarraHistorial from "./BarraHistorial";
// import Configuracion from "./Configuracion";
import styles from "../assets/css/styles.css";

const Juego = () =>  {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const [fromHistory, setFromHistory] = useState(false)

  const [jugarContraBot, setJugarContraBot] = useState(true);
  
  const [quienInicia, setQuienInicia] = useState("😎");
  // const [quienInicia, setQuienInicia] = useState("🤖");
  
  const [quienJuega, setQuienJuega] = useState("😎");
  // const [quienJuega, setQuienJuega] = useState("🤖");
  
  // const [dificultad, setDificultad] = useState("🐓");
  const [dificultad, setDificultad] = useState("🐣");

  const handleClickInicia = (inicia) =>{
    setQuienInicia(inicia);
  };

  const handleClickDificultad = (dificultad) =>{
    setDificultad(dificultad);
  };

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setFromHistory(false);
  }

  function jumpTo(nextMove) {
    // (currentMove % 2 === 0) ? setQuienJuega("🤖") : setQuienJuega("😎");
    (nextMove % 2 === 0) ? setQuienJuega("😎") : setQuienJuega("🤖");
    setCurrentMove(nextMove);
    setFromHistory(true);
    (nextMove === 0) && reiniciarJuego();
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move + "° movimiento";
    } else {
      description = "Ir a partida Inicial";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const reiniciarJuego = () => {
    window.location.reload(false);
  }



  return (
    <div>
        <header>
            <h1>Gánale a Bot!</h1>
        </header>


        {/* <section>
          <Configuracion setJugarContraBot = {setJugarContraBot} setQuienInicia = {handleClickInicia}  setDificultad = {handleClickDificultad} />
        </section> */}

        <div className="game">
          <div className="game-board">
            <Tablero quienJuega={quienJuega} setQuienJuega = {setQuienJuega} squares={currentSquares} onPlay={handlePlay} fromHistory={fromHistory} 
                     jugarContraBot={jugarContraBot} dificultad = {dificultad}/>
          </div>
          {/* <div className="game-board">
            <Tablero xIsNext={!xIsNext} squares={currentSquares} onPlay={handlePlay} fromHistory={fromHistory} 
                     jugarContraBot={jugarContraBot} quienInicia = {quienSigue} dificultad = {dificultad}/>
          </div> */}

          <div className="game-info">
            <h2>Historial de movimientos</h2>
            {/* <BarraHistorial/> */}
            <ol>{moves}</ol>
          </div>
        </div>

        {/* <footer>
          <p>desarrollado por Luis Bugueño Ulloa!</p>
        </footer> */}
    </div>      
  );
};
  
export default Juego;
