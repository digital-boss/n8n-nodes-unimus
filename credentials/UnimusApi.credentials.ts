import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UnimusApi implements ICredentialType {
	name = 'unimusApi';
	displayName = 'UNIMUS API';
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
			name: 'unimusApiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}