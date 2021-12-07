type obtieneInstrucciones = (lineas: string[]) => void;

export default class ObtieneInst {
	private entrada: HTMLTextAreaElement;
	private boton: HTMLButtonElement;

	constructor(){
		this.entrada = <HTMLTextAreaElement>document.getElementById("entrada");
		this.boton = <HTMLButtonElement>document.getElementById("boton");
	}

	public onClick(callback: obtieneInstrucciones): void {
		let lineas: string[];
		this.boton!.onclick = () => {
			if (this.entrada.value !== ''){
				lineas = this.entrada.value.split("\n");
				callback(lineas);
			}
		};
	}
}