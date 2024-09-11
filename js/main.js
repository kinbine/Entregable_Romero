let base_de_datos_maquinas = []; //coleccion de maquinas

function nuevoPIN(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //generar un pin random de 1000 a 9999
}

class Maquinas {
  static id = 0;
  constructor(nombre, placa) {
    this.id = ++Maquinas.id; //id incremental por creacion, NO tiene que haber dos id iguales
    this.nombre = nombre;
    this.placa = placa;
    this.fue_checkeada = false;
    this.maqPIN = nuevoPIN(1000, 9999); // creamos un pin
  }

  nuevoPIN() {
    this.maqPIN = nuevoPIN(1000, 9999); //hago nuevo pin no importa si cae el mismo

    document.getElementById("text1").innerHTML = "<strong></strong>";
    document.getElementById("text2").innerHTML =
      "<strong>PIN cambiado exitosamente a </strong>" + this.maqPIN;
    document.getElementById("text3").innerHTML =
      "<strong>Guardelo y no lo comparta</strong>";
  }
  checkSwitch(check) {
    this.fue_checkeada = check; //darle al check
  }
}

function agregarIDaListbox(maquina) {
  const lista_maq = document.getElementById("listbox_maquinas");
  const nueva_option = document.createElement("option");

  nueva_option.value = maquina.id; //>0
  nueva_option.text = `ID:${maquina.id}`; //ID:IDquesea

  lista_maq.appendChild(nueva_option);
  lista_maq.value = maquina.id;
}

function mostrarMaquina(maquina) {
  if (maquina) {
    document.getElementById("text1").innerHTML =
      "<strong>ID:</strong> " + maquina.id;
    document.getElementById("text2").innerHTML =
      "<strong>Nombre:</strong> " + maquina.nombre;
    document.getElementById("text3").innerHTML =
      "<strong>Placa:</strong> " + maquina.placa;
  } else {
    document.getElementById("text1").innerHTML = "<strong>ID Invalido</strong>";
    document.getElementById("text2").innerHTML =
      "<strong>Nombre Invalido</strong>";
    document.getElementById("text3").innerHTML =
      "<strong>Placa Invalida</strong>";
  }
}

function eliminarMaquina(id) {
  base_de_datos_maquinas = base_de_datos_maquinas.filter(
    (maquina) => maquina.id !== id
  ); //limpieza por id
  const lista_maq = document.getElementById("listbox_maquinas");
  const indice_a_borrar = Array.from(lista_maq.options).findIndex(
    (option) => parseInt(option.value) === id
  ); //creo un array, buscar el id, retornar indice en array,

  if (indice_a_borrar > 0) {
    lista_maq.remove(indice_a_borrar);
  } else {
    console.log("No hay maquina!"); //en caso de que quiera borrar el texto de ejemplo
  }
}

function borrarMaquina(maquina) {
  if (maquina) {
    eliminarMaquina(maquina.id);
    document.getElementById("text1").innerHTML = "<strong></strong>";
    document.getElementById("text2").innerHTML =
      "<strong>Maquina Exitosamente Eliminada</strong>";
    document.getElementById("text3").innerHTML = "<strong></strong>";
  } else {
    document.getElementById("text1").innerHTML = "<strong></strong>";
    document.getElementById("text2").innerHTML =
      "<strong>Maquina Invalida</strong>";
    document.getElementById("text3").innerHTML = "<strong></strong>";
  }
}

function crearMaquinas() {
  let nombre = document.getElementById("input_nombre").value;
  let placa = document.getElementById("input_placa").value;
  let checkbox_electica = document.getElementById("checkbox_electica").checked;

  if (!nombre || !placa) {
    alert("Completar datos!");
    return;
  }

  let nueva_maquina = new Maquinas(nombre, placa);
  nueva_maquina.checkSwitch(checkbox_electica);

  base_de_datos_maquinas.push(nueva_maquina);

  agregarIDaListbox(nueva_maquina);
  mostrarMaquina(nueva_maquina); // actualizar el mostrar maq
}

document.addEventListener("DOMContentLoaded", function () {
  //todos los botones
  const saveBoton = document.getElementById("boton_load_datos");
  const listaBotonLoad = document.getElementById("boton_load_de_lista");
  const listaBotonDelete = document.getElementById("boton_delete_de_lista");
  const listaBotonPIN = document.getElementById("boton_nuevo_pin");

  saveBoton.addEventListener("click", crearMaquinas);

  listaBotonLoad.addEventListener("click", function () {
    let id_elegido = parseInt(
      document.getElementById("listbox_maquinas").value
    );
    let maq_aver = base_de_datos_maquinas.find(
      (buscada) => buscada.id === id_elegido
    );
    mostrarMaquina(maq_aver);
  });

  listaBotonDelete.addEventListener("click", function () {
    let id_elegido = parseInt(
      document.getElementById("listbox_maquinas").value
    );
    let maq_aver = base_de_datos_maquinas.find(
      (buscada) => buscada.id === id_elegido
    );
    borrarMaquina(maq_aver);
  });

  listaBotonPIN.addEventListener("click", function () {
    let id_elegido = parseInt(
      document.getElementById("listbox_maquinas").value
    );
    let maq_aver = base_de_datos_maquinas.find(
      (buscada) => buscada.id === id_elegido
    );
    maq_aver.nuevoPIN(maq_aver);
  });
});

function cargarMaquinaEspecifica(id) {
  if (buscada) {
    mostrarMaquina(buscada);
  } else {
    document.getElementById("text1").innerHTML = "No encontrado";
    document.getElementById("text2").innerHTML = "No encontrado";
    document.getElementById("text3").innerHTML = "No encontrado";
  }
}
