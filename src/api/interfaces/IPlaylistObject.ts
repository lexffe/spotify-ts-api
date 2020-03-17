import { IExternalUrlObject } from "./IExternalObject";
import { IFollowersObject } from "./IFollowersObject";
import { IImageObject } from "./IImageObject";
import { IPagingObject } from "./IPagingObject";
import { ITrackObject } from "./ITrackObject";
import { IPublicUserObject } from "./IUserObject";
import { ObjectType } from "./ObjectType";

interface IPlaylistObjectBase {
  colaborative: boolean;
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  images: IImageObject[];
  name: string;
  owner: IPublicUserObject;
  public: boolean | null;
  snapshot_id: string;
  type: ObjectType.Playlist;
  uri: string;
}

interface IPlaylistTrackObject {
  added_at: string;
  added_by: IPublicUserObject;
  is_local: boolean;
  track: ITrackObject;
}

export interface ISimplifiedPlaylistObject extends IPlaylistObjectBase {
  tracks: {
    href: string[];
    total: number;
  }; // Array[Tracks]
}

export interface IPlaylistObject extends IPlaylistObjectBase {
  description: string;
  followers: IFollowersObject;
  tracks: IPagingObject<IPlaylistTrackObject | null>;
}
