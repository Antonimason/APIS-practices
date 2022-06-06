"use strict"

/*-------READASTEXT-----------*/
const zona = document.querySelector(".zona-arrastre");

zona.addEventListener("dragover", e=> {
    e.preventDefault();
    changeStyle(e.srcElement, "#444");
})
zona.addEventListener("dragleave", e=> {
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
})

zona.addEventListener("drop", e=> {
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
    cargarArchivo(e.dataTransfer.files[0]);
})

const changeStyle = (obj, color) =>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
}

const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsText(ar);
    reader.addEventListener("load", (e)=> {
        document.querySelector(".resultado").textContent = e.currentTarget.result;
    })
}


/*-----------ReadAsDataURL---------*/

const zonita = document.querySelector(".zonita");

zonita.addEventListener("dragover", e=> {
    e.preventDefault();
    changingStyle(e.srcElement, "#444");
})
zonita.addEventListener("dragleave", e=> {
    e.preventDefault();
    changingStyle(e.srcElement, "#888");
})

zonita.addEventListener("drop", e=> {
    e.preventDefault();
    changingStyle(e.srcElement, "#888");
    cargarArchivito(e.dataTransfer.files[0]);
})

const changingStyle = (obj, color) =>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
}

const cargarArchivito = ar =>{
    const readeri = new FileReader();
    readeri.readAsDataURL(ar);
    readeri.addEventListener("load", (e)=> {
        let url = e.currentTarget.result;
        let img = document.createElement("IMG");
        img.setAttribute("src", url);
        document.querySelector(".resultadito").appendChild(img);
    })
}

/*--------VIDEO ReadAsArrayBuffer---------------- */

const zonota = document.querySelector(".zonota");

zonota.addEventListener("dragover", e=> {
    e.preventDefault();
    changedStyle(e.srcElement, "#444");
})
zonota.addEventListener("dragleave", e=> {
    e.preventDefault();
    changedStyle(e.srcElement, "#888");
})

zonota.addEventListener("drop", e=> {
    e.preventDefault();
    changedStyle(e.srcElement, "#888");
    cargarArchivote(e.dataTransfer.files[0]);
})

const changedStyle = (obj, color) =>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
}

const cargarArchivote = ar =>{
    const readero = new FileReader();
    readero.readAsArrayBuffer(ar);
    readero.addEventListener("load", (e)=> {
        let video = new Blob ([new Uint8Array(e.currentTarget.result)], {type: "video/mp4"})
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src", url);
        document.querySelector(".resultadito").appendChild(img);
        img.play();
    })
}

