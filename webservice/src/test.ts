import { DAO } from './Persistence/DAO'

import { User } from './Model/User'
import { UserDAO } from './Persistence/UserDAO'

import { Pet } from './Model/Pet'
import { PetDAO } from './Persistence/PetDAO'

import { Operator } from './Persistence/QueryObject'

const dao = new DAO('users')
const rows = dao.findAll()
console.log(rows)
dao.add({ name: 'Jose', lastname: 'Ferreira' })

const userDAO = new UserDAO()
const user = new User('F', 'Soares')

if (user.isValid) {
  userDAO.add(user)
} else {
  console.log(user.errors)
}
console.log(userDAO.findAll())

const petDAO = new PetDAO()
const marcy = petDAO.queryObject('name', Operator.like, `'Marcy'`)
console.log('Marcy', marcy)
