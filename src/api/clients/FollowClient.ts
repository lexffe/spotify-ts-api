import { RequestClient, RequestMethods } from "api/RequestClient";
import { IArtistObject } from "ifaces/IArtistObject";
import { ICursorPagingObject } from "ifaces/ICursorObject";
import { IErrorObject } from "ifaces/IErrorObject";

export class FollowClient {

  private readonly client: RequestClient;

  constructor(ClientInstance: RequestClient) {
    this.client = ClientInstance;
  }

  /**
   * Check to see if the current user is following one or more artists or other Spotify users.
   * @param type The object type that the Id represents. Can only be either "artist" or "user"
   * @param ids A list of Spotify IDs. Max 50.
   */
  public async IsFollowingPerson(type: "artist" | "user", ids: string[]): Promise<boolean[] | IErrorObject> {

    return this.client.Request(RequestMethods.Get, `/me/following/contains`, new URLSearchParams({
      ids: ids.join(","),
      type,
    }));

  }

  /**
   * Check to see if one or more Spotify users are following a specified playlist.
   * @param playlistId ID for the playlist.
   * @param ids the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.
   */
  public async IsFollowingPlaylist(playlistId: string, ids: string[]): Promise<boolean[] | IErrorObject> {

    return this.client.Request(RequestMethods.Get, `/playlists/${playlistId}/followers/contains`, new URLSearchParams({
      ids: ids.join(","),
    }));

  }

  public async FollowPerson(type: "artist" | "user", ids: string[]): Promise<void | IErrorObject> {

    return this.client.Request(RequestMethods.Put, `/me/following`, new URLSearchParams({ type }), { ids });

  }

  /**
   * Add the current user as a follower of a playlist.
   * @param playlistId The Spotify ID of the playlist.
   * Any playlist can be followed, regardless of its public/private status, as long as you know its playlist ID.
   * @param includePublic If true the playlist will be included in user’s public playlists,
   * if false it will remain private. Defaults to true.
   *
   * (To be able to follow playlists privately, the user must have granted the `playlist-modify-private` scope.)
   */
  public async FollowPlaylist(playlistId: string, includePublic?: boolean): Promise<void | IErrorObject> {
    return this.client.Request(RequestMethods.Put, `/playlist/${playlistId}/followers`, new URLSearchParams(), {
      public: includePublic,
    });
  }

  public async GetFollowedArtists(
    type: string,
    limit?: number,
    after?: number,
  ): Promise< { artists: ICursorPagingObject<IArtistObject> } | IErrorObject > {

    const queryParams = new URLSearchParams({
      type,
    });

    if (limit) { queryParams.append("limit", limit.toString()); }
    if (after) { queryParams.append("after", after.toString()); }

    return this.client.Request(RequestMethods.Get, `/me/following`, queryParams);

  }

  public async UnfollowPerson(type: "artist" | "user", ids: string[]): Promise<void | IErrorObject> {

    return this.client.Request(RequestMethods.Delete, `/me/following`, new URLSearchParams({ type }), { ids });

  }

  public async UnfollowPlaylist(playlistId: string): Promise<void | IErrorObject> {
    return this.client.Request(RequestMethods.Delete, `/playlists/${playlistId}/followers`, new URLSearchParams());
  }

}
