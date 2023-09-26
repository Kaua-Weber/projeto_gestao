"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItensMenu = void 0;
const ControleItens_1 = require("../controllers/ControleItens");
const Categoria_1 = require("../models/Categoria");
const Item_1 = require("../models/Item");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class ItensMenu {
    controller;
    constructor() {
        this.controller = new ControleItens_1.ControleItens();
    }
    show() {
        console.log('5 - Listar Itens');
        console.log('6 - Cadastrar novo item');
        console.log('7 - Editar item');
        console.log('8 - Excluir item');
    }
    async execute(input) {
        switch (input) {
            case '5':
                await this.list();
                break;
            case '6':
                await this.create();
                break;
            case '7':
                await this.edit();
                break;
            case '8':
                await this.delete();
                break;
        }
    }
    async list() {
        let itens = await this.controller.list();
        console.table(itens);
    }
    async create() {
        let nome = prompt('Nome: ');
        console.log('Categorias disponíveis:');
        const categorias = await Categoria_1.Categoria.find();
        categorias.forEach((categoria, index) => {
            console.log(`${index + 1}. ${categoria.nome} (ID: ${categoria.id})`);
        });
        let categoriaId = parseInt(prompt('Selecione o ID da Categoria: '));
        const categoriaSelecionada = await Categoria_1.Categoria.findOne({
            where: { id: categoriaId },
        });
        if (!categoriaSelecionada) {
            console.error('Categoria selecionada não é válida.');
            return;
        }
        let item = new Item_1.Item();
        item.nome = nome;
        item.categoria = Promise.resolve(categoriaSelecionada);
        await item.save();
        console.log(`Item ID #${item.id} criado com sucesso na Categoria ID #${categoriaSelecionada.id}!`);
    }
    async edit() {
        let id = Number(prompt('Qual o ID? '));
        let item = await this.controller.find(id);
        if (item) {
            let nome = prompt(`Nome: (${item.nome})`, item.nome);
            item = await this.controller.edit(item, nome);
            console.log(`Item ID #${item.id} atualizado com sucesso!`);
        }
        else {
            console.log('Item não encontrado!');
        }
    }
    async delete() {
        let id = Number(prompt('Qual o ID? '));
        let item = await this.controller.find(id);
        if (item) {
            await this.controller.delete(item);
            console.log(`Item #${id} excluídO com sucesso!`);
        }
        else {
            console.log('Item não encontrada!');
        }
    }
}
exports.ItensMenu = ItensMenu;
