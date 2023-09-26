import DB from './db';
import { CategoriasMenu } from './views/CategoriaMenu';
import { ItensMenu } from './views/ItensMenu';
import { CdsMenu } from './views/CdMenu';
import promptSync from 'prompt-sync';

const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();

  // Inicializa os menus
  let categoriasMenu: CategoriasMenu = new CategoriasMenu();
  let itensMenu: ItensMenu = new ItensMenu();
  let cdsMenu: CdsMenu  = new CdsMenu ();

  // Armazena a escolha do usuário
  let input: string = '';

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