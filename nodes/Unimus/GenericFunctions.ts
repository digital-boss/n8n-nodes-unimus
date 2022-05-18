import { OptionsWithUri } from 'request';

import {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions, NodeApiError,
	NodeOperationError
} from 'n8n-workflow';

export async function unimusApiRequest(
	this:
		| IHookFunctions
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| ILoadOptionsFunctions,
		method: string,
		endpoint: string,
		body: IDataObject = {},
		qs: IDataObject = {},
		uri?: string,
// tslint:disable-next-line:no-any
): Promise<any> {

	const credentials = await this.getCredentials('unimusApi');

	if (credentials === undefined) {
		throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
	}

	const options: OptionsWithUri = {
		method,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + credentials.unimusApiKey,
		},
		qs,
		body,
		uri: uri || credentials.baseURL + endpoint,
		json: true,
	};

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
