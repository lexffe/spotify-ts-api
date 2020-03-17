import { RequestClient, RequestMethods } from "api/RequestClient";
import { IArtistObject } from "ifaces/IArtistObject";
import { IErrorObject } from "ifaces/IErrorObject";
import { IPagingObject } from "ifaces/IPagingObject";
import { ITrackObject } from "ifaces/ITrackObject";

export class PersonalizationClient {

  private readonly client: RequestClient;

  constructor(ClientInstance: RequestClient) {
    this.client = ClientInstance;
  }

  public async GetTopArtistAndTracks(
    type: "artists" | "tracks",
    limit?: number,
    offset?: number,
    timeRange?: timeRangeType,
  ): Promise<(IPagingObject<IArtistObject> | IPagingObject<ITrackObject>) | IErrorObject> {

    const queryParams = new URLSearchParams();

    if (limit) { queryParams.append("limit", limit.toString()); }
    if (offset) { queryParams.append("offset", offset.toString()); }
    if (timeRange) { queryParams.append("time_range", timeRange); }

    return this.client.Request(RequestMethods.Get, `/me/top/${type}`, queryParams);
  }

}

type timeRangeType = "long_term" | "medium_term" | "short_term";
