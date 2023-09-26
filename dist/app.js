"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const CategoriaMenu_1 = require("./views/CategoriaMenu");
const ItensMenu_1 = require("./views/ItensMenu");
const CdMenu_1 = require("./views/CdMenu");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
async function main() {
    await db_1.default.initialize();
    // Inicializa os menus
    let categoriasMenu = new CategoriaMenu_1.CategoriasMenu();
    let itensMenu = new ItensMenu_1.ItensMenu();
    let cdsMenu = new CdMenu_1.CdsMenu();
    // Armazena a escolha do usuário
    let input = '';
    do {
        console.clear();
        // Mostra as opções do menu
        categoriasMenu.show();
        itensMenu.show();
        cdsMenu.show();
        console.log('0 - Sair');
        // Captura a escolha do usuário
        input = prompt('Selecione a opção desejada:');
        if (input != '0') {
            // Executa a ação da escolha
            await categoriasMenu.execute(input);
            await itensMenu.execute(input);
            await cdsMenu.execute(input);
            prompt('Pressione enter para continuar');
        }
    } while (input != '0');
}
main();
