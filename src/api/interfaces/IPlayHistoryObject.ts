import { IContextObject } from "./IContextObject";
import { ISimplifiedTrackObject } from "./ITrackObject";

export interface IPlayHistoryObject {
  context: IContextObject;
  played_at: string; // api doc says "Timestamp". I assume it's ISO 8601
  track: ISimplifiedTrackObject;
}
