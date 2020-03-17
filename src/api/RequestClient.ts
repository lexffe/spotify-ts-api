import got from "got";
import * as http from "http";
import { IErrorObject } from "ifaces/IErrorObject";
import { URLSearchParams } from "url";

const API_ENDPOINT = "https://api.spotify.com/v1";

// Overcomplicating?
export enum RequestMethods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}

/**
 * RequestClient creates a universal http client for all the subclients.
 */
export class RequestClient {

  private API_ENDPOINT: string;
  private apiToken: string;
  private connPool: http.Agent;

  /**
   * 
   * @param apiToken A Bearer token you have requested from the user through Spotify account service beforehand.
   * @param customAPIEndpoint A custom Spotify API endpoint. Quite useless though.
   */
  constructor(apiToken: string, customAPIEndpoint?: string) {
    this.apiToken = apiToken;
    this.API_ENDPOINT = customAPIEndpoint ? customAPIEndpoint : API_ENDPOINT;
    this.connPool = new http.Agent({
      keepAlive: true,
    });
  }

  /**
   * Request is a convenient generic wrapper around
   * http.request that automatically appends the Bearer token to the header.
   *
   * It is recommended not to access this method directly.
   *
   * All API calls either return the designated Object, or it returns an error object, as defined by
   * @param method Any of the HTTP methods used by Spotify. (defined with RequestMethods)
   * @param path
   * @param queryParams Parameters for the query. Usually optional in api, "required" for this lib.
   * @param data Any custom data to be sent.
   */
  public async Request<T>(
    method: RequestMethods,
    path: string,
    queryParams: URLSearchParams,
    data?: any,
  ): Promise<T | IErrorObject> {
    // Note: is http.request good enough? or should i use external libraries?

    // > build URL
    // Note: all custom query parameters are built custom in their respective functions.
    // this generic function does not deal with queries but only pass them into the url.

    // node.js 10: URL is global.
    const url = new URL(this.API_ENDPOINT);
    url.pathname += path;
    url.search = queryParams.toString();

    // > build http requests
    // http methods, data to send, etc.

    // const reqOptions: http.RequestOptions = {
    //   agent: this.connPool,
    //   headers: {
    //     "Authorization": `Bearer ${this.apiToken}`,
    //     "Content-Type": (method === RequestMethods.Put || method === RequestMethods.Post) ?
    //       "application/json" : undefined,
    //   },
    //   method,
    // };

    try {

      const response = await got<T | IErrorObject>(url.toString(), {
        agent: this.connPool,
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
        json: data ? data : null,
        method,
        responseType: "json",
      });

      return response.body;

    } catch (err) {
      throw err;
    }

  }

}
