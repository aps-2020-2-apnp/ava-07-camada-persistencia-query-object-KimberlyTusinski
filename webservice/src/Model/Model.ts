
export abstract class Model {
  private _erros: string[] = []

  validate(): void {
    this._erros = []
    this._validate(this._erros)
  }

  abstract _validate(erros: string[]): void

  get isValid(): boolean {
    this.validate()
    return this._erros.length === 0
  }

  get erros(): string[] {
    return this._erros
  }
}
