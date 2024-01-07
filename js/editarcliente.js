import {conectarDB,DB} from "./conectarDB.js";
import {nombreInput,telefonoInput,empresaInput,emailInput,formulario} from "./selectores.js";
import {UI} from "./classes/UI.js";

const ui =new UI();

let idCliente;
document.addEventListener("DOMContentLoaded",()=>{
    
    conectarDB();
    formulario.addEventListener( "submit",actualizarCliente);
    const parametros=new URLSearchParams(window.location.search);
    idCliente=parametros.get("id"); 
    if(idCliente){
        setTimeout(() => {
            obtenerCliente(idCliente);
        }, 100);
        }
})
function actualizarCliente(e){
    e.preventDefault();
    //verificar que no hay campos vacios
    if (nombreInput.value===""||emailInput===""||empresaInput===""||telefonoInput==="") {
        ui.imprimirAlertas("No se pudo actualizar el registro","error");
        return;
    }
    const clienteActualizado={
        nombre:nombreInput.value,
        empresa:empresaInput.value,
        telefono:telefonoInput.value,
        email:emailInput.value,
        id:Number(idCliente),
    }

    const transaction=DB.transaction(["citas"],"readwrite");
    const objectStore=transaction.objectStore("citas");
    objectStore.put(clienteActualizado);

    transaction.onerror=function(){
        ui.imprimirAlertas("Error al editar","error");
    }

        transaction.oncomplete=function(){
            ui.imprimirAlertas("Cliente actualizado correctamente");
            setTimeout(() => {
                window.location.href="index.html";
            }, 1000);
        }
    }
function obtenerCliente(id){
    const transaction=DB.transaction(["citas"],"readwrite");
    const objectStore=transaction.objectStore("citas");

    objectStore.openCursor().onsuccess=function(e){
        const cliente = e.target.result;
        if(cliente){
            if(cliente.value.id ===Number(id)){
            llenarFormulario(cliente.value)
            }
            cliente.continue()
        }
    }
}

function llenarFormulario(datosCliente){
    const {nombre,email,telefono,empresa}=datosCliente;
    
    nombreInput.value=nombre;
    emailInput.value=email;
    telefonoInput.value=telefono;
    empresaInput.value=empresa;
}
