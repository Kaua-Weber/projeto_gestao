"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdsMenu = void 0;
const ControleCds_1 = require("../controllers/ControleCds");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class CdsMenu {
    controller;
    constructor() {
        this.controller = new ControleCds_1.ControleCds();
    }
    show() {
        console.log('9 - Listar CDs');
        console.log('10 - Cadastrar novo CD');
        console.log('11 - Editar CD');
        console.log('12 - Excluir CD');
    }
    async execute(input) {
        switch (input) {
            case '9':
                await this.list();
                break;
            case '10':
                await this.create();
                break;
            case '11':
                await this.edit();
                break;
            case '12':
                await this.delete();
                break;
        }
    }
    async list() {
        let cds = await this.controller.list();
        console.table(cds);
    }
    async create() {
        let nome = prompt('Nome: ');
        let cd = await this.controller.create(nome);
        console.log(`CD ID #${cd.id} criado com sucesso!`);
    }
    async edit() {
        let id = Number(prompt('Qual o ID? '));
        let cd = await this.controller.find(id);
        if (cd) {
            let nome = prompt(`Nome: (${cd.nome})`, cd.nome);
            cd = await this.controller.edit(cd, nome);
            console.log(`CD ID #${cd.id} atualizado com sucesso!`);
        }
        else {
            console.log('CD não encontrado!');
        }
    }
    async delete() {
        let id = Number(prompt('Qual o ID? '));
        let cd = await this.controller.find(id);
        if (cd) {
            await this.controller.delete(cd);
            console.log(`CD #${id} excluídO com sucesso!`);
        }
        else {
            console.log('CD não encontrada!');
        }
    }
}
exports.CdsMenu = CdsMenu;
