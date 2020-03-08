import { IExternalUrlObject } from "./IExternalObject";
import { IImageObject } from "./IImageObject";
import { IPublicUserObject } from "./IUserObject";
import { ObjectType } from "./ObjectType";

export interface IPlaylistObject {
  colaborative: boolean;
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  images: IImageObject[];
  name: string;
  owner: IPublicUserObject;
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string[];
    total: number;
  }; // Array[Tracks]
  type: ObjectType.Playlist;
  uri: string;
}
