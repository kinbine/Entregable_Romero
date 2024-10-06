function mostrarMensaje(texto, color) {
  let mensajeDiv = document.getElementById('mensaje_reporte')
  mensajeDiv.textContent = texto
  mensajeDiv.style.display = 'block'
  mensajeDiv.style.color = color
}

function actualizarVehiculo() {

  let selectedID = document.getElementById("listbox_maquinas").value
  let maquinaData = localStorage.getItem(selectedID)

  if (maquinaData && maquinaData != 0) {
    let maquina = JSON.parse(maquinaData)

    document.getElementById("div_ID_vehiculo").innerText = maquina.ID
    document.getElementById("div_nombre_vehiculo").innerText = maquina.placa
    document.getElementById("div_revision_vehiculo").innerText = maquina.ultima_revision
    document.getElementById("div_estado_vehiculo").innerText = maquina.estado
    document.getElementById("div_marca_vehiculo").innerText = maquina.marca
    document.getElementById("div_modelo_vehiculo").innerText = maquina.model

    document.getElementById("input_nombre").value = maquina.placa
    document.getElementById("input_marca").value = maquina.marca
    document.getElementById("input_modelo").value = maquina.model

    let brandImg = document.getElementById("div_brand_vehiculo")
    let brandNombre = maquina.marca.toLowerCase()
    brandImg.src = `recursos/img/${brandNombre}.png`

    brandImg.style.visibility = "visible"
    brandImg.onerror = function () {
      this.style.visibility = "hidden"
    }


  } else {
    document.getElementById("div_ID_vehiculo").innerText = "-"
    document.getElementById("div_nombre_vehiculo").innerText = "-"
    document.getElementById("div_revision_vehiculo").innerText = "-"
    document.getElementById("div_estado_vehiculo").innerText = "-"
    document.getElementById("div_marca_vehiculo").innerText = "-"
    document.getElementById("div_modelo_vehiculo").innerText = "-"
    document.getElementById("div_brand_vehiculo").src = "recursos/img/sinimg.png"

    document.getElementById("input_nombre").value = "N"
    document.getElementById("input_marca").value = ""
    document.getElementById("input_modelo").value = ""

  }
}

function editarVehiculo() {
  let maquinaID = document.getElementById('div_ID_vehiculo').innerText
  let nombre = document.getElementById('input_nombre').value
  let marca = document.getElementById('input_marca').value
  let modelo = document.getElementById('input_modelo').value

  let storedmaquina = localStorage.getItem(maquinaID)

  if (storedmaquina) {
    let maquinaData = JSON.parse(storedmaquina)

    maquinaData.placa = nombre
    maquinaData.marca = marca
    maquinaData.model = modelo

    localStorage.setItem(maquinaID, JSON.stringify(maquinaData))


    mostrarMensaje("Vehiculo con ID " + maquinaID + " actualizado correctamente", "blue")

    actualizarVehiculo()
  } else {
    actualizarVehiculo()
  }
}

function borrarVehiculo() {
  let maquinaID = document.getElementById('div_ID_vehiculo').innerText
  let storedmaquina = localStorage.getItem(maquinaID)

  if (storedmaquina) {
    localStorage.removeItem(maquinaID)
    console.log(maquinaID)


    updateKeysArray(maquinaID, false)



    actualizarVehiculo()
  } else {
    mostrarMensaje("Sin vehiculo al cual borrar.", "red")
    actualizarVehiculo()
  }
}

function generateUniqueID() {
  let id
  do {
    id = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000
  } while (localStorage.getItem(id))
  return id
}

function crearVehiculo() {
  let maquinaID = generateUniqueID()
  let nombre = document.getElementById('input_nombre').value
  let marca = document.getElementById('input_marca').value
  let modelo = document.getElementById('input_modelo').value


  if (
    !maquinaID ||
    !nombre ||
    !marca ||
    !modelo
  ) {

    mostrarMensaje("Todos los campos son obligatorios.", "red")
    return
  }

  let newmaquina = {
    ID: maquinaID,
    placa: nombre,
    marca: marca,
    model: modelo,
    ultima_revision: 'Sin revision',
    estado: 'Fuera de operacion'
  }

  localStorage.setItem(maquinaID, JSON.stringify(newmaquina))

  updateKeysArray(maquinaID, true)
  mostrarMensaje("Vehiculo creado con id " + maquinaID, "blue")
}


function updateKeysArray(maquinaID, isEdit) {
  let keysArray = JSON.parse(localStorage.getItem('keys')) || []

  if (isEdit) {

    if (!keysArray.includes(maquinaID)) {
      keysArray.push(maquinaID)
    }
  } else {

    keysArray = keysArray.filter(id => id !== maquinaID)
  }


  localStorage.setItem('keys', JSON.stringify(keysArray))


  let keys = JSON.parse(localStorage.getItem("keys"))
  let selectElement = document.getElementById("listbox_maquinas")

  selectElement.innerHTML = ''

  keys.forEach(key => {
    let option = document.createElement("option")
    option.value = key
    option.textContent = key
    selectElement.appendChild(option)
  })

}

function calculateScore() {
  let form = document.getElementById('maquinaForm')
  let preguntasTotales = 9
  let scoring = 0

  let ideales = {
    checkPresionRuedas: 30,
    checkBrake: 80,
    checkAceite: 5,
    checkLuces: 100,
    checkFugas: "no",
    checkAC: 100,
    checkAsientos: "yes",
    checkBateria: 100,
    checkDireccion: 100
  }

  for (let key of Object.keys(ideales)) {
    let input_valores = form.elements[key];
    if (input_valores && input_valores.value.trim() === '') {
        document.getElementById('scoreReporte').innerText = `Por favor, complete todos los campos.`
        return
    }
  }

  for (let [key, value] of Object.entries(ideales)) {

    let inputValor = form.elements[key].value
    
    if (key === 'checkFugas' || key === 'checkAsientos') {
      let checkedValor = form.elements[key].value //consolelog
      if (checkedValor === value) scoring++
    } else {
      if (Number(inputValor) >= value) scoring++
    }
  }

  let Puntaje = scoring / preguntasTotales
  if (Puntaje > 0.75) {
    document.getElementById('scoreReporte').innerText = `Vehiculo se ha registrado listo para operacion,`
    cambiarEstado(true)
    form.reset();
  } else {
    document.getElementById('scoreReporte').innerText = `El vehiculo será llevado a mantenimiento.`
    cambiarEstado(false)
    form.reset();
  }
}

function cambiarEstado(aprobado) {
  let maquinaID = document.getElementById('div_ID_vehiculo').innerText
  let storedmaquina = localStorage.getItem(maquinaID)
  let FechaRevision = moment().format('YYYY-MM-DD');

  let maquinaData = JSON.parse(storedmaquina)
  if (aprobado) {
    maquinaData.estado = 'En operacion'
    maquinaData.ultima_revision = FechaRevision
  }
  else {
    maquinaData.estado = 'Fuera de operacion'
    maquinaData.ultima_revision = FechaRevision
  }
  localStorage.setItem(maquinaID, JSON.stringify(maquinaData))

  actualizarVehiculo()
}


document.getElementById('scoringReporte').addEventListener('click', calculateScore)

actualizarVehiculo()

document.getElementById("listbox_maquinas").addEventListener("change", actualizarVehiculo)

document.getElementById("boton_editar").addEventListener("click", editarVehiculo)

document.getElementById("boton_borrar").addEventListener('click', borrarVehiculo)

document.getElementById("boton_crear").addEventListener('click', crearVehiculo)
