import Square from "./Square";
import calculateWinner from "./funciones/calculateWinner";
import hayEmpate from "./funciones/hayEmpate";
import juegaBot from "./funciones/juegaBot";
import winnerLine from "./funciones/winnerLine";

import useSound from "use-sound";
import botGanador from "../assets/audio/botGanador.m4a";
import botPensando from "../assets/audio/botPensando.wav";
import botNuncaPierde from '../assets/audio/botNuncaPierde.m4a';
import clickHumano from "../assets/audio/clickHumano.wav";
import clickHumano2 from "../assets/audio/clickHumano2.wav";
import clickBot from "../assets/audio/clickBot.wav";
import clickBot2 from "../assets/audio/clickBot2.wav";
import movimientoNoValido from "../assets/audio/movimientoNoValido.wav";
import humanoGanador from "../assets/audio/humanoGanador.m4a";
import humanoGanadorFondo from "../assets/audio/humanoGanadorFondo.wav";

function Tablero({ quienJuega, setQuienJuega, squares, onPlay, fromHistory, jugarContraBot, dificultad }) {
  // function Tablero({ xIsNext, squares, onPlay, fromHistory, jugarContraBot, quienInicia, dificultad}) {
  // console.log(quienJuega)
  
  const [playBotGanador] = useSound(botGanador);
  const [playBotPensando] = useSound(botPensando);
  const [playBotNuncaPierde] = useSound(botNuncaPierde);
  const [playclickHumano] = useSound(clickHumano);
  const [playclickHumano2] = useSound(clickHumano2);
  const [playclickBot] = useSound(clickBot);
  const [playclickBot2] = useSound(clickBot2);
  const [playMovimientoNoValido] = useSound(movimientoNoValido);
  const [playHumanoGanador] = useSound(humanoGanador);
  const [playHumanoGanadorFondo] = useSound(humanoGanadorFondo);
  
  const movimientoBot = () => {
    const i = juegaBot(squares, dificultad);
    if (squares[i] || calculateWinner(squares) || hayEmpate(squares)) {
      playMovimientoNoValido();
      return;
    }
    playclickBot()
    const nextSquares = squares.slice();
    quienJuega === "😎" ? setQuienJuega("🤖") : setQuienJuega("😎")
    nextSquares[i] = quienJuega;
    onPlay(nextSquares);
  };

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares) || hayEmpate(squares)) {
      playMovimientoNoValido();
      return;
    }
    playclickHumano2()
    const nextSquares = squares.slice();
    quienJuega === "😎" ? setQuienJuega("🤖") : setQuienJuega("😎")
    nextSquares[i] = quienJuega;
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  const empate = hayEmpate(squares);
  const arrayWinnerLine = winnerLine(squares);

  let status;
  if (winner) {
    status = "Ganador: " + winner;
    if (winner === "🤖"){
      playBotPensando();
      playBotGanador();    
    }
    else {
      playHumanoGanadorFondo();
      playHumanoGanador();
    }
  } else {
    if (empate) {
      status = "EMPATE!!!";
      playBotPensando();
      playBotNuncaPierde();  
    } else {
      status = "Juega: " + quienJuega;
    }
  }

  if (quienJuega === "🤖" && !fromHistory){
    // setTimeout(()=>movimientoBot(), 400);
    movimientoBot();
  }

  const reiniciarJuego = () => {
    window.location.reload(false);
  }

  return (
    <>
      <section className="sectionReiniciar_y_Status">
        <div className="divReiniciar">
          <button className="btnReiniciar" onClick={reiniciarJuego}>🔃</button>
        </div>
      
        <div
          className={ ` ${"status"}
                        ${winner ? "statusWinner" : ''}
                        ${!winner && empate ? "statusEmpate" : ''}
                      `// ejemplo de classname concatenado o concatenación de estilos
                    } 
        >
          {status}
        </div>
      </section>

      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          winColor={arrayWinnerLine.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          winColor={arrayWinnerLine.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          winColor={arrayWinnerLine.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          winColor={arrayWinnerLine.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          winColor={arrayWinnerLine.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          winColor={arrayWinnerLine.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          winColor={arrayWinnerLine.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          winColor={arrayWinnerLine.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          winColor={arrayWinnerLine.includes(8)}
        />
      </div>
    </>
  );
}
export default Tablero;
