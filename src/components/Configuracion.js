const Configuracion = ({setJugarContraBot, setQuienInicia, setDificultad} ) => {

    function handleClickchkVsBot(){
        var checkBox = document.getElementById("id_chkVsBot");
        var divInicia = document.getElementById("id_divInicia");
        var divDificultad = document.getElementById("id_divDificultad");
        (checkBox.checked == true) ? divInicia.style.display = "" : divInicia.style.display = "none";
        (checkBox.checked == true) ? divDificultad.style.display = "" : divDificultad.style.display = "none";
    }


    return (
        <div className="config">
            <div className="chkVsBot">
                <input type="checkbox" name="" id="id_chkVsBot" value={"jugar contra el bot"} onClick={handleClickchkVsBot} defaultChecked/>
                <label htmlFor="id_chkVsBot">jugar contra Bot</label>
            </div>

            <div className="inicia" id="id_divInicia">
                <div>
                    <h3>Inicia:</h3>
                </div>
                <div>
                    <input type="radio" name="inicia" id="id_rdIniciaHumano" onClick={() => setQuienInicia("😎")} defaultChecked/>
                    <label htmlFor="id_rdIniciaHumano">😎</label>
                </div>
                <div>
                    <input type="radio" name="inicia" id="rdIniciaBot" onClick={() => setQuienInicia("🤖")} />
                    <label htmlFor="rdIniciaBot">🤖</label>
                </div>
            </div>

            <div className="dificultad" id="id_divDificultad">
                <div>
                    <h3>Dificultad:</h3>
                </div>
                <div>
                    <input type="radio" name="dificultad" id="id_rdDificultadFacil" onClick={() => setDificultad("🐣")} defaultChecked />
                    <label htmlFor="id_rdDificultadFacil">🐣</label>
                    
                </div>
                <div>
                    <input type="radio" name="dificultad" id="id_rdDificultadDificil" onClick={() => setDificultad("🐓")}  />
                    <label htmlFor="id_rdDificultadDificil">🐓</label>
                </div>
            </div>

            <div>
                <button>
                    Guardar y jugar!
                </button>
            </div>
            
        </div>
    );
  };

  export default Configuracion;