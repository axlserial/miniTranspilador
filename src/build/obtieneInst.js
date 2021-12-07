export default class ObtieneInst {
    constructor() {
        this.entrada = document.getElementById("entrada");
        this.boton = document.getElementById("boton");
    }
    onClick(callback) {
        let lineas;
        this.boton.onclick = () => {
            if (this.entrada.value !== '') {
                lineas = this.entrada.value.split("\n");
                callback(lineas);
            }
        };
    }
}
