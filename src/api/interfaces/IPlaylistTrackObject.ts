import { ITrackObject } from "./ITrackObject";
import { IPublicUserObject } from "./IUserObject";

export interface IPlaylistTrackObject {
  added_at: string;
  added_by: IPublicUserObject;
  is_local: boolean;
  track: ITrackObject;
}
