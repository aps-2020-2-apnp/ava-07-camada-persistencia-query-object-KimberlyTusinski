import { DAO } from "./DAO"
import { Pet } from "./../Model/Pet"

export class PetDAO extends DAO {

  constructor() {
    super('pets')
  }

  add(pet: Pet) {
    const {name, kind, age, gender, owner} = pet
    return super.add({ name, kind, age, gender, owner })
  }

  update(pet: Pet, id: number) {
    return super.update(
      {
        name: pet.name,
        kind: pet.kind,
        age: pet.age,
        gender: pet.gender,
        owner: pet.owner
      }, id
    )
  }
}
