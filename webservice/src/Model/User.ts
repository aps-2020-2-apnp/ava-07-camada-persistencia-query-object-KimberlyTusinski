import { Model } from './Model'
import { UserDAO } from '../Persistence/UserDAO'
import { Operator } from "../Persistence/QueryObject"

const dao = new UserDAO()

export class User extends Model {
  id?: number
  name: string
  lastname?: string
  constructor(name: string, lastname?: string, id?: number) {
    super(dao)

    this.id = id
    this.name = name
    this.lastname = lastname
  }

  _validate(erros: string[]): void {
    if (this.name.length < 2) {
      erros.push('Name must be at least 2 characters (Nome deve conter no minimo 2 caracteres)')
    }
  }

  static all(): User[] {
    return dao.findAll()
  }

  static findById(id: number): User {
    return dao.queryObject("id", Operator.like, `'${id}'`)
  }
}
