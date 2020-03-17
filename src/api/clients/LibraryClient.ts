import { RequestClient, RequestMethods } from "api/RequestClient";
import { ISavedAlbumObject } from "ifaces/IAlbumObject";
import { IErrorObject } from "ifaces/IErrorObject";
import { IPagingObject } from "ifaces/IPagingObject";
import { ISavedTrackObject } from "ifaces/ITrackObject";

export class LibraryClient {

  private readonly client: RequestClient;

  constructor(ClientInstance: RequestClient) {
    this.client = ClientInstance;
  }

  // Note; a lot of the functions here can be consolidated,
  // by adding an extra parameter to specify which object type the function is acting on, e.g. albums|tracks

  /**
   * Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
   * @param ids list of Spotify IDs
   */
  public async CheckSavedAlbums(ids: string[]): Promise<boolean[] | IErrorObject> {

    return this.client.Request(RequestMethods.Get, `/me/albums/contains/`, new URLSearchParams({
      ids: ids.join(","),
    }));

  }

  /**
   * Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
   * @param ids
   */
  public async CheckSavedTracks(ids: string[]): Promise<boolean[] | IErrorObject> {

    return this.client.Request(RequestMethods.Get, `/me/track/contains`, new URLSearchParams({
      ids: ids.join(","),
    }));

  }

  public async GetSavedAlbums(
    limit?: number,
    offset?: number,
    market?: string,
  ): Promise<IPagingObject<ISavedAlbumObject> | IErrorObject> {

    const queryParams = new URLSearchParams();

    if (limit) { queryParams.append("limit", limit.toString()); }
    if (offset) { queryParams.append("offset", offset.toString()); }
    if (market) { queryParams.append("market", market); }

    return this.client.Request(RequestMethods.Get, `/me/albums`, queryParams);

  }

  public async GetSavedTracks(
    limit?: number,
    offset?: number,
    market?: string,
  ): Promise<IPagingObject<ISavedTrackObject> | IErrorObject> {

    const queryParams = new URLSearchParams();

    if (limit) { queryParams.append("limit", limit.toString()); }
    if (offset) { queryParams.append("offset", offset.toString()); }
    if (market) { queryParams.append("market", market); }

    return this.client.Request(RequestMethods.Get, `/me/tracks`, queryParams);

  }

  public async DeleteSavedAlbum(ids: string[]): Promise<void | IErrorObject> {
    return this.client.Request(RequestMethods.Delete, `/me/albums`, new URLSearchParams({ ids: ids.join(",") }));
  }

  public async DeleteSavedTracks(ids: string[]): Promise<void | IErrorObject> {
    return this.client.Request(RequestMethods.Delete, `/me/tracks`, new URLSearchParams({ ids: ids.join(",") }));
  }

  public async SaveAlbums(ids: string[]): Promise<void | IErrorObject> {
    return this.client.Request(RequestMethods.Put, `/me/albums`, new URLSearchParams({ ids: ids.join(",") }));
  }

  public async SaveTracks(ids: string[]): Promise<void | IErrorObject> {
    return this.client.Request(RequestMethods.Put, `/me/tracks`, new URLSearchParams({ ids: ids.join(",") }));
  }

}
