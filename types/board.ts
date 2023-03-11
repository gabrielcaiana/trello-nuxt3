export type ID = string;

export interface Board {
  id: ID;
  title: string;
  columns: Column[];
  userId: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: ID;
  title: string;
  tasks: Task[];
  boardId: ID;
  userId: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: ID;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: ID;
  userId: ID;
}
