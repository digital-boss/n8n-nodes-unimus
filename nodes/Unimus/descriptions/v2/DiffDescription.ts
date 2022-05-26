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
				description: 'Get a list of devices that has different backups in specified time range',
			},
			{
				name: 'Get diff',
				value: 'getDiff',
				description: 'Get a difference between original and revised backup. Endpoint support making difference between backups from different devices.',
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
				displayName: 'Page Index',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'The page index',
			},
			{
				displayName: 'Page Size',
				name: 'size',
				type: 'number',
				default: 0,
				description: 'The page size. Default: 2147483647.',
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
		],
	},

	/*-------------------------------------------------------------------------- */
	/*              		 							diff:getDiff					                     */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Original ID',
		name: 'idOrig',
		required: true,
		type: 'number',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['diff'],
				operation: ['getDiff'],
			},
		},
		default: '',
		description: 'ID of the backup that will be considered as original',
	},
	{
		displayName: 'Revised ID',
		name: 'revId',
		required: true,
		type: 'number',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['diff'],
				operation: ['getDiff'],
			},
		},
		default: '',
		description: 'ID of the backup that will be considered as revised',
	},

];
