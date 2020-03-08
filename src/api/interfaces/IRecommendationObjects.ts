import { ISimplifiedTrackObject } from "./ITrackObject";

export interface IRecommendationSeedObject {
  afterFilteringSize: number; // optional?
  afterRelinkingSize: number;
  href: string | null;
  id: string;
  initialPoolSize: number;
  type: RecommendationSeedType;
}

enum RecommendationSeedType {
  Artist = "artist",
  Track = "track",
  Genre = "genre",
}

export interface IRecommendationsResponseObject {
  seeds: IRecommendationSeedObject[];
  tracks: ISimplifiedTrackObject[];
}
