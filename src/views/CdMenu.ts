import { ControleCds } from '../controllers/ControleCds';
import { Cd } from '../models/Cd';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class CdsMenu {

  public controller: ControleCds;

  constructor () {
    this.controller = new ControleCds();
  }

  public show (): void {
    console.log('9 - Listar CDs');
    console.log('10 - Cadastrar novo CD');
    console.log('11 - Editar CD');
    console.log('12 - Excluir CD');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '9':
        await this.list();
        break;
      case '10':
        await this.create();
        break;
      case '11':
        await this.edit();
        break;
      case '12':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let cds: Cd[] = await this.controller.list();
    console.table(cds);
  }

  private async create (): Promise<void> {
    let nome: string = prompt('Nome: ');
    let cd: Cd = await this.controller.create(nome);
    console.log(`CD ID #${cd.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let cd: Cd | null = await this.controller.find(id);
    if (cd) {
      let nome: string = prompt(`Nome: (${cd.nome})`, cd.nome);
      cd = await this.controller.edit(cd, nome);
      console.log(`CD ID #${cd.id} atualizado com sucesso!`);
    } else {
      console.log('CD não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let cd: Cd | null = await this.controller.find(id);
    if (cd) {
      await this.controller.delete(cd);
      console.log(`CD #${id} excluídO com sucesso!`);
    } else {
      console.log('CD não encontrada!');
    }
  }
}