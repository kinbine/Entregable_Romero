let base_de_datos_maquinas = [ "12345" , "0001" , "1234" ]

function checkMaquina(maq_para_probar){
    var check = base_de_datos_maquinas.includes(maq_para_probar)
    if (!check)
        {
        console.log("Maquina no valida!")
        return false
        }
    else {
        return true
    }
}

function checkerDeID(id_maq){

    let intento = 0
    let checkmaquinavalida = false

    while(checkmaquinavalida == false){
    if (intento>0){
        console.log("ID erroneo, intento numero "+intento) //ver el intento
        id_maq = prompt("ID erroneo, por favor ingresa el ID de la maquina que quieres ver (12345, 0001 ,1234)")
    }

    checkmaquinavalida = checkMaquina(id_maq)
    intento++
    }

    return id_maq
}

function testGenerico1(id_maq){

    console.log("Check de bateria iniciado")
    let check_de_bateria = confirm("La maquina cuenta con una bateria instalada?")
    
    if(check_de_bateria){
        let energia = prompt("Por favor ingrese el porcentaje que indique la bateria (entre 1 y 100)")

        while(isNaN(energia) || 100<=energia||energia<=0){
            energia = prompt("Porcentaje fuera de rango. \n Por favor ingrese el porcentaje que indique la bateria (entre 1 y 100)")
        }
        console.log("Bateria a "+energia+"%")

        if (energia > 80) {
            return "energia casi completa";
        } else if (energia > 40) {
            return "niveles de energia normales";
        } else {
            return "necesita cargar la bateria";
        }

    }
    else{
        console.log("Sin bateria")
        return "sin bateria"
    }
}

function testGenerico2(id_maq){
    console.log("Check de hidraulicos iniciado")
    let check_de_hidraulicos = confirm("Ha percibido alguna irregularidad en el funcionamiento de la maquina?")
    if(check_de_hidraulicos){
        alert("Este reporte le va a informar a un tecnico")
        console.log("Maquina en necesidad de un check.")
        return "necesitando un tecnico"
    }
    else{
        console.log("maquina funcionando sin inconvenientes")
        return "funcionando con normalidad"
    }
}

function testGenerico3(id_maq){
    console.log("Check de operacion iniciado")
    let check_online = confirm("¿El dispositivo esta en operacion?")
    if(check_online){
        console.log("Maquina Online")
        return "online"
    }
    else{
        console.log("Maquina Offline")
        return "offline"
    }
}

function rollDeChecks(id_maq){
    let elec = testGenerico1(id_maq)
    let func = testGenerico2(id_maq)
    let online = testGenerico3(id_maq)

    alert("Reporte finalizado para maquina " + id_maq + "\n" + elec + ", sistemas " + func + "  y en estado " + online + ".")
}

//Inicio de programa

var id_maquina = prompt("Hola, bienvenido al reporte de maquina! \n Por favor ingresa el ID de la maquina que quieres ver (12345, 0001 ,1234)")

checkerDeID(id_maquina)

var confirmacion_de_reporte = confirm("¿Quiere realizar un reporte de la maquina "+id_maquina+"?")

if(confirmacion_de_reporte){
    rollDeChecks(id_maquina)
}

alert("Que tenga un exelente dia.")