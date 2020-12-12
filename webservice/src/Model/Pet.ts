import { Model } from "./Model";
import { User } from "./User"
import { PetDAO } from "../Persistence/PetDAO"
import { Operator } from "../Persistence/QueryObject"

const dao = new PetDAO()

export class Pet extends Model {
  id?: number
  name: string
  kind: string
  age: number
  gender: 'F'|'M'
  owner: number

  constructor(name: string, kind: string, age: number, gender: 'F'|'M', owner: number, id?: number) {
    super(dao)

    this.id = id
    this.name = name
    this.kind = kind
    this.age = age
    this.gender = gender
    this.owner = owner
  }

  _validate(erros: string[]): void {
    if (!User.findById(this.owner)) {
      erros.push('Pet must to have a owner (Pet precisa ter um responsável cadastrado)')
    }
  }

  static all(): Pet[] {
    return dao.findAll()
  }

  static findById(id: number): Pet {
    return dao.queryObject("id", Operator.like, `'${id}'`)
  }
}
