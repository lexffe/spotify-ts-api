import { RequestClient, RequestMethods } from "api/RequestClient";
import { IAlbumObject } from "ifaces/IAlbumObject";
import { IErrorObject } from "ifaces/IErrorObject";
import { IPagingObject } from "ifaces/IPagingObject";
import { ISimplifiedTrackObject } from "ifaces/ITrackObject";

const basePath = "/albums";

// self.NOTE: Consolidated.

/**
 * AlbumsClient interacts with the endpoints for retrieving information
 * about one or more albums from the Spotify catalog.
 * See [here](https://developer.spotify.com/documentation/web-api/reference/albums/) for more information.
 */
export class AlbumsClient {

  private readonly client: RequestClient;

  /**
   * @param ClientInstance An initiated client for all http requests.
   */
  constructor(ClientInstance: RequestClient) {
    this.client = ClientInstance;
  }

  /**
   * GetAlbum gets Spotify catalog information for a single album.
   * @param id The Spotify ID for the album
   * @param market ISO 3166-1 alpha-2 code / "from_token"
   */
  public async GetAlbum(id: string, market?: string): Promise<IAlbumObject | IErrorObject> {

    // iteration 1: normal if statement
    // const queryParams = new URLSearchParams();
    // if (market) { queryParams.append("market", market); }

    // iteration 2: ternary operator
    // if market exists, initiate URLSearchParams with market, otherwise initiate empty URLSearchParams
    // const queryParams = market ? new URLSearchParams({ market }) : new URLSearchParams();

    // return this.client.Request(RequestMethods.Get, `${basePath}/${id}`, queryParams);

    // iteration 3: ternary operator in function call
    return this.client.Request(
      RequestMethods.Get,
      `${basePath}/${id}`,
      market ? new URLSearchParams({ market }) : new URLSearchParams(),
    );

  }

  /**
   * GetAlbums gets Spotify catalog information for multiple albums identified by their Spotify IDs.
   * @param ids A list of Spotify IDs for the albums. Maximum 20 IDs. (Checked in server-side)
   * @param market ISO 3166-1 alpha-2 code / "from_token"
   */
  public async GetAlbums(
    ids: string[],
    market?: string,
  ): Promise<{ albums: Array<IAlbumObject | null> } | IErrorObject> {
    // ids are passed into function as string.
    // comma-separated when passed into s-api.

    const queryParams = new URLSearchParams({ ids: ids.join(",") }); // initiate the param object with ids

    if (market) { queryParams.append("market", market); }

    /*
    Cursed, imo
    From s-api:
      On success, ... and the response body contains an object whose key is "albums" and
      whose value is an array of album objects in JSON format.
      Objects are returned in the order requested.
      If an object is not found, a null value is returned in the appropriate position.
      Duplicate ids in the query will result in duplicate objects in the response.
    */
    return this.client.Request(
      RequestMethods.Get,
      basePath,
      queryParams,
    );

  }

  /**
   * GetAlbumTracks get Spotify catalog information about an album’s tracks.
   * @param id The Spotify ID for the album
   * @param limit The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first track to return.
   * Default: 0 (the first object). Use with limit to get the next set of tracks.
   * @param market ISO 3166-1 alpha-2 code / "from_token"
   */
  public async GetAlbumTracks(
    id: string,
    limit?: number,
    offset?: number,
    market?: string,
  ): Promise<IPagingObject<ISimplifiedTrackObject> | IErrorObject> {

    const queryParams = new URLSearchParams();

    // Should I check if the limit is out of range ( 1 <= track <= 50 ) here? Or should I leave this to the Spotify API?

    if (limit) { queryParams.append("limit", limit.toString()); }
    if (offset) { queryParams.append("offset", offset.toString()); }
    if (market) { queryParams.append("market", market); }

    return this.client.Request(
      RequestMethods.Get,
      `${basePath}/${id}/tracks`,
      queryParams,
    );

  }

}
