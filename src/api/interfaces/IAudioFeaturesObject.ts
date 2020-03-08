import { ObjectType } from "./ObjectType";

export default interface IAudioFeaturesObject {
  acousticness: number; // float
  analysis_url: string; // URL
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string; // url
  type: ObjectType.AudioFeatures;
  uri: string;
  valence: number;
}
