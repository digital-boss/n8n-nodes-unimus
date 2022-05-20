import {
	INodeProperties,
} from 'n8n-workflow';

export const v3devicesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				apiVersion: ['v3'],
				resource: ['devices'],
			},
		},
		options: [
			{
				name: 'Get devices',
				value: 'getDevices',
				description: 'Get a list of devices.',
			},
			{
				name: 'Get device by ID',
				value: 'getDeviceByID',
				description: 'Get an individual device by ID.',
			},
		],
		default: 'getDevices',
		description: 'The operation to perform.',
	},
];

export const v3devicesFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                         			devices:getDevices                         	 */
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
				resource: ['devices'],
				operation: ['getDevices'],
			},
		},
		options: [
			{
				displayName: 'Addresses',
				name: 'addresses',
				placeholder: 'Add address',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						name: 'addressesValues',
						displayName: 'Address',
						values: [
							{
								displayName: 'Address',
								name: 'address',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Descriptions',
				name: 'descriptions',
				placeholder: 'Add description',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						name: 'descriptionValues',
						displayName: 'Description',
						values: [
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Vendors',
				name: 'vendors',
				placeholder: 'Add vendors',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						name: 'vendorsValues',
						displayName: 'Vendor',
						values: [
							{
								displayName: 'Vendor',
								name: 'vendor',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Types',
				name: 'types',
				placeholder: 'Add type',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						name: 'typesValues',
						displayName: 'Type',
						values: [
							{
								displayName: 'Type',
								name: 'type',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Models',
				name: 'models',
				placeholder: 'Add model',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						name: 'modelsValues',
						displayName: 'Type',
						values: [
							{
								displayName: 'Model',
								name: 'model',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Zone UUIDs',
				name: 'zoneUuids',
				placeholder: 'Add Zone UUID',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						displayName: 'Zone UUID',
						name: 'zoneUuidsValues',
						values: [
							{
								displayName: 'Zone UUID',
								name: 'zoneUuid',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Schedule UUIDs',
				name: 'scheduleUuids',
				placeholder: 'Add Schedule UUID',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: '',
				description: '',
				options: [
					{
						displayName: 'Schedule UUID',
						name: 'scheduleUuidsValues',
						values: [
							{
								displayName: 'Schedule UUID',
								name: 'scheduleUuid',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'number',
				default: 0,
				description: 'Start of time range in seconds (DEFAULT = 0)',
			},
			{
				displayName: 'Until',
				name: 'until',
				type: 'number',
				default: 0,
				description: 'End of time range in seconds (DEFAULT = time of the request)',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'The page index. Default value : 0.',
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				default: 0,
				description: 'The page size. Default value : 2147483647.',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                         			devices:getDeviceByID                        */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'UUID',
		name: 'uuid',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				apiVersion: ['v3'],
				resource: ['devices'],
				operation: ['getDeviceByID'],
			},
		},
	},

];
