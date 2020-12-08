import connect, { Database } from 'better-sqlite3'

// Layer Supertype de Persistencia
// https://martinfowler.com/eaaCatalog/layerSupertype.html
export class DAO {
  private readonly _table: string
  private _db: Database

  constructor(table: string) {
    this._table = table
    this._db = connect('./banco.db')
  }

  findAll(): any[] {
    const SQL = `SELECT * FROM ${this._table}`
    return this._db.prepare(SQL).all()
  }

  add(obj: any) {
    const campos = Object.keys(obj)
    const SQL = `INSERT INTO ${this._table} (` +
      campos.join(', ') +
      `) VALUES (` +
      campos.map(campo => `@${campo}`).join(', ') +
      ')'
    console.log(SQL)
    this._db.prepare(SQL).run(obj)
  }
}
