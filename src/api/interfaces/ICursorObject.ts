export interface ICursorPagingObject<T> {
  cursors: ICursorObject;
  href: string;
  items: T[]; // pagination... could be implemented better (?)
  limit: number;
  next: string | null; // nullable
  total: number;
}

export interface ICursorObject {
  after: string;
}
