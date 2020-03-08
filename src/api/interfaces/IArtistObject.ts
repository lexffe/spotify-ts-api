import { IExternalUrlObject } from "./IExternalObject";
import { IFollowersObject } from "./IFollowersObject";
import { IImageObject } from "./IImageObject";
import { ObjectType } from "./ObjectType";

export interface IArtistObject extends ISimplifiedArtistObject {
  followers: IFollowersObject;
  genres: string[];
  images: IImageObject[];
  popularity: number;
}

export interface ISimplifiedArtistObject {
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  name: string;
  type: ObjectType.Artist; // TODO: refactor into an enum
  uri: string;
}
