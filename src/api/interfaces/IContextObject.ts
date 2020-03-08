import { IExternalUrlObject } from "./IExternalObject";
import { ObjectType } from "./ObjectType";

export interface IContextObject {
  external_urls: IExternalUrlObject;
  href: string;
  /**
   * Note: the type here will not be "playlist".
   */
  type: ObjectType;
  uri: string;
}
