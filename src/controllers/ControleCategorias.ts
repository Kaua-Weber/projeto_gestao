import { Categoria } from '../models/Categoria';

export class ControleCategorias {
  async list (): Promise<Categoria[]> {
    return await Categoria.find();
  }

  async create (nome: string): Promise<Categoria> {
    return await Categoria.create({
      nome,
    }).save();
  }

  async find (id: number): Promise<Categoria|null> {
    return await Categoria.findOneBy({ id });
  }

  async edit (categoria: Categoria, nome: string): Promise<Categoria> {
    categoria.nome = nome;
    await categoria.save();

    return categoria;
  }

  async delete (categoria: Categoria): Promise<void> {
    await categoria.remove();
  }
}