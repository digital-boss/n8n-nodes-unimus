import {
	INodeProperties,
} from 'n8n-workflow';

export const v2backupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['backups'],
			},
		},
		options: [
			{
				name: 'Get device backups',
				value: 'getDeviceBackups',
				description: 'Get a list of all device backups',
			},
		],
		default: 'getDeviceBackups',
		description: 'The operation to perform',
	},
];

export const v2backupsFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                          backups:getDeviceBackups                         */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Device ID',
		name: 'deviceId',
		type: 'number',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['backups'],
				operation: ['getDeviceBackups'],
			},
		},
		default: '',
		description: 'The ID of the device',
	},
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Parameter',
		default: {},
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['backups'],
				operation: ['getDeviceBackups'],
			},
		},
		options: [
			{
				displayName: 'Page Index',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'The page index. Default: 0.',
			},
			{
				displayName: 'Page Size',
				name: 'size',
				type: 'number',
				default: 0,
				description: 'The page size. Default: 2147483647.',
			},
		],
	},

];
