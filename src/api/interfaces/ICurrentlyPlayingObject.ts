import { IContextObject } from "./IContextObject";
import { ITrackObject } from "./ITrackObject";

export interface ICurrentlyPlayingObject {
  context: IContextObject | null; // nullable
  currently_playing_type: CurrentlyPlayingType;
  is_playing: boolean;
  item: ITrackObject | null;
  progress_ms: number | null;
  timestamp: number;
}

enum CurrentlyPlayingType {
  Track = "track",
  Episode = "episode",
  Ad = "ad",
  Unknown = "unknowmn",
}
