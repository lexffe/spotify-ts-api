import { ISimplifiedAlbumObject } from "./IAlbumObject";
import { IArtistObject, ISimplifiedArtistObject } from "./IArtistObject";
import { IExternalIdObject, IExternalUrlObject } from "./IExternalObject";
import { ObjectType } from "./ObjectType";

export interface ITrackObject {
  album: ISimplifiedAlbumObject;
  artists: IArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: IExternalIdObject;
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean;
  // New API doc says linked_from is a TrackObject but Track Relinking Guide says otherwise.
  // Old API doc has "track link"
  linked_from?: ILinkedTrackObject;
  name: string;
  popularity: number;
  preview_url: string | null;
  restrictions?: { "reason": "market" } | any[]; // Array[TrackRestrictionObject]
  track_number: number;
  type: ObjectType.Track;
  uri: string;
}

export interface ISimplifiedTrackObject {
  artists: ISimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean;
  /**
   * From API doc:
   * Part of the response when Track Relinking is applied and
   * is only part of the response if the track linking, in fact, exists.
   */
  linked_from?: ILinkedTrackObject;
}

interface ILinkedTrackObject {
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  type: ObjectType.Track;
  uri: string;
}

export interface ISavedTrackObject {
  added_at: string;
  track: ITrackObject;
}
