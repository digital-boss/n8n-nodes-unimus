import { IExecuteFunctions } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {publicApiOperations} from "./descriptions"

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

		properties: [...publicApiOperations],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		let uri = '';
		let responseData;
		const body: IDataObject = {};
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
				switch(apiVersion){
					case "v3":{
						uri = '/api/v3';
						const resource = this.getNodeParameter('resource', i) as string;
						switch(resource){
							case "devices":{
								const operation = this.getNodeParameter('operation', i) as string;
								switch(operation){
									case 'getDeviceByID':{
										const uuid = this.getNodeParameter('uuid', i) as string;
										uri = '/devices/' + uuid;
									}break;
									case 'getDevices':{
										uri = uri = uri + '/devices';
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
										{
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
										}
										{
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
									}break;
								}
							}break;
							case "backups":{
								const operation = this.getNodeParameter('operation', i) as string;
								switch(operation){
									case 'getDeviceBackups':{
										uri = uri + '/devices/backups';
										const deviceUUIDs = this.getNodeParameter(
											'deviceUUIDs',
											i,
										) as IDataObject;
										{
											if (deviceUUIDs && Object.values(deviceUUIDs)[0]) {
												// @ts-ignore
												Object.values(deviceUUIDs)[0].forEach((element: IDataObject) => // TODO: fix possibly undefined tslint issue
													deviceUUIDList.push(element.deviceUUID as string),
												);
											}
										}
										{
											body.types = this.getNodeParameter('types', i) as string[];
											body.latest = this.getNodeParameter('latest', i) as boolean;
											body.validSince = this.getNodeParameter('since', i) as number;
											body.validUntil = this.getNodeParameter('until', i) as number;
											body.size = this.getNodeParameter('pageSize', i) as number;
											body.page = this.getNodeParameter('pageIndex', i) as number;
											body.deviceUuids = deviceUUIDList;
										}
									}break;
									case 'getDiff':{
										uri = uri + '/devices/backups:diff';
			
										body.originalBackupUuid = this.getNodeParameter(
											'originalBackupUuid',
											i,
										) as string;
										body.revisedBackupUuid = this.getNodeParameter(
											'revisedBackupUuid',
											i,
										) as string;
									}break;
								}
							}break;
						}
					}
					break;
					case "v2":{
						uri = '/api/v2';
						const resource = this.getNodeParameter('resource', i) as string;
						switch(resource){
							case 'diff':{
								const operation = this.getNodeParameter('operation', i) as string;
								if (operation === 'getDevicesWithDifferentBackups') {
									const since = this.getNodeParameter('since', i) as number;
									const until = this.getNodeParameter('until', i) as number;
									const pageIndex = this.getNodeParameter('pageIndex', i) as number;
									const pageSize = this.getNodeParameter('pageSize', i) as number;
									uri = uri + `/devices/findByChangedBackup?page=${pageIndex}&size=${pageSize}&since=${since}&until=${until}`;
								}
							}
							break;
							case 'devices':{
								const address = this.getNodeParameter('address', i) as string;
		
								uri = uri + `/devices/findByAddress/:${address}?attr=:`;
							}
							break;
						}
					}
					break;
				}


				responseData = await unimusApiRequest.call(this, body, uri);
				responseData = JSON.parse(responseData);

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				returnData.push(error as IDataObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
