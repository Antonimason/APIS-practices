"use strict";

const cajas = document.querySelectorAll(".caja");

const verifyVisibility = (entries) => {
    for (const entry of entries) {
        if(entry.isIntersecting) console.log("se esá viendo la caja: ", entry.target.textContent)
    }
}

const options = {
    treshold: [0,5]
}
const observer = new IntersectionObserver(verifyVisibility,options)

for (const caja of cajas) {
    observer.observe(caja)
}