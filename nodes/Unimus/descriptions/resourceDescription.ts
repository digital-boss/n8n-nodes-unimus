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
		default: 'devices',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
			},
		},
		options: [
			{
				name: 'Backups',
				value: 'backups',
			},
			{
				name: 'Devices',
				value: 'devices',
			},
			{
				name: 'Diff',
				value: 'diff',
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
				name: 'Backups',
				value: 'backups',
			},
			{
				name: 'Devices',
				value: 'devices',
			},
		],
	},

];
