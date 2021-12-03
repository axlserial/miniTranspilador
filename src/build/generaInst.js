class GeneraInst {
    constructor() {
        this.enBinario = '';
        this.enHex = '';
    }
    generar(inst) {
        let instComentada;
        switch (inst.instruccion) {
            case "ADD":
                this.enBinario = "10001011000"; //	codigo del ADD
                this.enBinario += this.generarBinReg(inst.registros[2]); //	registro Rm
                this.enBinario += "000000"; //	shamt
                this.enBinario += this.generarBinReg(inst.registros[1]); //	registro Rn
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rd
                instComentada = `\t\t-- ADD X${inst.registros[0]}, X${inst.registros[1]}, X${inst.registros[2]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "SUB":
                this.enBinario = "11001011000"; //	codigo del SUB
                this.enBinario += this.generarBinReg(inst.registros[2]); //	registro Rm
                this.enBinario += "000000"; //	shamt
                this.enBinario += this.generarBinReg(inst.registros[1]); //	registro Rn
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rd
                instComentada = `\t\t-- SUB X${inst.registros[0]}, X${inst.registros[1]}, X${inst.registros[2]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "ADDI":
                this.enBinario = "1001000100"; //	codigo del ADDI
                this.enBinario += this.generaBinConstAS(inst.registros[2]); //	constante a sumar (inmmediate)
                this.enBinario += this.generarBinReg(inst.registros[1]); //	registro Rn
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rd
                instComentada = `\t\t-- ADDI X${inst.registros[0]}, X${inst.registros[1]}, ${inst.registros[2]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "SUBI":
                this.enBinario = "1101000100"; //	codigo del SUBI
                this.enBinario += this.generaBinConstAS(inst.registros[2]); //	constante a sumar (inmmediate)
                this.enBinario += this.generarBinReg(inst.registros[1]); //	registro Rn
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rd
                instComentada = `\t\t-- SUBI X${inst.registros[0]}, X${inst.registros[1]}, ${inst.registros[2]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "LDUR":
                this.enBinario = "11111000010"; //	codigo del LDUR
                this.enBinario += this.generaBinConstLS(inst.registros[2]); //	offset de donde cargar (address)
                this.enBinario += "00"; //	op2
                this.enBinario += this.generarBinReg(inst.registros[1]); //	registro Rn
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rt
                instComentada = `\t\t-- LDUR X${inst.registros[0]}, [X${inst.registros[1]}, ${inst.registros[2]}]`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; // representacion en hex del numero
                break;
            case "STUR":
                this.enBinario = "11111000000"; //	codigo del STUR
                this.enBinario += this.generaBinConstLS(inst.registros[2]); //	offset de donde cargar (address)
                this.enBinario += "00"; //	op2
                this.enBinario += this.generarBinReg(inst.registros[1]); //	registro Rn
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rt
                instComentada = `\t\t-- STUR X${inst.registros[0]}, [X${inst.registros[1]}, ${inst.registros[2]}]`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "CBZ":
                this.enBinario = "10110100"; //	codigo del CBZ
                this.enBinario += this.generaBinConstCZ(inst.registros[1]); //	offset hacia donde saltar (address)
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rt
                instComentada = `\t\t-- CBZ X${inst.registros[0]}, ${inst.registros[1]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "CBNZ":
                this.enBinario = "10110101"; //	codigo del CBNZ
                this.enBinario += this.generaBinConstCZ(inst.registros[1]); //	offset hacia donde saltar (address)
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro Rt
                instComentada = `\t\t-- CBNZ X${inst.registros[0]}, ${inst.registros[1]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "B":
                this.enBinario = "000101"; //	codigo del B
                this.enBinario += this.generaBinConstB(inst.registros[0]); //	offset hacia donde saltar (address)
                instComentada = `\t\t-- B ${inst.registros[0]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "BL":
                this.enBinario = "100101"; //	codigo del BL
                this.enBinario += this.generaBinConstB(inst.registros[0]); //	offset hacia donde saltar (address)
                instComentada = `\t\t-- BL ${inst.registros[0]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'X"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
            case "BR":
                this.enBinario = "11010110000"; //	codigo del BR
                this.enBinario += "0000000000000000"; //	todo lo intermedio puras 0's
                this.enBinario += this.generarBinReg(inst.registros[0]); //	registro a leer Rd
                instComentada = `\t\t-- BR X${inst.registros[0]}`; // representancion comentada de la instruccion
                this.enBinario += instComentada;
                this.enHex = 'x"' + parseInt(this.enBinario, 2).toString(16) + '"' + instComentada; //	representacion en hex del numero
                break;
        }
        return {
            enBinario: this.enBinario,
            enHex: this.enHex
        };
    }
    // Genera el numero binario para los registros
    generarBinReg(num) {
        let bin = Array.from(parseInt(num, 10).toString(2));
        if (bin.length < 5) {
            while (bin.length < 5) {
                bin.unshift("0");
            }
        }
        return bin.join("");
    }
    // Genera el numero binario para la constante de ADDI/SUBI
    generaBinConstAS(num) {
        let bin = Array.from(parseInt(num, 10).toString(2));
        if (bin.length < 12) {
            while (bin.length < 12) {
                bin.unshift("0");
            }
        }
        return bin.join("");
    }
    // Genera el numero binario para la constante de LDUR/STUR
    generaBinConstLS(num) {
        let bin = Array.from(parseInt(num, 10).toString(2));
        if (bin.length < 9) {
            while (bin.length < 9) {
                bin.unshift("0");
            }
        }
        return bin.join("");
    }
    // Genera el numero binario para la constante de CBZ/CBNZ
    generaBinConstCZ(num) {
        let numero = parseInt(num, 10) > 0 ? parseInt(num, 10) : parseInt(num, 10) >>> 0;
        let bin = Array.from(numero.toString(2));
        // ajusta la cantidad de bits a 19 si es negativo
        if (bin.length === 32) {
            bin.splice(0, 13);
        }
        if (bin.length < 19) {
            while (bin.length < 19) {
                bin.unshift("0");
            }
        }
        return bin.join("");
    }
    // Genera el numero binario para la constante de B/BL
    generaBinConstB(num) {
        let numero = parseInt(num, 10) > 0 ? parseInt(num, 10) : parseInt(num, 10) >>> 0;
        let bin = Array.from(numero.toString(2));
        // ajusta la cantidad de bits a 26 si es negativo
        if (bin.length === 32) {
            bin.splice(0, 6);
        }
        if (bin.length < 26) {
            while (bin.length < 26) {
                bin.unshift("0");
            }
        }
        return bin.join("");
    }
}
export const generaInst = new GeneraInst();
