import { DAO } from './Persistence/DAO'
import { UsuarioDAO } from './Persistence/UsuarioDAO'
import { Usuario } from './Model/Usuario'

const dao = new DAO('usuarios')
// const rows = dao.findAll()
// console.log(rows)
// dao.add({nome: 'Jose', sobrenome: 'Ferreira'})

const usuario = new Usuario('F', 'Soares')
const daoUsuario = new UsuarioDAO()
//console.log(daoUsuario.findAll())
if (usuario.isValid) {
  daoUsuario.add(usuario)
} else {
  console.log(usuario.erros)
}











