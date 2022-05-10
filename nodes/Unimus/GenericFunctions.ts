import {
  IExecuteFunctions,
  IExecuteSingleFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
} from "n8n-core";

import { OptionsWithUri } from "request";

export async function unimusApiRequest(
  this:
    | IHookFunctions
    | IExecuteFunctions
    | IExecuteSingleFunctions
    | ILoadOptionsFunctions,
    body: any = {},
    uri: string,
): Promise<any> {
  const options: OptionsWithUri = {
    headers: {},
    body,
    method : "GET",
    uri: uri,
  };
  const credentials = await this.getCredentials("unimusApi");
  if (credentials != undefined && credentials.unimusApiKey && credentials.baseURL) {
    options.headers!["Authorization"] = "Bearer " + credentials.unimusApiKey;
   let baseURL = credentials.baseURL;
   options.uri = baseURL +uri
  }
 
  return await this.helpers.request!(options);
}
