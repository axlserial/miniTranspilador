type datosBranch = {
	numLinea: number,
	inst: string
	etiqueta: string
}

type datosEtiqueta = {
	numLinea: number,
	etiqueta: string
}

type etConvertida = {
	numLinea: number,
	etiqueta: string,
	valor: number
}

class NormalizaInst {
	private instOriginales: string[];				// instrucciones originales
	private instNormalizadas: string[];				// resultado final despues del procesado
	private datosConstantes: etConvertida[];		// datos con los que se van a cambiar las etiquetas
	private saltos: datosBranch[];					// datos del branch con su etiqueta a donde salta

	constructor(){
		this.instOriginales = [];
		this.instNormalizadas = [];
		this.datosConstantes = [];
		this.saltos = [];
	}

	public normaliza(instrucciones: string[]): string[] {
		this.saltos = [];
		this.datosConstantes = [];
		let etiquetas: datosEtiqueta[] = [];

		this.instOriginales = [...instrucciones];

		this.obtieneBranchs();		
		etiquetas = this.obtieneEtiquetas();

		// si hay instrucciones branch y etiquetas
		if (this.saltos.length > 0 && etiquetas.length > 0){
			let etiquetaFilt: datosEtiqueta | undefined;
			this.saltos.forEach(s => {
				// obtiene datos de la etiqueta del branch
				etiquetaFilt = etiquetas.find(et => et.etiqueta === s.etiqueta);

				// Si se encontro algun elemento que coincida
				if (etiquetaFilt){
					this.datosConstantes.push({
						numLinea: s.numLinea,
						etiqueta: s.etiqueta,
						valor: etiquetaFilt.numLinea - s.numLinea
					});
				}
			});

			let lineaTemp: string;
			// cambia etiquetas por las constantes
			this.datosConstantes.forEach(d => {
				lineaTemp = this.instOriginales[d.numLinea];
				this.instOriginales[d.numLinea] = lineaTemp.replace(d.etiqueta, d.valor.toString());
			});

			this.instNormalizadas = [...this.instOriginales];
		} else {	// si no hubieron instrucciones branch
			this.instNormalizadas = [...instrucciones];
		}

		return this.instNormalizadas;
	}

	private obtieneBranchs(): void {
		// obtenemos que tipo de branch es y su posicion (si existe)
		for (let i = 0; i < this.instOriginales.length; i++){
			let tipoBranch = this.esBranch(this.instOriginales[i]);
			if (tipoBranch > 0){

				let instOriginal = [...this.instOriginales][i];

				let instPartida = instOriginal.split(" ");
				if (instPartida[0].includes(":")){
					instPartida.shift();
					instOriginal = instPartida.join(" ");
				}

				let et: string[];
				switch (tipoBranch) {
					case 1:
					case 2:
						et = instOriginal.split(" ");
						this.saltos.push({
							numLinea: i,
							inst: et[0],
							etiqueta: et[2]
						});
						break;

					case 3:
					case 4:
						et = instOriginal.split(" ");
						this.saltos.push({
							numLinea: i,
							inst: et[0],
							etiqueta: et[1]
						});
						break;
				}
			}
		}
	}

	private esBranch(linea: string): number {
		let instPartida = linea.split(" ");
		let ins: string;

		if (instPartida[0].includes(":")){
			ins = instPartida[1];
		} else {
			ins = instPartida[0];
		}

		let tipoBranch: number;		
		switch (ins) {
			case "CBZ":
				tipoBranch = 1;
				break;

			case "CBNZ":
				tipoBranch = 2;
				break;

			case "B":
				tipoBranch = 3;
				break;

			case "BL":
				tipoBranch = 4;
				break;
		
			default:
				tipoBranch = 0;
				break;
		}

		return tipoBranch;
	}

	private obtieneEtiquetas(): datosEtiqueta[] {
		let etiquetas: datosEtiqueta[] = [];
		let etiTemp: string[];
		let etiqueta: string;

		for (let i = 0; i < this.instOriginales.length; i++){
			if (this.instOriginales[i].includes(":")){

				etiTemp = this.instOriginales[i].split(" ");

				// obtiene etiqueta
				etiqueta = etiTemp[0];

				// borra etiqueta de la linea
				etiTemp.splice(0, 1);
				this.instOriginales[i] = etiTemp.join(" ");

				// se agregan los datos de la etiqueta
				etiqueta = etiqueta.replace(":", "");

				etiquetas.push({
					numLinea: i,
					etiqueta
				});
			}
		}

		return etiquetas;
	}
}

export const normalizaInst = new NormalizaInst();