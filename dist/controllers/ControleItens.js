"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControleItens = void 0;
const Categoria_1 = require("../models/Categoria");
const Item_1 = require("../models/Item");
class ControleItens {
    async list() {
        return await Item_1.Item.find();
    }
    async create(nome, categoriaId) {
        let categoria = await Categoria_1.Categoria.findOneBy({ id: categoriaId });
        if (!categoria) {
            throw new Error('Categoria não encontrada!');
        }
        return await Item_1.Item.create({
            nome: nome,
            categoria_id: categoriaId,
        }).save();
    }
    async find(id) {
        return await Item_1.Item.findOneBy({ id });
    }
    async edit(item, nome) {
        item.nome = nome;
        await item.save();
        return item;
    }
    async delete(item) {
        await item.remove();
    }
}
exports.ControleItens = ControleItens;
