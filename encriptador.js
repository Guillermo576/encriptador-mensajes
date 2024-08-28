const d = document;
const textArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".result__img");
const resultadoTitulo = d.querySelector(".result__title");
const resultadoTexto = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelector(".form__btn--secundary")
const botonCopiar = d.querySelector(".form__btn.form__btn--secundary.hidden");

const llaves = [
    ["e","enter"],
    ["i","imes"],
    ["a","ai"],
    ["o","ober"],
    ["u","ufat"]
];

function encriptarMensaje(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i]
        let encriptada = letra
        for(let j = 0; j < llaves.length; j++){
            if (letra === llaves[j][0]){
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

function desenriptarMensaje(mensaje){
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

function validarEntrada(mensaje) {
    // Verifica si contiene letras mayúsculas o acentos
    const regexMayusculasOAcentos = /[A-ZÁÉÍÓÚáéíóú!"·$%&/()=?¿¡'|@#¬]/;
    return !regexMayusculasOAcentos.test(mensaje);
}

textArea.addEventListener("input", (e) => {
    const mensaje = e.target.value;

    if (validarEntrada(mensaje)) {
        imagenMuneco.style.display = "none";
        resultadoTitulo.textContent = "Capturando mensaje";
        resultadoTexto.textContent = "";
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    } else {
        resultadoTitulo.textContent = "Texto no permitido";
        resultadoTexto.textContent = "Por favor, ingresa solo letras minúsculas y sin acentos.";
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
    }
});

textArea.addEventListener("input", (e)=>{
    imagenMuneco.style.display = "none";
    resultadoTitulo.textContent = "Capturando mensaje";
    resultadoTexto.textContent = "";
})

botonEncriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "";
})

botonDesencriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desenriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "";
})

botonCopiar.addEventListener("click",()=>{
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        imagenMuneco.style.display = "block";
        resultadoTitulo.textContent = "El texto se copio.";
        botonCopiar.classList.add("hidden")
        resultadoTexto.textContent = "";

    });
});