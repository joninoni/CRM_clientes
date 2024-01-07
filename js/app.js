import {listadoClientes} from "./selectores.js";
let DB;
const noClientes=document.querySelector(".text-gray-600")

document.addEventListener("DOMContentLoaded",()=>{
      crearDB();

	  if(window.indexedDB.open("citas",1)){
		obtenerClientes();
	  }

	  listadoClientes.addEventListener("click",eliminarCliente);
})
function eliminarCliente(e){
	if (e.target.classList.contains("eliminar")) {
	const idEliminar=Number(e.target.dataset.cliente);
	const confirmar=confirm("Desea eliminar el cliente?");
	if (confirmar) {
		const transaction=DB.transaction(["citas"],"readwrite");
		const objectStore=transaction.objectStore("citas");
		objectStore.delete(idEliminar);

		transaction.oncomplete=function(){
			e.target.parentElement.parentElement.remove();
		}
		transaction.onerror=function(){
			console.log("hubo un error");
		}
	}
	}		
}
  function crearDB(){
	const crearDB=window.indexedDB.open("citas",1);

	crearDB.onerror=function(){
		console.log("hubo un error");
      }

	crearDB.onsuccess=function(){
		DB=crearDB.result;
      }

	crearDB.onupgradeneeded=function(e){
		const db=e.target.result;

		const objectStore=db.createObjectStore("citas",{keyPath:"id",autoIncrement:true});
		objectStore.createIndex("nombre","nombre",{unique:false});
		objectStore.createIndex("email","email",{unique:true});
		objectStore.createIndex("telefono","telefono",{unique:false});
		objectStore.createIndex("empresa","empresa",{unique:false});
		objectStore.createIndex("id","id",{unique:true});

		console.log("base creada ");
      }
  }

  function obtenerClientes(){
	const obtenerClientes=window.indexedDB.open("citas",1);

	obtenerClientes.onerror=function(){
		console.log("hubo un error al obtener clientes");
	}

	obtenerClientes.onsuccess=function(){
		DB=obtenerClientes.result;

		const objectStore =DB.transaction("citas").objectStore("citas");
		const total=objectStore.count();
		total.onsuccess=function(){
			if(total.result>0){
				noClientes.textContent="Administra tus clientes"
			}
			else{
				noClientes.textContent="No hay clientes"
			}
		}
		objectStore.openCursor().onsuccess=function(e){
			const cursor =e.target.result;

			if(cursor){
				const {nombre,email,empresa,telefono,id}=cursor.value;
				listadoClientes.innerHTML+=				
				`
				<tr>
					<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
						<p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
						<p class="text-sm leading-10 text-gray-700"> ${email} </p>
					</td>
					<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
						<p class="text-gray-700">${telefono}</p>
					</td>
					<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
						<p class="text-gray-600">${empresa}</p>
					</td>
					<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
						<a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
						<a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
					</td>
				</tr>
				`
				cursor.continue();
			}
			else{


			}
		}
	}
  }