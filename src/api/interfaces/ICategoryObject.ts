import { IImageObject } from "./IImageObject";

export default interface ICategoryObject {
  href: string;
  icons: IImageObject[];
  id: string;
  name: string;
}
