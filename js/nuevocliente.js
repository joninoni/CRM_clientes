import {conectarDB,DB} from "./conectarDB.js";
import {formulario} from "./selectores.js";
import {UI} from "./classes/UI.js";

const ui=new UI();
    document.addEventListener("DOMContentLoaded",()=>{
        conectarDB();
        formulario.addEventListener("submit",validarCliente);
    })

    function validarCliente(e){
        e.preventDefault();
        
        const nombre =document.querySelector("#nombre").value;
        const email =document.querySelector("#email").value;
        const telefono =document.querySelector("#telefono").value;
        const empresa =document.querySelector("#empresa").value;
        if(nombre===""||email===""||telefono===""||empresa===""){
            ui.imprimirAlertas("No puede haber campos vacios","error");
            return;
        }
        const cliente={
            nombre,
            email,
            telefono,
            empresa,
            id:Date.now(),
        } 
        agregarNuevoCliente(cliente);
    }

    function agregarNuevoCliente(cliente){
        const transaction=DB.transaction(["citas"],"readwrite");
        const objectStore=transaction.objectStore("citas");
        objectStore.add(cliente);

        transaction.onerror=function(){
            ui.imprimirAlertas("Hubo un error","error");
        }

        transaction.oncomplete=function(){
            ui.imprimirAlertas("Cita agregada correctamente");

            setTimeout(() => {
                window.location.href="index.html"
            }, 2000);
        }
    }