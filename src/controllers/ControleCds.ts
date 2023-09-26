import { Cd } from '../models/Cd';

export class ControleCds {
  async list (): Promise<Cd[]> {
    return await Cd.find();
  }

  async create (nome: string): Promise<Cd> {
    return await Cd.create({
      nome,
    }).save();
  }

  async find (id: number): Promise<Cd|null> {
    return await Cd.findOneBy({ id });
  }

  async edit (cd: Cd, nome: string): Promise<Cd> {
    cd.nome = nome;
    await cd.save();

    return cd;
  }

  async delete (cd: Cd): Promise<void> {
    await cd.remove();
  }
}