function errorREPORT(texto, color) {
    const mensajeDiv = document.getElementById('mensaje_reporte')
    mensajeDiv.textContent = texto
    mensajeDiv.style.display = 'block'
    mensajeDiv.style.color = color
}

async function fetchDatos() {
    try {
        let response = await fetch('https://raw.githubusercontent.com/kinbine/Entregable_Romero/refs/heads/main/recursos/maquinas.json')

        if (!response.ok) {
            errorREPORT('Revisa tu Conexion', 'red')
        }

        let data = await response.json()
        let data_array = data.items

        let data_por_id = {}

        data_array.forEach(element => {
            data_por_id[element.ID] = element
        })

        let keys = []

        for (let id in data_por_id) {
            localStorage.setItem(id, JSON.stringify(data_por_id[id]))
            keys.push(id)
        }

        localStorage.setItem('keys', JSON.stringify(keys))

    } catch (error) {
        errorREPORT('Revisa tu Conexion', 'red')
    }
}

async function refreshdataButton() {

    localStorage.clear()
    await fetchDatos()

    let keys = JSON.parse(localStorage.getItem('keys'))
    let select_element = document.getElementById('listbox_maquinas')

    select_element.innerHTML = ''

    let a_remover = select_element.querySelector('option[value="0"]')
    if (a_remover) {
        select_element.removeChild(a_remover)
    }
    keys.forEach(key => {
        let opcion = document.createElement('option')
        opcion.value = key
        opcion.textContent = key
        select_element.appendChild(opcion)
    })
}

async function refreshlist() {

    let keys = JSON.parse(localStorage.getItem('keys'))
    let select_element = document.getElementById('listbox_maquinas')

    let a_remover = select_element.querySelector('option[value="0"]')
    if (a_remover) {
        select_element.removeChild(a_remover)
    }
    keys.forEach(key => {
        let opcion = document.createElement('option')
        opcion.value = key
        opcion.textContent = key
        select_element.appendChild(opcion)
    })
}

refreshlist()
let boton = document.getElementById('boton_actualizar_datos')
boton.addEventListener('click', () => refreshdataButton())