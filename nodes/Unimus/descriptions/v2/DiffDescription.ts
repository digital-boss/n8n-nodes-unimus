import {
	INodeProperties,
} from 'n8n-workflow';

export const v2diffOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['diff'],
			},
		},
		options: [
			{
				name: 'Get devices with different backups',
				value: 'getDevicesWithDifferentBackups',
				description:
					'Get a list of devices that has different backups in specified time range.',
			},
		],
		default: 'getDevicesWithDifferentBackups',
		description: 'The operation to perform',
	},
];

export const v2diffFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*              		 diff:getDevicesWithDifferentBackups                     */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Parameter',
		default: {},
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['diff'],
				operation: ['getDevicesWithDifferentBackups'],
			},
		},
		options: [
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: '',
				description: 'The page index',
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				default: '',
				description: 'The page size. Default: 2147483647.',
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'number',
				default: '',
				description: 'Start of time range in seconds (DEFAULT = 0)',
			},
			{
				displayName: 'Until',
				name: 'until',
				type: 'number',
				default: '',
				description: 'End of time range in seconds (DEFAULT = time of the request)',
			},
		],
	},

];
