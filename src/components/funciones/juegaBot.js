import obtenerNumeroEnteroAlAzarEntre from "./obtenerNumeroEnteroAlAzarEntre";
const juegaBot = (squares, dificultad) => {
    let cuadradoLibre = -1;
    const hayCuadradoLibre = () => {
        for (let i = 0; i < 9; i++) {
            if (!squares[i]) {
                cuadradoLibre = i;
                return true;
            }
        }
        return false;
    }

    if (!(hayCuadradoLibre())) { 
        return -1; 
    }

    let numeroJugadaBot = 1;
    let numeroJugadasHumano = 0;
    let cuadradoSeleccionado = -1;
    let esquinasArray = [0, 2, 6, 8];
    let bordesArray = [1, 3, 5, 7];
    let centroArray = [4];

    const tresEnLineaArray = [  [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [0, 4, 8],
                                [2, 4, 6]];

    const cuadradosHumanoArray = [];
    const posiblesTresEnLineaHumano = [];
    const bloquearGatoArray = [];
    squares.forEach((cuadrado, index) => {
        if (cuadrado ==="😎"){
            cuadradosHumanoArray.push(index);
        }
    });
    if (cuadradosHumanoArray.length > 1){
        tresEnLineaArray.forEach((cuadrado) => {
            let contador = 0;
            for (let i = 0; i < cuadradosHumanoArray.length; i++) {
                if ( cuadrado.includes(cuadradosHumanoArray[i])){
                    contador++;
                }
            }
            if ( contador === 2 ) {
                posiblesTresEnLineaHumano.push(cuadrado);
            //    var arr = cuadrado.filter( (c) => ! (cuadradosHumanoArray.find( (cHA) => c === cHA)));
            //    tengo problemas con el dato 0, no lo filtra!!!
            //    var arr = cuadrado.filter( (c) => cuadradosHumanoArray.indexOf(c) === -1); indexOf funciona, pero creo que es más eficiente usar includes!
               let arr = cuadrado.filter( (c) => !cuadradosHumanoArray.includes(c) );
               if (!(squares[arr[0]])){
                   bloquearGatoArray.push(arr[0]);
               }
            }
        });
    }

    const cuadradosBotArray = [];
    const posiblesTresEnLineaBot = [];
    const gatoParaBot = [];
    squares.forEach((cuadrado, index) => {
        if (cuadrado ==="🤖"){
            cuadradosBotArray.push(index);
        }
    });
    if (cuadradosBotArray.length > 1){
        tresEnLineaArray.forEach((cuadrado) => {
            let contador = 0;
            for (let i = 0; i < cuadradosBotArray.length; i++) {
                if ( cuadrado.includes(cuadradosBotArray[i])){
                    contador++;
                }
            }
            if ( contador === 2 ) {
                posiblesTresEnLineaBot.push(cuadrado);
                var arrBot = cuadrado.filter( (c) => !cuadradosBotArray.includes(c) );
                if (!(squares[arrBot[0]])){
                    gatoParaBot.push(arrBot[0]);
                }
            }
        });
    }

    const eligeEsquinaCualquiera = () => {
        do {
            cuadradoSeleccionado = obtenerNumeroEnteroAlAzarEntre(0, 8)
        } while (!(esquinasArray.includes(cuadradoSeleccionado)) || squares[cuadradoSeleccionado])
    }
    const eligeEsquinaContiguaDelHumano = () => {
        if (squares[1] === "😎"){
            if (!(squares[0]) && squares[3] === "😎" ){
                cuadradoSeleccionado = 0;
            }
            else 
            if (!(squares[2]) && squares[5] === "😎"){
                    cuadradoSeleccionado = 2;
            }
        }
        else 
        if (squares[7] === "😎"){
            if (!(squares[6]) && squares[3] === "😎"){
                cuadradoSeleccionado = 6;
            }
            else 
            if (!(squares[8]) && squares[5] === "😎"){
                    cuadradoSeleccionado = 8;
                }
        }
    }
    const eligeBordeCualquiera = () => {
        do {
            cuadradoSeleccionado = obtenerNumeroEnteroAlAzarEntre(1, 7);
            if (bordesArray.includes(cuadradoSeleccionado)){
                if (cuadradoSeleccionado === 1 || cuadradoSeleccionado === 7){
                    if ((squares[1]) || (squares[7])){
                        cuadradoSeleccionado = -1
                    }
                }
                else 
                if (cuadradoSeleccionado === 3 || cuadradoSeleccionado === 5){
                    if ((squares[3]) || (squares[5])){
                        cuadradoSeleccionado = -1
                    }
                }
            }
        } while (!(bordesArray.includes(cuadradoSeleccionado)) || (squares[cuadradoSeleccionado]))
    }
    const eligeCuadradoCentral = () => {
        cuadradoSeleccionado = 4;
    }

    const humanoJugoEsquina = () => {
        if (esquinasArray.findIndex(cuadrado => squares[cuadrado]==="😎") > -1){
            return true;
        }
        return false;
    }
    const humanoJugoBorde = () => {
        if (bordesArray.findIndex(cuadrado => squares[cuadrado]==="😎") > -1){
            return true;
        }
        return false;
    }
    const humanoJugoCentro = () => {
        /* para qué ocupar centroArray!*/
        if (squares[4]==="😎"){
            return true;
        }
        return false;
    }
    
    for (let i = 0; i < 9; i++) {
        if (squares[i]) {
            squares[i] === "🤖" ? numeroJugadaBot += 1 : numeroJugadasHumano += 1;
        }
    }
    
    if (dificultad === "🐣"){
        if (numeroJugadaBot === 1){
            if (numeroJugadasHumano === 0){/*quiere decir que bot empezó el juego*/
                if (obtenerNumeroEnteroAlAzarEntre(0, 1) === 0 || obtenerNumeroEnteroAlAzarEntre(0, 1) === 1) {/*basta que uno sea true para que elija alguna esquina*/
                        eligeEsquinaCualquiera();
                }
                else{/*va al cuadrado central! (para dar oportunidad de que gane un niño)*/
                    eligeCuadradoCentral();
                }            
            } 
            else {/*quiere decir que humano empezó el juego (es su primera jugada)*/
                humanoJugoCentro() ? eligeEsquinaCualquiera() : eligeCuadradoCentral()
            }
        }
        else if (numeroJugadaBot === 2){
            if (numeroJugadasHumano === 1){/*quiere decir que bot empezó el juego*/
            } else {/*quiere decir que humano empezó el juego y lleva 2 jugadas*/
                // buscar jugada del humano, bloquear si es necesario
                // ver si humano está por ganar
                if (bloquearGatoArray.length > 0) {
                    cuadradoSeleccionado = bloquearGatoArray[0];                    
                }
                else {
                    if (squares[4] === "🤖"){
                        if (humanoJugoEsquina() ) {
                            eligeBordeCualquiera();
                        }
                        else {
                            eligeEsquinaContiguaDelHumano();
                        };
                    }
                    if (cuadradoSeleccionado === -1){
                        eligeEsquinaContiguaDelHumano();
                    }
                    if (cuadradoSeleccionado === -1){
                        eligeEsquinaCualquiera();
                    }
                }
            }
        }
        else if (numeroJugadaBot > 2){
            if (gatoParaBot.length > 0){
                cuadradoSeleccionado = gatoParaBot[0];
            }
            else
            if (bloquearGatoArray.length > 0) {
                cuadradoSeleccionado = bloquearGatoArray[0];                    
            }
            else{
                eligeEsquinaContiguaDelHumano();

                if (cuadradoSeleccionado === -1) cuadradoSeleccionado = cuadradoLibre;
            }
        }        
        return cuadradoSeleccionado;    
    }
    
    return cuadradoSeleccionado
};

export default juegaBot;