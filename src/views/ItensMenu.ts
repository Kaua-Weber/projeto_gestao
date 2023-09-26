import { ControleItens } from '../controllers/ControleItens';
import { Categoria } from '../models/Categoria';
import { Item } from '../models/Item';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class ItensMenu {

  public controller: ControleItens;

  constructor () {
    this.controller = new ControleItens();
  }

  public show (): void {
    console.log('5 - Listar Itens');
    console.log('6 - Cadastrar novo item');
    console.log('7 - Editar item');
    console.log('8 - Excluir item');
  }

  public async execute (input: string): Promise<void> {
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

  private async list (): Promise<void> {
    let itens: Item[] = await this.controller.list();
    console.table(itens);
  }

  private async create (): Promise<void> {
    let nome: string = prompt('Nome: ');
    console.log('Categorias disponíveis:');
    const categorias: Categoria[] = await Categoria.find(); 
    categorias.forEach((categoria, index) => {
      console.log(`${index + 1}. ${categoria.nome} (ID: ${categoria.id})`);
    })
    let categoriaId: number = parseInt(prompt('Selecione o ID da Categoria: '));
    const categoriaSelecionada: Categoria | null = await Categoria.findOne({
      where: { id: categoriaId },
    })
    if (!categoriaSelecionada) {
      console.error('Categoria selecionada não é válida.');
      return;
    }
    let item = new Item();
  item.nome = nome;
  item.categoria = Promise.resolve(categoriaSelecionada);

  await item.save();

  console.log(`Item ID #${item.id} criado com sucesso na Categoria ID #${categoriaSelecionada.id}!`);
}




  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let item: Item | null = await this.controller.find(id);
    if (item) {
      let nome: string = prompt(`Nome: (${item.nome})`, item.nome);
      item = await this.controller.edit(item, nome);
      console.log(`Item ID #${item.id} atualizado com sucesso!`);
    } else {
      console.log('Item não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let item: Item | null = await this.controller.find(id);
    if (item) {
      await this.controller.delete(item);
      console.log(`Item #${id} excluídO com sucesso!`);
    } else {
      console.log('Item não encontrada!');
    }
  }
}