import {reconoceInst} from './reconoceInst.js';
import {generaInst, instGenerada} from './generaInst.js';
import {normalizaInst} from './normalizaInst.js';
import ObtieneInst from './obtieneInst.js';

export default class Transpilador {
	private obtieneInst: ObtieneInst;
	private salidaBin: HTMLTextAreaElement;
	private salidaHex: HTMLTextAreaElement;

	constructor(){
		this.obtieneInst = new ObtieneInst();
		this.salidaBin = <HTMLTextAreaElement>document.getElementById("salidaBin");
		this.salidaBin.readOnly = true;
		this.salidaHex = <HTMLTextAreaElement>document.getElementById("salidaHex");
		this.salidaHex.readOnly = true;

		this.obtieneInst.onClick((lineas: string[]) => this.compila(lineas));
	}

	private compila(lineas: string[]){
		const lineasNormalizadas = normalizaInst.normaliza(lineas);
		const resultados: instGenerada[] = [];

		lineasNormalizadas.forEach(l => {
			resultados.push(generaInst.generar(reconoceInst.parser(l)));
		});

		let resBinario: string = ''; 
		let resHex: string = '';

		resultados.forEach(r => {
			resBinario += r.enBinario + "\n";
			resHex += r.enHex + "\n";
		});

		this.salidaBin.value = resBinario;
		this.salidaHex.value = resHex;
	}
}