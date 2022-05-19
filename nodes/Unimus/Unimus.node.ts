import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { unimusApiRequest } from './GenericFunctions';

import { version } from '../version';

import {
	resources,
	v2devicesFields,
	v2devicesOperations,
	v2diffFields,
	v2diffOperations,
	v3backupsFields,
	v3backupsOperations,
	v3devicesFields,
	v3devicesOperations
} from './descriptions';

export class Unimus implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unimus',
		name: 'unimus',
		icon: 'file:unimus.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"] + ": " + $parameter["apiVersion"]}}',
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
			...resources,
			...v2devicesOperations,
			...v2devicesFields,
			...v2diffOperations,
			...v2diffFields,
			...v3backupsOperations,
			...v3backupsFields,
			...v3devicesOperations,
			...v3devicesFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		let endpoint = '';
		let method;
		let responseData;
		const body: IDataObject = {};
		const qs: IDataObject = {};

		const apiVersion = this.getNodeParameter('apiVersion', 0) as string;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {

				switch (apiVersion) {
					case 'v2': {
						endpoint = '/api/v2';
						switch (resource) {
							case 'diff': {
								switch (operation) {
									case 'getDevicesWithDifferentBackups': {
										// ----------------------------------
										//        v3:devices:getDevicesWithDifferentBackups
										// ----------------------------------
										method = 'GET';
										endpoint = endpoint + `/devices/findByChangedBackup`;
										const additionalParameters = this.getNodeParameter('additionalParameters', i) as IDataObject;
										Object.assign(qs, additionalParameters);
										break;

									}
									default: {
										throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "${resource}" and version "${apiVersion}"!`);
									}
								}
								break;

							}
							case 'devices': {
								switch (operation) {
									case 'getDeviceByAddress': {
										// ----------------------------------
										//        v3:devices:getDeviceByAddress
										// ----------------------------------
										method = 'GET';
										const address = this.getNodeParameter('address', i) as string;
										endpoint = endpoint + `/devices/findByAddress/:${address}`;
										const additionalParameters = this.getNodeParameter('additionalParameters', i) as IDataObject;
										Object.assign(qs, additionalParameters);
										break;

									}
									default: {
										throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "${resource}" and version "${apiVersion}"!`);
									}
								}
								break;

							}
							default: {
								throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported!`);
							}
						}
						break;

					}
					case 'v3': {
						endpoint = '/api/v3';
						switch (resource) {
							case 'devices': {
								switch (operation) {
									case 'getDeviceByID': {
										// ----------------------------------
										//        v3:devices:getDeviceByID
										// ----------------------------------
										method = 'GET';
										const uuid = this.getNodeParameter('uuid', i) as string;
										endpoint = '/devices/' + uuid;
										break;

									}
									case 'getDevices': {
										// ----------------------------------
										//        v3:devices:getDevices
										// ----------------------------------
										method = 'GET';
										endpoint = endpoint = endpoint + '/devices';

										// map the parameters
										const additionalParameters = this.getNodeParameter('additionalParameters', i) as IDataObject;
										if (additionalParameters.addresses) {
											additionalParameters.addresses = ((additionalParameters.addresses as IDataObject).addressesValues as IDataObject[]).map(a => a.address);
										}
										if (additionalParameters.descriptions) {
											additionalParameters.descriptions = ((additionalParameters.descriptions as IDataObject).descriptionValues as IDataObject[]).map(a => a.description);
										}
										if (additionalParameters.vendors) {
											additionalParameters.vendors = ((additionalParameters.vendors as IDataObject).vendorsValues as IDataObject[]).map(a => a.vendor);
										}
										if (additionalParameters.types) {
											additionalParameters.types = ((additionalParameters.types as IDataObject).typesValues as IDataObject[]).map(a => a.type);
										}
										if (additionalParameters.models) {
											additionalParameters.models = ((additionalParameters.models as IDataObject).modelsValues as IDataObject[]).map(a => a.model);
										}
										if (additionalParameters.zoneUUIDs) {
											additionalParameters.zoneUUIDs = ((additionalParameters.zoneUUIDs as IDataObject).zoneUUIDsValues as IDataObject[]).map(a => a.zoneUUID);
										}
										if (additionalParameters.scheduleUUIDs) {
											additionalParameters.scheduleUUIDs = ((additionalParameters.scheduleUUIDs as IDataObject).scheduleUuidsValues as IDataObject[]).map(a => a.scheduleUUID);
										}

										Object.assign(qs, additionalParameters);
										break;

									}
									default: {
										throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported!`);
									}
								}
								break;

							}
							case 'backups': {
								switch (operation) {
									case 'getDeviceBackups': {
										// ----------------------------------
										//        v3:backups:getDeviceBackups
										// ----------------------------------
										method = 'GET';
										endpoint = endpoint + '/devices/backups';
										const additionalParameters = this.getNodeParameter('additionalParameters', i) as IDataObject;
										if (additionalParameters.deviceUuids) {
											additionalParameters.deviceUuids = ((additionalParameters.deviceUuids as IDataObject).deviceUuidsValues as IDataObject[]).map(a => a.deviceUuid);
										}
										Object.assign(qs, additionalParameters);
										break;

									}
									case 'getDiff': {
										// ----------------------------------
										//        v3:backups:getDiff
										// ----------------------------------
										method = 'POST';
										endpoint = endpoint + '/devices/backups:diff';
										body.originalBackupUuid = this.getNodeParameter('originalBackupUuid', i) as string;
										body.revisedBackupUuid = this.getNodeParameter('revisedBackupUuid', i) as string;
										break;

									}
									default: {
										throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "${resource}" and version "${apiVersion}"!`);
									}
								}
								break;

							}
							default: {
								throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported for version "${apiVersion}"!`);
							}
						}
						break;

					}
					default: {
						throw new NodeOperationError(this.getNode(), `The API version "${apiVersion}" is not supported!`);
					}
				}

				responseData = await unimusApiRequest.call(this, method, endpoint, body, qs);
				// responseData = JSON.parse(responseData); // TODO: is it needed?

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
