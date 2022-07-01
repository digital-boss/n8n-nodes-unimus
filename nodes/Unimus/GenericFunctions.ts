import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	IDataObject,
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

	const credentials = await this.getCredentials('unimusApi') as IDataObject;

	if (credentials === undefined) {
		throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
	}

	const options: OptionsWithUri = {
		method,
		headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer ${credentials.token}`,
		},
		qs,
		body,
		uri: uri || `${credentials.url}${endpoint}`,
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

export function simplify(jsonData: IDataObject, propertyName = 'data'): IDataObject {
	return jsonData[propertyName] as IDataObject || jsonData;
}
