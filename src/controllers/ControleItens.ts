import { Categoria } from '../models/Categoria';
import { Item } from '../models/Item';

export class ControleItens {
  async list (): Promise<Item[]> {
    return await Item.find();
  }

  async create (nome: string, categoriaId: number): Promise<Item> {
    let categoria: Categoria | null = await Categoria.findOneBy({ id: categoriaId });
    if (! categoria) {
      throw new Error('Categoria não encontrada!');
    }
    return await Item.create({
      nome: nome,
      categoria_id: categoriaId,
    }).save();
  }

  async find (id: number): Promise<Item|null> {
    return await Item.findOneBy({ id });
  }

  async edit (item: Item, nome: string): Promise<Item> {
    item.nome = nome;
    await item.save();

    return item;
  }

  async delete (item: Item): Promise<void> {
    await item.remove();
  }
}