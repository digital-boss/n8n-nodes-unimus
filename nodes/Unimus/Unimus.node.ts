import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { unimusApiRequest } from './GenericFunctions';

import { version } from '../version';

export class Unimus implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unimus',
		name: 'unimus',
		icon: 'file:unimus.png',
		group: ['transform'],
		version: 1,
		description: `Consume Unimus API (v.${version})`,
		defaults: {
			name: 'Unimus',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'unimusApi',
				required: true,
			},
		],

		properties: [
			// ----------------------------------
			//         Versions
			// ----------------------------------

			{
				displayName: 'API Version',
				name: 'apiVersion',
				type: 'options',
				options: [
					{
						name: 'V2',
						value: 'v2',
					},
					{
						name: 'V3',
						value: 'v3',
					},
				],
				default: 'v3',
				required: true,
			},
			// ----------------------------------
			//        V3 Resource
			// ----------------------------------

			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
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
				default: 'devices',
				required: true,
			},

			// ----------------------------------
			//        V2 Resource
			// ----------------------------------

			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
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
				default: 'diff',
				required: true,
			},
			// ----------------------------------
			//        V2-devices operations
			// ----------------------------------
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
			// ----------------------------------
			//        V2-diff operations
			// ----------------------------------
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
				description: 'The operation to perform.',
			},
			// ----------------------------------
			//        V3-devices operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['devices'],
						apiVersion: ['v3'],
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
			// ----------------------------------
			//        V3-backups operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['backups'],
						apiVersion: ['v3'],
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

			/* -------------------------------------------------------------------------- */
			/*        operation:getDevicesWithDifferentBackups, getDevices                                 */
			/* -------------------------------------------------------------------------- */
			{
				displayName: 'Page Index',
				name: 'pageIndex',
				type: 'number',
				description: 'Page index (OPTIONAL)',
				default: null,
				displayOptions: {
					show: {
						operation: [
							'getDevicesWithDifferentBackups',
							'getDevices',
							'getDeviceBackups',
						],
					},
				},
				required: false,
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				description: 'Page size (OPTIONAL)',
				default: 2147483647,
				displayOptions: {
					show: {
						operation: [
							'getDevicesWithDifferentBackups',
							'getDevices',
							'getDeviceBackups',
						],
					},
				},
				required: false,
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'number',
				description: 'Start of time range in seconds (OPTIONAL) (DEFAULT = 0)',
				default: 0,
				displayOptions: {
					show: {
						operation: [
							'getDevicesWithDifferentBackups',
							'getDevices',
							'getDeviceBackups',
						],
					},
				},
				required: false,
			},
			{
				displayName: 'Until',
				name: 'until',
				type: 'number',
				description:
					'End of time range in seconds (OPTIONAL) (DEFAULT = time of the request)',
				default: null,
				displayOptions: {
					show: {
						operation: [
							'getDevicesWithDifferentBackups',
							'getDevices',
							'getDeviceBackups',
						],
					},
				},
				required: false,
			},

			{
				displayName: 'Addresses',
				name: 'addresses',
				placeholder: 'Add address',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
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
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
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
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
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
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
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
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
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
				name: 'zoneUUIDs',
				placeholder: 'Add Zone UUID',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
				description: '',
				options: [
					{
						name: 'zoneUUIDsValues',
						displayName: 'Zone UUID',
						values: [
							{
								displayName: 'Zone UUID',
								name: 'zoneUUID',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},

			{
				displayName: 'Schedule UUIDs',
				name: 'scheduleUUIDs',
				placeholder: 'Add Schedule UUID',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDevices'],
					},
				},
				description: '',
				options: [
					{
						name: 'scheduleUuidsValues',
						displayName: 'Schedule UUID',
						values: [
							{
								displayName: 'Schedule UUID',
								name: 'scheduleUUID',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},

			/* -------------------------------------------------------------------------- */
			/*        operation: getDeviceByID                                */
			/* -------------------------------------------------------------------------- */
			{
				displayName: 'UUID',
				name: 'uuid',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getDeviceByID'],
					},
				},
				required: true,
			},

			/* -------------------------------------------------------------------------- */
			/*        operation: getDeviceByAddress                               */
			/* -------------------------------------------------------------------------- */
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getDeviceByAddress'],
					},
				},
				required: true,
			},

			/* -------------------------------------------------------------------------- */
			/*        operation:getDeviceBackups                            */
			/* -------------------------------------------------------------------------- */
			{
				displayName: 'Device UUIDs',
				name: 'deviceUUIDs',
				placeholder: 'Add Device UUID',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['getDeviceBackups'],
					},
				},
				description: '',
				options: [
					{
						name: 'deviceUuidsValues',
						displayName: 'Device UUID',
						values: [
							{
								displayName: 'Device UUID',
								name: 'deviceUUID',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Latest',
				name: 'latest',
				type: 'boolean',
				description: 'Filter backups by valid until timestamp',
				default: true,
				displayOptions: {
					show: {
						operation: ['getDeviceBackups'],
					},
				},
				required: false,
			},
			{
				displayName: 'Types',
				name: 'types',
				type: 'multiOptions',
				displayOptions: {
					show: {
						operation: ['getDeviceBackups'],
					},
				},
				options: [
					{
						name: 'BINARY',
						value: 'BINARY',
					},
					{
						name: 'TEXT',
						value: 'TEXT',
					},
				],
				default: [], // Initially selected options
				description: 'The events to be monitored',
			},

			/* -------------------------------------------------------------------------- */
			/*        operation:getDiff                            */
			/* -------------------------------------------------------------------------- */

			{
				displayName: 'Original Backup UUID',
				name: 'originalBackupUuid',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getDiff'],
					},
				},
				required: true,
			},

			{
				displayName: 'Reversed Backup UUID',
				name: 'revisedBackupUuid',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getDiff'],
					},
				},
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		let endpoint = '';
		let responseData;
		const body: IDataObject = {};
		const qs: IDataObject = {};
		const addressList: string[] = [];
		const descriptionList: string[] = [];
		const vendorList: string[] = [];
		const typeList: string[] = [];
		const modelList: string[] = [];
		const scheduleUUIDList: string[] = [];
		const zoneUUIDList: string[] = [];
		const deviceUUIDList: string[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const apiVersion = this.getNodeParameter('apiVersion', i) as string;
				if (apiVersion === 'v3') {
					endpoint = '/api/v3';
					const resource = this.getNodeParameter('resource', i) as string;
					if (resource === 'devices') {
						const operation = this.getNodeParameter('operation', i) as string;
						if (operation === 'getDeviceByID') {
							const uuid = this.getNodeParameter('uuid', i) as string;
							endpoint = '/devices/' + uuid;
						}
						if (operation === 'getDevices') {
							endpoint = endpoint = endpoint + '/devices';
							const addresses = this.getNodeParameter('addresses', i) as IDataObject;
							const descriptions = this.getNodeParameter(
								'descriptions',
								i,
							) as IDataObject;
							const vendors = this.getNodeParameter('vendors', i) as IDataObject;
							const types = this.getNodeParameter('types', i) as IDataObject;
							const models = this.getNodeParameter('models', i) as IDataObject;
							const zoneUUIDs = this.getNodeParameter('zoneUUIDs', i) as IDataObject;
							const scheduleUUIDs = this.getNodeParameter(
								'scheduleUUIDs',
								i,
							) as IDataObject;
							if (addresses && Object.values(addresses)[0]) {
								// @ts-ignore
								Object?.values(addresses)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									addressList.push(element.address as string),
								);
							}
							if (descriptions && Object.values(descriptions)[0]) {
								// @ts-ignore
								Object?.values(descriptions)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									descriptionList.push(element.description as string),
								);
							}
							if (vendors && Object.values(vendors)[0]) {
								// @ts-ignore
								Object?.values(vendors)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									vendorList.push(element.vendor as string),
								);
							}
							if (types && Object.values(types)[0]) {
								// @ts-ignore
								Object?.values(types)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									typeList.push(element.type as string),
								);
							}
							if (models && Object.values(models)[0]) {
								// @ts-ignore
								Object?.values(models)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									modelList.push(element.model as string),
								);
							}
							if (zoneUUIDs && Object.values(zoneUUIDs)[0]) {
								// @ts-ignore
								Object?.values(zoneUUIDs)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									zoneUUIDList.push(element.zoneUUID as string),
								);
							}
							if (scheduleUUIDs && Object.values(scheduleUUIDs)[0]) {
								// @ts-ignore
								Object?.values(scheduleUUIDs)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									scheduleUUIDList.push(element.scheduleUUID as string),
								);
							}
							body.addresses = addressList;
							body.descriptions = descriptionList;
							body.vendors = vendorList;
							body.types = typeList;
							body.models = modelList;
							body.zoneUuids = zoneUUIDList;
							body.scheduleUuids = scheduleUUIDList;
							body.since = this.getNodeParameter('since', i) as number;
							body.until = this.getNodeParameter('until', i) as number;
							body.size = this.getNodeParameter('pageSize', i) as number;
							body.page = this.getNodeParameter('pageIndex', i) as number;
						}
					}

					if (resource === 'backups') {
						const operation = this.getNodeParameter('operation', i) as string;
						if (operation === 'getDeviceBackups') {
							endpoint = endpoint + '/devices/backups';
							const deviceUUIDs = this.getNodeParameter(
								'deviceUUIDs',
								i,
							) as IDataObject;
							if (deviceUUIDs && Object.values(deviceUUIDs)[0]) {
								// @ts-ignore
								Object.values(deviceUUIDs)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
									deviceUUIDList.push(element.deviceUUID as string),
								);
							}
							body.types = this.getNodeParameter('types', i) as string[];
							body.latest = this.getNodeParameter('latest', i) as boolean;
							body.validSince = this.getNodeParameter('since', i) as number;
							body.validUntil = this.getNodeParameter('until', i) as number;
							body.size = this.getNodeParameter('pageSize', i) as number;
							body.page = this.getNodeParameter('pageIndex', i) as number;
							body.deviceUuids = deviceUUIDList;
						}
						if (operation === 'getDiff') {
							endpoint = endpoint + '/devices/backups:diff';

							body.originalBackupUuid = this.getNodeParameter(
								'originalBackupUuid',
								i,
							) as string;
							body.revisedBackupUuid = this.getNodeParameter(
								'revisedBackupUuid',
								i,
							) as string;
						}
					}
				}

				if (apiVersion === 'v2') {
					endpoint = '/api/v2';
					const resource = this.getNodeParameter('resource', i) as string;
					if (resource === 'diff') {
						const operation = this.getNodeParameter('operation', i) as string;
						if (operation === 'getDevicesWithDifferentBackups') {
							qs.since = this.getNodeParameter('since', i) as number;
							qs.until = this.getNodeParameter('until', i) as number;
							qs.page = this.getNodeParameter('pageIndex', i) as number;
							qs.pageSize = this.getNodeParameter('pageSize', i) as number;

							endpoint = endpoint + `/devices/findByChangedBackup`;
						}
					}
					if (resource === 'devices') {
						const address = this.getNodeParameter('address', i) as string;

						endpoint = endpoint + `/devices/findByAddress/:${address}?attr=:`;
					}
				}

				responseData = await unimusApiRequest.call(this, endpoint, body, qs);
				responseData = JSON.parse(responseData);

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
