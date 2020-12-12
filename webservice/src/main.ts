import { createServer } from 'http'
import { FrontController, Method } from './Presentation/FrontController'

import {
  getAllUsersCommand,
  getUserByIdCommand,
  createUserCommand,
  updateUserCommand,
  deleteUserByIdCommand
} from './Presentation/UserCommands'

import {
  getAllPetsCommand,
  getPetByIdCommand,
  createPetCommand,
  updatePetCommand,
  deletePetByIdCommand,
} from './Presentation/PetCommands'

const controller = new FrontController()

controller.register(Method.GET, '/users', getAllUsersCommand)
controller.register(Method.GET, '/user', getUserByIdCommand)
controller.register(Method.POST, '/user', createUserCommand)
controller.register(Method.PUT, '/user', updateUserCommand)
controller.register(Method.DELETE, '/user', deleteUserByIdCommand)

controller.register(Method.GET, '/pets', getAllPetsCommand)
controller.register(Method.GET, '/pet', getPetByIdCommand)
controller.register(Method.POST, '/pet', createPetCommand)
controller.register(Method.PUT, '/pet', updatePetCommand)
controller.register(Method.DELETE, '/pet', deletePetByIdCommand)

const server = createServer((request, response) => controller.handle(request, response))
server.listen(9999, () => {
  console.log('Server running at http://localhost:9999')
})
