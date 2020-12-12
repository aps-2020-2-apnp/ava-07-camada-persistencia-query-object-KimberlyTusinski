import { DAO } from './DAO'
import { User } from './../Model/User'

export class UserDAO extends DAO {

  constructor() {
    super('users')
  }

  add({ name, lastname }: User) {
    return super.add({ name, lastname })
  }

  update({ name, lastname }: User, id: number){
    return super.update({ name, lastname }, id)
  }
}
