import {
	INodeProperties,
} from 'n8n-workflow';

export const v3backupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				apiVersion: ['v3'],
				resource: ['backups'],
			},
		},
		options: [
			{
				name: 'Get device backups',
				value: 'getDeviceBackups',
				description: 'Get a list of all device backups.',
			},
			{
				name: 'Get diff',
				value: 'getDiff',
				description: 'Compute and return a diff beetween two backups',
			},
		],
		default: 'getDeviceBackups',
		description: 'The operation to perform.',
	},
];

export const v3backupsFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                          backups:getDeviceBackups                         */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Parameter',
		default: {},
		displayOptions: {
			show: {
				apiVersion: ['v3'],
				resource: ['backups'],
				operation: ['getDeviceBackups'],
			},
		},
		options: [
			{
				displayName: 'Device UUIDs',
				name: 'deviceUuids',
				placeholder: 'Add Device UUID',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: 'Filter backups by devices',
				options: [
					{
						displayName: 'Device UUID',
						name: 'deviceUuidsValues',
						values: [
							{
								displayName: 'Device UUID',
								name: 'deviceUuid',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Valid Since',
				name: 'validSince',
				type: 'number',
				default: '',
				description: 'Filter backups by valid since timestamp',
			},
			{
				displayName: 'Valid Until',
				name: 'validUntil',
				type: 'number',
				default: '',
				description: 'Filter backups by valid until timestamp',
			},
			{
				displayName: 'Types',
				name: 'types',
				type: 'multiOptions',
				default: [],
				description: 'Filter backups by types',
				options: [
					{
						name: 'Binary',
						value: 'BINARY',
					},
					{
						name: 'Text',
						value: 'TEXT',
					},
				],
			},
			{
				displayName: 'Latest',
				name: 'latest',
				type: 'boolean',
				default: true,
				description: '',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: '',
				description: 'The page index. Default: 0.',
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				default: '',
				description: 'The page size. Default: 2147483647.',
			},
		],
	},
	/*-------------------------------------------------------------------------- */
	/*                          		backups:getDiff                         		 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Original Backup UUID',
		name: 'originalBackupUuid',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				apiVersion: ['v3'],
				resource: ['backups'],
				operation: ['getDiff'],
			},
		},
	},
	{
		displayName: 'Reversed Backup UUID',
		name: 'revisedBackupUuid',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				apiVersion: ['v3'],
				resource: ['backups'],
				operation: ['getDiff'],
			},
		},
	},

];
