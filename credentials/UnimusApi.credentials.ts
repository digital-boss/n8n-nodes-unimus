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
			displayName: 'URL',
			name: 'url',
			required: true,
			type: 'string',
			default: '',
		},
		{
			displayName: 'Token',
			name: 'token',
			required: true,
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
