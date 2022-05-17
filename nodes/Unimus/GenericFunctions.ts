import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import { OptionsWithUri } from 'request';

import { IDataObject } from 'n8n-workflow';

export async function unimusApiRequest(
	this:
		| IHookFunctions
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| ILoadOptionsFunctions,
		body: IDataObject = {},
		uri: string,
	// tslint:disable-next-line:no-any
): Promise<any> {
	const options: OptionsWithUri = {
		headers: {},
		body,
		method : 'GET',
		uri,
	};
	const credentials = await this.getCredentials('unimusApi');
	if (credentials !== undefined && credentials.unimusApiKey && credentials.baseURL) {
		options.headers!['Authorization'] = 'Bearer ' + credentials.unimusApiKey;
		const baseURL = credentials.baseURL;
		options.uri = baseURL +uri;
	}

	return await this.helpers.request!(options);
}
