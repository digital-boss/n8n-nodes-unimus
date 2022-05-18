import { INodeProperties } from 'n8n-workflow';

export const resources: INodeProperties[] = [

	// ----------------------------------
	//        V2 Resource
	// ----------------------------------
	{
		displayName: 'Resource',
		name: 'resource',
		required: true,
		type: 'options',
		default: 'diff',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
			},
		},
		options: [
			{
				name: 'Diff',
				value: 'diff',
			},
			{
				name: 'Devices',
				value: 'devices',
			},
		],
	},

	// ----------------------------------
	//        V3 Resource
	// ----------------------------------
	{
		displayName: 'Resource',
		name: 'resource',
		required: true,
		type: 'options',
		default: 'devices',
		displayOptions: {
			show: {
				apiVersion: ['v3'],
			},
		},
		options: [
			{
				name: 'Devices',
				value: 'devices',
			},
			{
				name: 'Backups',
				value: 'backups',
			},
		],
	},

];
