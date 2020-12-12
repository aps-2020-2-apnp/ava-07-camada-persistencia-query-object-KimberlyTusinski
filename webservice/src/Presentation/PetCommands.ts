import { parse } from 'url'
import { IncomingMessage, ServerResponse } from "http"
import { Pet } from "../Model/Pet"

export const getAllPetsCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    try {
      const registers = Pet.all()
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(registers))
    } catch (error) {
      response.end(error)
    }
  }
}

export const getPetByIdCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {

    if(request.url?.indexOf("id=")) {
      try {
        const { id } = parse(request.url ?? '', true).query
        if(typeof(id) === 'string') {
          const register = Pet.findById(parseInt(id))
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify(register))
        }
      } catch (error) {
        response.end(error)
      }
    }
  }
}


export const createPetCommand = {
  execute(request: IncomingMessage, response: ServerResponse) {
    try{
      let body = ''
      request.on('data', (part) => body += part)
      request.on('end', () => {
        const {name, kind, age, gender, owner} = JSON.parse(body)
        const pet = new Pet(name, kind, age, gender, owner)
        if (pet.save()) {
          response.writeHead(201, { 'Content-Type': 'text/plain' })
          response.end('Pet Criado')
        } else {
          response.writeHead(400, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify({ errors: pet.errors }))
        }
      })
    }catch (error) {
      response.end(error)
    }
  }
}


export const updatePetCommand = {
  execute(request: IncomingMessage, resp: ServerResponse): void {
    try {
      const { id } = parse(request.url ?? '', true).query
      if(typeof(id) === 'string'){
        let body = ''
        request.on('data', (part) => body += part)
        request.on('end', () => {
          const {name, kind, age, gender, owner} = JSON.parse(body)
          const pet = new Pet(name, kind, age, gender, owner)
          if (pet.update(parseInt(id))) {
            resp.writeHead(201, { 'Content-Type': 'text/plain' })
            resp.end('Pet Atualizado')
          } else {
            resp.writeHead(400, { 'Content-Type': 'application/json' })
            resp.end({ errors: pet.errors })
          }
        })
      }
    } catch (error) {
      resp.end(error)
    }
  }
}

export const deletePetByIdCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    try {
      const { id } = parse(request.url ?? '', true).query
      if(typeof(id) === 'string') {
        const { name, kind, age, gender, owner } = Pet.findById(parseInt(id))
        const pet = new Pet(name, kind, age, gender, owner)
        if(pet.remove(parseInt(id))) {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end('Pet Deletado')
        } else {
          response.writeHead(400, { 'Content-Type': 'application/json' })
        }
      }
    } catch (error) {
      response.end(error)
    }
  }
}
