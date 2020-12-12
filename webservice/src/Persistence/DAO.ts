import { database } from './Connection'
import { Operator, QueryObjectBuilder } from './QueryObject'

export class DAO {
  private readonly _table: string

  constructor(table: string) {
    this._table = table
  }

  findAll(): any[] {
    const SQL = `SELECT * FROM ${this._table}`

    return database.prepare(SQL).all()
  }

  add(object: any) {
    const fields = Object.keys(object)
    const query = fields.join(', ')
    const queryValues = fields.map(field => `@${field}`).join(', ')

    const SQL = `INSERT INTO ${this._table} (${query}) VALUES (${queryValues})`

    return database.prepare(SQL).run(object)
  }

  findById(id: number): any {
    const SQL = `SELECT * FROM ${this._table} WHERE ${this._table}.id = ${id}`

    return database.prepare(SQL).get()
  }

  update(object: any, id: number) {
    const query = Object.keys(object).map(key => `${key} = @${key}`).join(', ')
    const SQL = `UPDATE ${this._table} SET ${query} =? WHERE id = ${id}`

    return database.prepare(SQL).run(object)
  }

  remove(id: number): any {
    const SQL = `DELETE FROM ${this._table} WHERE id = ${id}`

    return database.prepare(SQL).run()
  }

  queryObject(field: string, operator: Operator, value: string) {
    const queryBuilder = new QueryObjectBuilder()
    const query = queryBuilder.field(field).operator(operator).value(value).get()
    const SQL = query.findByQuery(this._table)

    return database.prepare(SQL).get()
  }
}
