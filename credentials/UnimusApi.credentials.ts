import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UnimusApi implements ICredentialType {
	displayName = 'Unimus API';
	name = 'unimusApi';
	documentationUrl = 'unimus';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseURL',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
