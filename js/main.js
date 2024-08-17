/** 

////////////////////////////

array = "12345,0001,1234"


////////////////////////////

checkifmachineisonarray(array){
    return checkonarray(array)
}

////////////////////////////

functionstarter () {

id = 0

for 3 tries
    while correct machine!=false {
        vale = 
            input(
                "hi, welcome to our diagnosis interface, please put the id of the machine you want to check (1 to 3)"
            )
        checkifmachineisonarray() //return true

if i>3
    "too many tries goodbye"
    return 0
else
    welcome to the diagnosis
    return id
}
////////////////////////////

maquinaadiagnostico = functionstarter()

elec = test1 (maquinadiagnostico) //es electrica
fork = test2 (maquinadiagnostico) //use forks
online = test3 (maquinadiagnostico) //is online


output(
    "report done, machine " + 
    maquinaadiagnostico + 
    ",with " + 
    elec  +
    ", " +
    fork +
    " is " +
    online +
    ", report send have a nice day."
    )

**/

let base_de_datos_maquinas = [ "12345" , "0001" , "1234" ];

function checkMaquina(maq_para_probar){
    var check = base_de_datos_maquinas.includes(maq_para_probar);
    if (!check)
        {
        console.log("Maquina no válida!");
        return false;
        }
    else {
        return true;
    };
};

function CheckerDeID(id_maq){

    let intento = 0;
    let checkmaquinavalida = false;

    while(checkmaquinavalida == false){
    if (intento>0){
        console.log("intento "+intento); //ver el intento
        id_maq = prompt("ID erroneo, por favor ingresa el ID de la maquina que quieres ver (12345, 0001 ,1234)");
    };

    checkmaquinavalida = checkMaquina(id_maq);

    intento++;

    };
    return id_maq
};


let id_maquina = prompt("Hola, bienvenido al reporte de maquina, por favor ingresa el ID de la maquina que quieres ver (12345, 0001 ,1234)");

CheckerDeID(id_maquina);
