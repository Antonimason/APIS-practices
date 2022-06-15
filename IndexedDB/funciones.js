"use strict";

const idbRequest = indexedDB.open("AntonioBase",1) //creación de una base de datos ("nombre","version")

idbRequest.addEventListener("upgradeneeded", ()=>{
    const db = idbRequest.result;
    db.createObjectStore("nombres", {
       autoIncrement: true //creamos el almacen de objetos
    });
})

idbRequest.addEventListener("success", ()=>{ //cuando creamos correctamente la base de datos
    console.log("todo salió correctamente");
})

idbRequest.addEventListener("error", ()=>{ //por si sale un error
    console.log("ocurrió un error al abrir la base de datos");
})

document.getElementById("add").addEventListener("click", ()=>{
    let nombre = document.getElementById("nombre").value;
    if (nombre.length > 0) {
        if (document.querySelector(".posible") != undefined){
            if (confirm("hay elementos sin guardar: Quieres continuar?")) {
                addObjetos({nombre});
                leerObjetos();
            }
        }else {
            addObjetos({nombre});
            leerObjetos();
        }
    }
})
const addObjetos = objeto=> {
    const db = idbRequest.result;
    const idbTransaction = db.transaction("nombres","readwrite"); // ("en cual store quieres crearlo", "modo")
    const objectoStore = idbTransaction.objectStore("nombres"); //esto se va a ejecutar en "Nombres"
    objectoStore.add(objeto); //agregamos el objeto
    idbTransaction.addEventListener("complete", ()=> { //escucha de que se haya completado
        console.log("objeto agregado correctamente");
    });
}

const leerObjetos = ()=> {
    const db = idbRequest.result;
    const idbTransaction = db.transaction("nombres", "readonly");
    const objectStore = idbTransaction.objectStore("nombres"); //hasta aqui, el mismo procesor que en addobjetos
    const cursor = objectStore.openCursor(); // el cursor lee los datos
    const fragment = document.createDocumentFragment();
    document.querySelector(".nombres").innerHTML = "";
    cursor.addEventListener("success", ()=>{ //en caso de que hayasalido todo correctamente
        if(cursor.result) { //verificar que cursor exista
            let elemento = nombresHTML(cursor.result.key, cursor.result.value);
            fragment.appendChild(elemento);
            cursor.result.continue(); //con el continue(), hace que no nos muestre 1 solo valor, si no que continua leyendo toda la base
        } else document.querySelector(".nombres").appendChild(fragment);
    })
}

const modificarObjeto = (key,objeto)=> {
    const db = idbRequest.result;
    const idbTransaction = db.transaction("nombres","readwrite"); // ("en cual store quieres crearlo", "modo")
    const objectoStore = idbTransaction.objectStore("nombres"); //esto se va a ejecutar en "Nombres"
    objectoStore.put(objeto,key); //modifica el objeto
    idbTransaction.addEventListener("complete", ()=> { //escucha de que se haya completado
        console.log("objeto modificado correctamente");
    });
}

const eliminarObjeto = (key)=> {
    const db = idbRequest.result;
    const idbTransaction = db.transaction("nombres","readwrite"); // ("en cual store quieres crearlo", "modo")
    const objectoStore = idbTransaction.objectStore("nombres"); //esto se va a ejecutar en "Nombres"
    objectoStore.delete(key); //eliminamos el objeto
    idbTransaction.addEventListener("complete", ()=> { //escucha de que se haya completado
        console.log("objeto elminado correctamente");
    });
}

const nombresHTML = (id, name) => {
    const container = document.createElement("DIV");
    const h2 = document.createElement("h2");
    const options = document.createElement("DIV");
    const saveButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    container.classList.add("nombre");
    options.classList.add("options");
    saveButton.classList.add("imposible");
    deleteButton.classList.add("delete");

    saveButton.textContent = "Guardar";
    deleteButton.textContent = "Eliminar";

    h2.textContent = name.nombre;
    h2.setAttribute("contenteditable", "true");
    h2.setAttribute("spellcheck", "false");

    options.appendChild(saveButton);
    options.appendChild(deleteButton);

    container.appendChild(h2);
    container.appendChild(options);

    h2.addEventListener("keyup", ()=> {
        saveButton.classList.replace("imposible","posible");
    })

    saveButton.addEventListener("click", ()=> {
        if (saveButton.className == "posible") {
            modificarObjeto(id,{nombre: h2.textContent});
            saveButton.classList.replace("posible", "imposible");
        }
    })

    deleteButton.addEventListener("click", ()=> {
        eliminarObjeto(id);
        document.querySelector(".nombres").removeChild(container);
    })
    return container;

}