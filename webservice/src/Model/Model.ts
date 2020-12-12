import { DAO } from "./../Persistence/DAO"

export abstract class Model {

  private dao: DAO
  private _errors: string[] = []

  constructor(dao: DAO) {
    this.dao = dao
  }

  validate(): void {
    this._errors = []
    this._validate(this._errors)
  }

  abstract _validate(errors: string[]): void

  get isValid(): boolean {
    this.validate()
    return this._errors.length === 0
  }

  get errors(): string[] {
    return this._errors
  }

  save(): boolean {
    if (this.isValid) {
      this.dao.add(this)
      return true
    }

    return false
  }

  update(id: number): boolean {
    if (this.isValid) {
      this.dao.update(this, id)
      return true
    }

    return false
  }

  remove(id: number) {
    return this.dao.remove(id)
  }
}
