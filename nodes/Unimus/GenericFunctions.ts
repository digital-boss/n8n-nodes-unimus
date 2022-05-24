import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	NodeApiError,
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
			'Authorization': `Bearer ${credentials.apiKey}`,
		},
		qs,
		body,
		uri: uri || credentials.baseURL + endpoint,
		json: true,
		rejectUnauthorized: !this.getNodeParameter('allowUnauthorizedCerts', 0, false) as boolean,
	};

	if (Object.keys(options.qs).length === 0) {
		delete options.qs;
	}
	if (Object.keys(options.body).length === 0) {
		delete options.body;
	}

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
