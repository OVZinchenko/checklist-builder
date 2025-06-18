type Item = {
  id: string;
  title: string;
  curentStatus: number;
  descriptions: never[];
  statuses: string[];
}

type Items = Item[];

type CheckList = {
  title: string;
  checkList: Items;
}

type Checklists = CheckList[]

type Task = {
  taskName: string,
  status: number,
  description: string[],
  checkLists: Checklists
}

export type {
  Item,
  Items,
  CheckList,
  Checklists,
  Task
}