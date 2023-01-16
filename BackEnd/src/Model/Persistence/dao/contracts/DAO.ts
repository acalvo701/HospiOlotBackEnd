
interface DAO<T> {
  //Metodes de consulta
  get(id: number): T
  getAll(): Array<T>;

  //Metodes modificadors 
  add(t: T): void;
  update(t: T): void;

}

export = DAO;
