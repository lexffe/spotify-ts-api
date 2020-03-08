import { IExternalUrlObject } from "./IExternalObject";
import { IFollowersObject } from "./IFollowersObject";
import { IImageObject } from "./IImageObject";
import { ObjectType } from "./ObjectType";

export interface IPublicUserObject {
  display_name: string | null;
  external_urls: IExternalUrlObject;
  followers: IFollowersObject;
  href: string;
  id: string;
  images: IImageObject[];
  type: ObjectType.User;
  uri: string;
}

export interface IPrivateUserObject extends IPublicUserObject {
  country: string;
  email?: string; // user-read-email scope only
  product?: string; // user-read-private
}

// export interface IPrivateUserObject {
//   country: string;
//   display_name: string | null;
//   email?: string; // user-read-email scope only
//   external_urls: IExternalUrlObject;
//   followers: IFollowersObject;
//   href: string;
//   id: string;
//   images: IImageObject[];
//   product?: string; // user-read-private
//   type: "user" | string;
//   uri: string;
// }
