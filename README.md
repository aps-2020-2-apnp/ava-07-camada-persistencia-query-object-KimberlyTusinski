# Avaliação #07 Camada de Persistência & Query Object

**Classroom:** <https://classroom.github.com/a/G2T2zOh6>

## Tarefas

Implementar `Command`, `Model` e `DAO` específicos para um objeto _Pet_ e escrever sua respectiva tabela para persistência em [`schema.sql`](webservice/schema.sql).

Implementar os métodos `findById(id:number)`, `remove(id:number)` e `update(obj:any)` em [`DAO.ts`](webservice/src/Persistence/DAO.ts) para que funcionem genericamente.

Implementar `findByQuery(query:QueryObject)` em [`DAO.ts`](webservice/src/Persistence/DAO.ts). Ver Padrão de Arquitetura **Query Object** em <https://martinfowler.com/eaaCatalog/queryObject.html>.

Generalizar mais [`Model.ts`](webservice/src/Model/Model.ts) de modo a contemplar os métodos `save():boolean`, `update():boolean` e `delete()` de forma genérica (deve ser feito após implementar _remove_ e _update_ em DAO).

## Desafio

Obter o `id` do registro após ser inserido e usá-lo para _settar_ no objeto persistido.
