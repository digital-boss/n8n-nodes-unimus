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
    headers: {
      "Content-Type": "application/json",
    },
    body,
    method :'GET',
    uri: uri,
  };
  const credentials = await this.getCredentials("unimusApi");
  if (credentials != undefined && credentials.unimusApiKey && credentials.baseURL) {
    options.headers!["Authorization"] = "Bearer " + credentials.mollieApiKey;
    let baseURL = credentials.baseURL;
    uri = baseURL + uri
  }
  console.log(uri);
 
  return await this.helpers.request!(options);
}
