export class CategoryModel {
  id: number;
  name: string;

  constructor(data: CategoryModel) {
    this.id = data.id;
    this.name = data.name;
  }
}
