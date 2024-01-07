import {formulario,} from "../selectores.js"
export class UI{
    constructor(){

    }
    imprimirAlertas(mensaje,tipo){
        const alerta=document.querySelector(".alert");
        if (!alerta) {
            const divAlerta=document.createElement("div");
            divAlerta.classList.add("px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center","border","alert");
            if (tipo) {
                divAlerta.classList.add("bg-red-100","border-red-400","text-red-700");
            }
            else{
                divAlerta.classList.add("bg-green-100","border-green-400","text-green-700");
            }
            divAlerta.textContent=mensaje;

            formulario.appendChild(divAlerta);

            setTimeout(() => {
                divAlerta.remove();
            }, 3000);   
        }
    }
    imprimirAlertasEliminar(mensaje,tipo){
        const alerta=document.querySelector(".alert");
        if (!alerta) {
            const divAlerta=document.createElement("div");
            divAlerta.classList.add("px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center","border","alert");
            if (tipo) {
                divAlerta.classList.add("bg-red-100","border-red-400","text-red-700");
            }
            else{
                divAlerta.classList.add("bg-green-100","border-green-400","text-green-700");
            }
            divAlerta.textContent=mensaje;

            hDos.insertBefore(divAlerta,noCliente);

            setTimeout(() => {
                divAlerta.remove();
            }, 3000);   
        }
    }
}