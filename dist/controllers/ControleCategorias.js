"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControleCategorias = void 0;
const Categoria_1 = require("../models/Categoria");
class ControleCategorias {
    async list() {
        return await Categoria_1.Categoria.find();
    }
    async create(nome) {
        return await Categoria_1.Categoria.create({
            nome,
        }).save();
    }
    async find(id) {
        return await Categoria_1.Categoria.findOneBy({ id });
    }
    async edit(categoria, nome) {
        categoria.nome = nome;
        await categoria.save();
        return categoria;
    }
    async delete(categoria) {
        await categoria.remove();
    }
}
exports.ControleCategorias = ControleCategorias;
