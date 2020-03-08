import { ISimplifiedArtistObject } from "./IArtistObject";
import { ICopyrightObject } from "./ICopyrightObject";
import { IExternalIdObject, IExternalUrlObject } from "./IExternalObject";
import { IImageObject } from "./IImageObject";
import { IPagingObject } from "./IPagingObject";
import { ISimplifiedTrackObject } from "./ITrackObject";
import { ObjectType } from "./ObjectType";

// TODO: href string -> node.js URL?

export interface IAlbumObject {
  album_type: AlbumType;
  artists: ISimplifiedArtistObject[]; // old api doc says simplified, but new api doc says full
  available_markets: string; // ISO 3166-1 alpha-2
  copyrights: ICopyrightObject[];
  external_ids: IExternalIdObject;
  external_urls: IExternalUrlObject;
  genres: string[];
  href: string;
  id: string;
  images: IImageObject[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: ReleaseDatePrecision | string;
  // old api says it's a restriction object, new api says an array of restrictions object
  restrictions?: { "reason": "market" } | any[] | any; // Array[TrackRestrictionObject]
  // tracks: ISimplifiedTrackObject[]; // new api says array of simplified track obj, did not say it's paginated.
  // tracks: IPaginatedSimplifiedTracksObject;
  tracks: IPagingObject<ISimplifiedTrackObject>;
  type: ObjectType.Album; // ...?
  uri: string;
}

export interface ISimplifiedAlbumObject {
  album_group: AlbumGroup;
  album_type: AlbumType;
  artists: ISimplifiedArtistObject[];
  available_markets: string[];
  external_urls: IExternalUrlObject;
  href: string;
  id: string;
  images: IImageObject[];
  name: string;
  type: ObjectType.Album;
  uri: string;
}

export interface ISavedAlbumObject {
  added_at: string; // iso 8601
  album: IAlbumObject;
}

enum AlbumType {
  Album = "album",
  Single = "single",
  Compilation = "compilation",
}

enum ReleaseDatePrecision {
  Year = "year",
  Month = "month",
  Day = "day",
}

enum AlbumGroup {
  Album = "album",
  Single = "single",
  Compilation = "compilation",
  AppearsOn = "appears_on",
}
