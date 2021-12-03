class ReconoceInst {
    constructor() {
        this.instruccion = '';
        this.registros = new Array();
    }
    parser(ins) {
        this.instruccion = ins.split(" ")[0];
        this.registros = new Array();
        this.seleccion(ins);
        return {
            instruccion: this.instruccion,
            registros: this.registros
        };
    }
    seleccion(ins) {
        let regs;
        regs = ins.split(" ");
        regs.splice(0, 1);
        switch (this.instruccion) {
            case "ADD":
            case "SUB":
            case "ADDI":
            case "SUBI":
            case "CBZ":
            case "CBNZ":
                regs.forEach(s => {
                    if (s.includes("X")) {
                        s = s.replace("X", "");
                    }
                    if (s.includes(",")) {
                        s = s.replace(",", "");
                    }
                    this.registros.push(s);
                });
                break;
            case "STUR":
            case "LDUR":
                regs.forEach(s => {
                    if (s.includes("X")) {
                        s = s.replace("X", "");
                    }
                    if (s.includes(",")) {
                        s = s.replace(",", "");
                    }
                    if (s.includes("[")) {
                        s = s.replace("[", "");
                    }
                    if (s.includes("]")) {
                        s = s.replace("]", "");
                    }
                    this.registros.push(s);
                });
                break;
            case "B":
            case "BL":
            case "BR":
                if (regs[0].includes("X")) {
                    regs[0] = regs[0].replace("X", "");
                }
                this.registros.push(regs[0]);
                break;
        }
    }
}
export const reconoceInst = new ReconoceInst();
