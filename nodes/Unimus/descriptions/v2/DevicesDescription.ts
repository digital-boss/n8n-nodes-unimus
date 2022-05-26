import {
	INodeProperties,
} from 'n8n-workflow';

export const v2devicesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['devices'],
			},
		},
		options: [
			{
				name: 'Get devices',
				value: 'getDevices',
				description: 'Get a list of devices',
			},
			{
				name: 'Get device by address',
				value: 'getDeviceByAddress',
				description: 'Get an individual device by address',
			},
			{
				name: 'Get device by ID',
				value: 'getDeviceById',
				description: 'Get an individual device by address',
			},
		],
		default: 'getDevices',
		description: 'The operation to perform',
	},
];

export const v2devicesFields: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                       			  devices:getDevices 	                	       */
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
				resource: ['devices'],
				operation: ['getDevices'],
			},
		},
		options: [
			{
				displayName: 'Page Index',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'The page index. Default value : 0.',
			},
			{
				displayName: 'Page Size',
				name: 'size',
				type: 'number',
				default: 0,
				description: 'The page size. Default value : 2147483647.',
			},
			{
				displayName: 'Attributes',
				name: 'attr',
				type: 'string',
				default: '',
				description: 'Comma separated graph attribute nodes. Possible values for device schedule: schedule, sch, s; for device credential: credential, cred, c.',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                         devices:getDeviceByAddress                        */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Address',
		name: 'address',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['devices'],
				operation: ['getDeviceByAddress'],
			},
		},
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
				resource: ['devices'],
				operation: ['getDeviceByAddress'],
			},
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attr',
				type: 'string',
				default: '',
				description: 'Comma separated attribute nodes. Possible values: device schedule - schedule, sch, s; device connections - connections, conn, c',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                     			devices:getDeviceById                         	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'id',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				apiVersion: ['v2'],
				resource: ['devices'],
				operation: ['getDeviceById'],
			},
		},
		default: '',
		description: 'Device address',
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
				resource: ['devices'],
				operation: ['getDeviceById'],
			},
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attr',
				type: 'string',
				default: '',
				description: 'Comma separated graph attribute nodes. Possible values for device schedule: schedule, sch, s; for device credential: credential, cred, c.',
			},
		],
	},

];
