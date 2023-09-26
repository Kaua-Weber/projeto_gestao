"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControleCds = void 0;
const Cd_1 = require("../models/Cd");
class ControleCds {
    async list() {
        return await Cd_1.Cd.find();
    }
    async create(nome) {
        return await Cd_1.Cd.create({
            nome,
        }).save();
    }
    async find(id) {
        return await Cd_1.Cd.findOneBy({ id });
    }
    async edit(cd, nome) {
        cd.nome = nome;
        await cd.save();
        return cd;
    }
    async delete(cd) {
        await cd.remove();
    }
}
exports.ControleCds = ControleCds;
