import { parse } from 'url'
import { IncomingMessage, ServerResponse } from 'http'
import { User } from '../Model/User'

export const getAllUsersCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    try{
      const registers = User.all()
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(registers))
    } catch (error) {
      response.end(error)
    }
  }
}

export const getUserByIdCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    try {
      const { id } = parse(request.url ?? '', true).query
      if(typeof(id) === 'string') {
        const register = User.findById(parseInt(id))
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(register))
      }
    } catch(error) {
      response.end(error)
    }
  }
}

export const createUserCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    let body = ''
    request.on('data', (part) => body += part)
    request.on('end', () => {
      const { name, lastname } = JSON.parse(body)
      const user = new User(name, lastname)
      if(user.save()) {
        response.writeHead(201, { 'Content-Type': 'text/plain' })
        response.end('Usuario Criado')
      } else {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ errors: user.errors }))
      }
    })
  }
}

export const updateUserCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    try {
      const { id } = parse(request.url ?? '', true).query
      if(typeof(id) === 'string') {
        let body = ''
        request.on('data', (part) => body += part)
        request.on('end', () => {
          const { name, lastname } = JSON.parse(body)
          const user = new User(name, lastname)
          if(user.update(parseInt(id))) {
            response.writeHead(201, { 'Content-Type': 'text/plain' })
            response.end('Usuario Atualizado')
          } else {
            response.writeHead(400, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ errors: user.errors }))
          }
        })
      }
    } catch(error) {
      response.end(error)
    }
  }
}

export const deleteUserByIdCommand = {
  execute(request: IncomingMessage, response: ServerResponse): void {
    const { id } = parse(request.url ?? '', true).query
    if(typeof(id) === 'string') {
      const { name, lastname } = User.findById(parseInt(id))
      const user = new User(name, lastname)
      if(user.remove(parseInt(id))) {
        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('Usuario Deletado')
      } else {
        response.writeHead(400, { 'Content-Type': 'application/json' })
      }
    }
  }
}
