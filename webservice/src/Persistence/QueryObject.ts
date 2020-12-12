export class QueryObject {
  field:string
  operator: Operator
  value:any

  constructor(field: string, operator: Operator, value: any){
    this.field = field
    this.operator = operator
    this.value = value
  }

  findByQuery(table: string) {
    return `SELECT * FROM ${table} WHERE ${this.field} ${this.operator} ${this.value}`
  }
}

export enum Operator {
  equal = "=",
  notEqual = "<>",
  greater = ">",
  minor = "<",
  like = "LIKE",
}

export class QueryObjectBuilder {

  private query: QueryObject

  constructor() {
    this.query = new QueryObject("", Operator.equal,"")
  }

  reset() {
    this.query = new QueryObject("", Operator.equal,"")
  }

  field(field: string) {
    this.query.field = field
    return this
  }

  operator(operator: Operator) {
    this.query.operator = operator
    return this
  }

  value(value: any) {
    this.query.value = value
    return this
  }

  get(): QueryObject {
    return this.query
  }
}
