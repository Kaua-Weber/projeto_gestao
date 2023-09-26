import { ControleCategorias } from '../controllers/ControleCategorias';
import { Categoria } from '../models/Categoria';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class CategoriasMenu {

  public controller: ControleCategorias;

  constructor () {
    this.controller = new ControleCategorias();
  }

  public show (): void {
    console.log('1 - Listar categorias');
    console.log('2 - Cadastrar nova categoria');
    console.log('3 - Editar categoria');
    console.log('4 - Excluir categoria');
  }

  public async execute (input: string): Promise<void> {
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

  private async list (): Promise<void> {
    let categorias: Categoria[] = await this.controller.list();
    console.table(categorias);
  }

  private async create (): Promise<void> {
    let nome: string = prompt('Nome: ');
    let categoria: Categoria = await this.controller.create(nome);
    console.log(`Categoria ID #${categoria.id} criada com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let categoria: Categoria | null = await this.controller.find(id);
    if (categoria) {
      let nome: string = prompt(`Nome: (${categoria.nome})`, categoria.nome);
      categoria = await this.controller.edit(categoria, nome);
      console.log(`Categoria ID #${categoria.id} atualizada com sucesso!`);
    } else {
      console.log('Categoria não encontrada!');
    }
  }

  

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let categoria: Categoria | null = await this.controller.find(id);
    if (categoria) {
      await this.controller.delete(categoria);
      console.log(`Categoria ID #${id} excluída com sucesso!`);
    } else {
      console.log('Categoria não encontrada!');
    }
  }





}