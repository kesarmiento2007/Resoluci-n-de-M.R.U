const distancia = document.querySelector("#d");
const velocidad = document.querySelector("#v");
const tiempo = document.querySelector("#t");

const selectD = document.querySelector("#distancia");
const selectV = document.querySelector("#velocidad");
const selectT = document.querySelector("#tiempo");
let selected;

const r = document.querySelector(".resultado");
const b = document.querySelector(".borrar");

const datos = {
    d: "",
    v: "",
    t: ""
}


distancia.addEventListener("input", cargar);
velocidad.addEventListener("input", cargar);
tiempo.addEventListener("input", cargar);

function cargar(e){
    datos[e.target.id] = e.target.value;
}


b.addEventListener("click", function(){
    distancia.value = "";
    velocidad.value = "";
    tiempo.value = "";
    datos.d = "";
    datos.v = "";
    datos.t = "";
});

r.addEventListener("click", resultado);

function resultado(){
    const {d, v, t} = datos;

    if(d === "" && v === "" && t === ""){
        distancia.value = "";
        velocidad.value = "";
        tiempo.value = "";
    } else{
        if(d === ""){
            resultD(v, t);
        }
        if(v === ""){
            resultV(d, t);
        }
        if(t === ""){
            resultT(d, v);
        }
    }
}


function resultD(v, t){
    selected = selectD.options[selectD.selectedIndex].text;
    let result = "";
    let valor1 = 0;
    let valor2 = 0;

    // Transformaciones
    if(selected == "m"){
        valor1 = transformarV(v);
        valor2 = transformarT(t);
    }
    if(selected == "km"){
        valor1 = inverV(v);
        valor2 = inverT(t);
    }

    // Resultado
    result = resultado2(valor1, valor2, "d");
    distancia.value = result;
}

function resultV(d, t){
    selected = selectV.options[selectV.selectedIndex].text;
    let result = "";
    let valor1 = 0;
    let valor2 = 0;

    // Transformaciones
    if(selected == "m/s"){
        valor1 = transformarD(d);
        valor2 = transformarT(t);
    }
    if(selected == "km/h"){
        valor1 = inverD(d);
        valor2 = inverT(t);
    }

    // Resultado
    result = resultado2(valor1, valor2, "v");
    velocidad.value = result;
}

function resultT(d, v){
    selected = selectT.options[selectT.selectedIndex].text;
    let result = "";
    let valor1 = 0;
    let valor2 = 0;

    // Transformaciones
    if(selected == "min"){
        negacion();
    } else{
        if(selected == "s"){
            valor1 = transformarD(d);
            valor2 = transformarV(v);
        }
        if(selected == "h"){
            valor1 = inverD(d);
            valor2 = inverV(v);
        }

        // Resultado
        result = resultado2(valor1, valor2, "t");
        tiempo.value = result;
    }
}


// Calcula el resultado
function resultado2(valor1, valor2, diferenciador){
    let result = 0;

    if(diferenciador === "d"){
        result = valor1 * valor2;
        result = result.toFixed(2);
        result = result.toString();
    }

    if(diferenciador === "v"){
        result = valor1 / valor2;
        result = result.toFixed(2);
        result = result.toString();
    }

    if(diferenciador === "t"){
        result = valor1 / valor2;
        result = result.toFixed(2);
        result = result.toString();
    }

    return result;
}

function negacion(){
    const n = document.createElement("P");
    n.classList.add("negacion");
    n.textContent = "No se permite obtener el resultado en minutos";

    const body = document.querySelector("BODY");
    body.appendChild(n);

    setTimeout(() =>{
        n.remove();
    }, 4000);
}


// Transformaciones

// Transforma distancia
function transformarD(d){
    selected = selectD.options[selectD.selectedIndex].text;

    let valor = "";

    if(selected === "km"){
        valor = d
        valor = parseFloat(valor);
        valor *= 1000;
    } else{
        if(selected === "m"){
            valor = d
            valor = parseFloat(valor);
        }
    }
    
    return valor;
}
function inverD(d){
    selected = selectD.options[selectD.selectedIndex].text;

    let valor = "";

    if(selected === "m"){
        valor = d
        valor = parseFloat(valor);
        valor /= 1000;
    } else{
        if(selected === "km"){
            valor = d
            valor = parseFloat(valor);
        }
    }
    
    return valor;
}

// Transforma velocidad
function transformarV(v){
    selected = selectV.options[selectV.selectedIndex].text;

    let valor = "";

    if(selected === "km/h"){
        valor = v;
        valor = parseFloat(valor);
        valor *= 1000;
        valor /= 3600;
    } else{
        if(selected === "m/s"){
            valor = v;
            valor = parseFloat(valor);
        }
    }
    
    return valor;
}
function inverV(v){
    selected = selectV.options[selectV.selectedIndex].text;

    let valor = "";

    if(selected === "m/s"){
        valor = v;
        valor = parseFloat(valor);
        valor *= 0.001;
        valor *= 3600;
    } else{
        if(selected === "km/h"){
            valor = v;
            valor = parseFloat(valor);
        }
    }
    
    return valor;
}

// Transforma tiempo
function transformarT(t){
    selected = selectT.options[selectT.selectedIndex].text;

    let valor = "";

    if(selected === "h"){
        valor = t;
        valor = parseFloat(valor);
        valor *= 3600;
    } else{
        if(selected === "min"){
            valor = t;
            valor = parseFloat(valor);
            valor *= 60;
        } else{
            if(selected === "s"){
                valor = t;
                valor = parseFloat(valor);
            }
        }
    }

    return valor;
}
function inverT(t){
    selected = selectT.options[selectT.selectedIndex].text;

    let valor = "";

    if(selected === "s"){
        valor = t;
        valor = parseFloat(valor);
        valor /= 3600;
    } else{
        if(selected === "min"){
            valor = t;
            valor = parseFloat(valor);
            valor /= 60;
        } else{
            if(selected === "h"){
                valor = t;
                valor = parseFloat(valor);
            }
        }
    }

    return valor;
}

