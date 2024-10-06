function mostrarMensaje(texto, color) {
  const mensajeDiv = document.getElementById('mensaje_reporte');
  mensajeDiv.textContent = texto
  mensajeDiv.style.display = 'block'
  mensajeDiv.style.color = color
}

function actualizarVehiculo() {

  let selectedID = document.getElementById("listbox_maquinas").value
  let vehicleData = localStorage.getItem(selectedID)

  if (vehicleData && vehicleData!=0) {
    let vehicle = JSON.parse(vehicleData);

    document.getElementById("div_ID_vehiculo").innerText = vehicle.ID
    document.getElementById("div_nombre_vehiculo").innerText = vehicle.placa
    document.getElementById("div_revision_vehiculo").innerText = vehicle.ultima_revision
    document.getElementById("div_estado_vehiculo").innerText = vehicle.estado
    document.getElementById("div_marca_vehiculo").innerText = vehicle.marca
    document.getElementById("div_modelo_vehiculo").innerText = vehicle.model

    document.getElementById("input_nombre").value = vehicle.placa
    document.getElementById("input_marca").value = vehicle.marca
    document.getElementById("input_modelo").value = vehicle.model

    let brandImg = document.getElementById("div_brand_vehiculo")
    let brandNombre = vehicle.marca.toLowerCase()
    brandImg.src = `recursos/img/${brandNombre}.png`

    brandImg.style.visibility = "visible"
    brandImg.onerror = function() {
        this.style.visibility = "hidden"
    };
    

  } else {
    document.getElementById("div_ID_vehiculo").innerText = "-"
    document.getElementById("div_nombre_vehiculo").innerText = "-"
    document.getElementById("div_revision_vehiculo").innerText = "-"
    document.getElementById("div_estado_vehiculo").innerText = "-"
    document.getElementById("div_marca_vehiculo").innerText = "-"
    document.getElementById("div_modelo_vehiculo").innerText =  "-"
    document.getElementById("div_brand_vehiculo").src = "recursos/img/sinimg.png"

    document.getElementById("input_nombre").value = "N"
    document.getElementById("input_marca").value = ""
    document.getElementById("input_modelo").value = ""

  }
}

function editarVehiculo(){
  let vehicleID = document.getElementById('div_ID_vehiculo').innerText
  let nombre = document.getElementById('input_nombre').value
  let marca = document.getElementById('input_marca').value
  let modelo = document.getElementById('input_modelo').value

  let storedVehicle = localStorage.getItem(vehicleID)
  
  if (storedVehicle) {
      let vehicleData = JSON.parse(storedVehicle)

      vehicleData.placa = nombre
      vehicleData.marca = marca
      vehicleData.model = modelo

      localStorage.setItem(vehicleID, JSON.stringify(vehicleData))

      
      mostrarMensaje("Vehiculo con ID " + vehicleID + " actualizado correctamente", "blue")

      actualizarVehiculo()
  } else {
    actualizarVehiculo()
  }
}

function borrarVehiculo(){
    let vehicleID = document.getElementById('div_ID_vehiculo').innerText
    let storedVehicle = localStorage.getItem(vehicleID)
  
    if (storedVehicle) {
        localStorage.removeItem(vehicleID)
        console.log(vehicleID)


        updateKeysArray(vehicleID, false) //ooooooooooooooo



        actualizarVehiculo()
    } else {
      mostrarMensaje("Sin vehiculo al cual borrar.", "red")
      actualizarVehiculo()
    }
}

//////////////

function generateUniqueID() {
  let id;
  do {
      id = Math.floor(Math.random()*(10000-1000+1))+1000
  } while (localStorage.getItem(id))
  return id;
}

function crearVehiculo(){
  const vehicleID = generateUniqueID();
  const nombre = document.getElementById('input_nombre').value
  const marca = document.getElementById('input_marca').value
  const modelo = document.getElementById('input_modelo').value

  
  if (
    !vehicleID || 
    !nombre || 
    !marca || 
    !modelo 
  ) {
    
    mostrarMensaje("Todos los campos son obligatorios.", "red")
      return;
  }

  const newVehicle = {
      ID: vehicleID,
      placa: nombre,
      marca: marca,
      model: modelo,
      ultima_revision: 'Sin revision',
      estado: 'Fuera de operacion'
  };

  localStorage.setItem(vehicleID, JSON.stringify(newVehicle));

  updateKeysArray(vehicleID, true);
  mostrarMensaje("Vehiculo creado con id " + vehicleID, "blue")
}

///


function updateKeysArray(vehicleID, isEdit) {
  let keysArray = JSON.parse(localStorage.getItem('keys')) || [];

  if (isEdit) {
    
      if (!keysArray.includes(vehicleID)) {
          keysArray.push(vehicleID);
      }
  } else {
    
      keysArray = keysArray.filter(id => id !== vehicleID);
  }

  
  localStorage.setItem('keys', JSON.stringify(keysArray));


    let keys = JSON.parse(localStorage.getItem("keys"))
    let selectElement = document.getElementById("listbox_maquinas")

    selectElement.innerHTML = ''

    keys.forEach(key => {
        const option = document.createElement("option");
        option.value = key
        option.textContent = key
        selectElement.appendChild(option)
    });

}

actualizarVehiculo()

document.getElementById("listbox_maquinas").addEventListener("change", actualizarVehiculo)

document.getElementById("boton_editar").addEventListener("click", editarVehiculo)

document.getElementById("boton_borrar").addEventListener('click', borrarVehiculo) 

document.getElementById("boton_crear").addEventListener('click', crearVehiculo) 