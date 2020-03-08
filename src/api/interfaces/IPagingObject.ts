// I am thankful that generics exist.
// Very similar to CursorObject. Could merge?
export interface IPagingObject<T> {
  href: string;
  // items: any[];
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
