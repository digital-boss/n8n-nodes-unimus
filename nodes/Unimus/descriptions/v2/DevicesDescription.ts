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
				name: 'Get device by address',
				value: 'getDeviceByAddress',
				description: 'Get an individual device by address',
			},
		],
		default: 'getDeviceByAddress',
		description: 'The operation to perform.',
	},
];

export const v2devicesFields: INodeProperties[] = [
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

];
