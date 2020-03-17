import { ISimplifiedAlbumObject } from "ifaces/IAlbumObject";
import { IArtistObject } from "ifaces/IArtistObject";
import { IErrorObject } from "ifaces/IErrorObject";
import { IPagingObject } from "ifaces/IPagingObject";
import { ITrackObject } from "ifaces/ITrackObject";
import { RequestClient, RequestMethods } from "../RequestClient";

const basePath = "/artists";

// self.NOTE: Consolidated.

/**
 * ArtistsClient interacts with the endpoints for retrieving information
 * about one or more artists from the Spotify catalog.
 * See [here](https://developer.spotify.com/documentation/web-api/reference/artists/) for more information.
 */
export class ArtistsClient {

  private readonly client: RequestClient;

  /**
   * @param ClientInstance An initiated client for all http requests.
   */
  constructor(ClientInstance: RequestClient) {
    this.client = ClientInstance;
  }

  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param id The Spotify ID for the artist.
   */
  public async GetArtist(id: string): Promise<IArtistObject | IErrorObject> {
    return this.client.Request(RequestMethods.Get, `${basePath}/${id}`, new URLSearchParams());
  }

  // How about variadic parameters?
  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   * @param ids A list of the Spotify IDs for the artists. Max 50 IDs.
   */
  public async GetArtists(ids: string[]): Promise<{ artists: Array<IArtistObject | null> } | IErrorObject> {

    return this.client.Request(
      RequestMethods.Get,
      basePath,
      new URLSearchParams({ ids: ids.join(",") }),
    );

  }

  /**
   * Get Spotify catalog information about an artist’s albums.
   * Optional parameters can be specified in the query string to filter and sort the response.
   * @param id The Spotify ID for the artist.
   * @param includeGroups A list of keywords that will be used to filter the response.
   * If not supplied, all album types will be returned. Valid values are:
   * - `album`
   * - `single`
   * - `appears_on`
   * - `compilation`
   * @param country ISO 3166-1 alpha-2 code / "from_token"
   * @param limit The number of album objects to return. Default: 20. Min: 1. Max: 50.
   * @param offset The index of the first album to return. Default: 0 (i.e., the first album).
   * Use with limit to get the next set of albums.
   */
  public async GetArtistAlbums(
    id: string,
    includeGroups?: IncludeGroupsKw[],
    country?: string,
    limit?: number,
    offset?: number,
  ): Promise<IPagingObject<ISimplifiedAlbumObject> | IErrorObject> {

    const queryParams = new URLSearchParams();

    if (includeGroups) { queryParams.append("include_groups", includeGroups.join(",")); }
    if (country) { queryParams.append("country", country); }
    if (limit) { queryParams.append("limit", limit.toString()); }
    if (offset) { queryParams.append("offset", offset.toString()); }

    return this.client.Request(
      RequestMethods.Get, `${basePath}/${id}/albums`, queryParams,
    );

  }

  public async GetTopTracks(id: string, country?: string): Promise< { tracks: ITrackObject[] } | IErrorObject> {

    return this.client.Request(
      RequestMethods.Get,
      `${basePath}/${id}/top-tracks`,
      country ? new URLSearchParams({country}) : new URLSearchParams(),
    );

  }

  public async GetRelatedArtists(id: string): Promise< { artists: IArtistObject[] } | IErrorObject> {
    return this.client.Request(
      RequestMethods.Get,
      `${basePath}/${id}/related-artists`,
      new URLSearchParams(),
    );
  }

}

export enum IncludeGroupsKw {
  Album = "album",
  Single = "single",
  AppearsOn = "appears_on",
  Compilation = "compilation",
}
