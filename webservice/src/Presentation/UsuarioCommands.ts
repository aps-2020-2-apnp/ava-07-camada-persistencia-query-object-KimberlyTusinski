import { IncomingMessage, ServerResponse } from 'http';
import { Usuario } from '../Model/Usuario';
import { Command } from './Command'


// GET /usuarios
class TodosUsuariosCommand implements Command {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    const registros = Usuario.all()
    resp.writeHead(200, { 'Content-Type': 'application/json' })
    resp.end(JSON.stringify(registros))
  }
}

export const todosUsuariosCommand = new TodosUsuariosCommand()

export const novoUsuarioCommand = { // objeto literal
  execute(req: IncomingMessage, resp: ServerResponse): void {
    let corpo = ''
    req.on('data', (parte) => corpo += parte)
    req.on('end', () => {
      const {nome, sobrenome} = JSON.parse(corpo)
      const usuario = new Usuario(nome, sobrenome)
      if (usuario.save()) {
        resp.writeHead(201, { 'Content-Type': 'text/plain' })
        resp.end('Usuario Criado')
      } else {
        resp.writeHead(400, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ erros: usuario.erros }))
      }
    })
  }
}
