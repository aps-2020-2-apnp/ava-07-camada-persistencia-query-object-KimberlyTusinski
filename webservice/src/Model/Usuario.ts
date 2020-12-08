import { UsuarioDAO } from '../Persistence/UsuarioDAO'
import { Model } from './Model'

const dao = new UsuarioDAO()

export class Usuario extends Model {

  id?: number
  nome: string
  sobrenome?: string
  constructor(nome: string, sobrenome?: string, id?: number) {
    super()
    // VALIDAR ANTES
    // if (nome.length < 2) {
    //   throw new Error(`Nome deve ter pelo menos 2 caracteres (recebido: ${nome})`)
    // }
    this.id = id
    this.nome = nome
    this.sobrenome = sobrenome
  }

  _validate(erros: string[]): void {
    if (this.nome.length < 2) {
      erros.push(`Nome deve ter pelo menos 2 caracteres`)
    }
  }

  // Active Record
  save(): boolean {
    if (this.isValid) {
      dao.add(this)
      return true
    } else {
      return false
    }
  }

  // Active Record
  static all(): Usuario[] {
    return dao.findAll()
  }
}
