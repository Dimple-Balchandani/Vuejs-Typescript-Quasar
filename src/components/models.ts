export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Card {
  id: number;
  name: string;
  number: string;
  expiry: string;
  frozen: boolean;
}
