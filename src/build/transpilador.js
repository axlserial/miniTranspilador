import { reconoceInst } from './reconoceInst.js';
import { generaInst } from './generaInst.js';
import { normalizaInst } from './normalizaInst.js';
import ObtieneInst from './obtieneInst.js';
export default class Transpilador {
    constructor() {
        this.obtieneInst = new ObtieneInst();
        this.salidaBin = document.getElementById("salidaBin");
        this.salidaBin.readOnly = true;
        this.salidaHex = document.getElementById("salidaHex");
        this.salidaHex.readOnly = true;
        this.obtieneInst.onClick((lineas) => this.compila(lineas));
    }
    compila(lineas) {
        const lineasNormalizadas = normalizaInst.normaliza(lineas);
        const resultados = [];
        lineasNormalizadas.forEach(l => {
            resultados.push(generaInst.generar(reconoceInst.parser(l)));
        });
        let resBinario = '';
        let resHex = '';
        resultados.forEach(r => {
            resBinario += r.enBinario + "\n";
            resHex += r.enHex + "\n";
        });
        this.salidaBin.value = resBinario;
        this.salidaHex.value = resHex;
    }
}
