"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasMenu = void 0;
const ControleCategorias_1 = require("../controllers/ControleCategorias");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class CategoriasMenu {
    controller;
    constructor() {
        this.controller = new ControleCategorias_1.ControleCategorias();
    }
    show() {
        console.log('1 - Listar categorias');
        console.log('2 - Cadastrar nova categoria');
        console.log('3 - Editar categoria');
        console.log('4 - Excluir categoria');
    }
    async execute(input) {
        switch (input) {
            case '1':
                await this.list();
                break;
            case '2':
                await this.create();
                break;
            case '3':
                await this.edit();
                break;
            case '4':
                await this.delete();
                break;
        }
    }
    async list() {
        let categorias = await this.controller.list();
        console.table(categorias);
    }
    async create() {
        let nome = prompt('Nome: ');
        let categoria = await this.controller.create(nome);
        console.log(`Categoria ID #${categoria.id} criada com sucesso!`);
    }
    async edit() {
        let id = Number(prompt('Qual o ID? '));
        let categoria = await this.controller.find(id);
        if (categoria) {
            let nome = prompt(`Nome: (${categoria.nome})`, categoria.nome);
            categoria = await this.controller.edit(categoria, nome);
            console.log(`Categoria ID #${categoria.id} atualizada com sucesso!`);
        }
        else {
            console.log('Categoria não encontrada!');
        }
    }
    async delete() {
        let id = Number(prompt('Qual o ID? '));
        let categoria = await this.controller.find(id);
        if (categoria) {
            await this.controller.delete(categoria);
            console.log(`Categoria ID #${id} excluída com sucesso!`);
        }
        else {
            console.log('Categoria não encontrada!');
        }
    }
}
exports.CategoriasMenu = CategoriasMenu;
