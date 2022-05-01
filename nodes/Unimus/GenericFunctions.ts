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
  if (credentials != undefined && credentials.unimusApiKey) {
    options.headers!["Authorization"] = "Bearer " + credentials.mollieApiKey;
  }
  return await this.helpers.request!(options);
}
