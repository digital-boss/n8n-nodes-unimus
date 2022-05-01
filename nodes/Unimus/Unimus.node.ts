import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
} from "n8n-workflow";
import { unimusApiRequest } from "./GenericFunctions";

export class Unimus implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Unimus",
    name: "unimus",
    icon: "file:unimus.png",
    group: ["transform"],
    version: 1,
    description: "Unimus REST API",
    defaults: {
      name: "Unimus",
      color: "#772244",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "unimusApi",
        required: true,
      },
    ],

    properties: [
      // ----------------------------------
      //         Versions
      // ----------------------------------

      {
        displayName: "API Version",
        name: "apiVersion",
        type: "options",
        options: [
          {
            name: "V2",
            value: "v2",
          },
          {
            name: "V3",
            value: "v3",
          },
        ],
        default: "v3",
        required: true,
      },
      // ----------------------------------
      //        V3 Resource
      // ----------------------------------

      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        displayOptions: {
          show: {
            apiVersion: ["v3"],
          },
        },
        options: [
          {
            name: "Devices",
            value: "devices",
          },
          {
            name: "Backups",
            value: "backups",
          },
        ],
        default: "devices",
        required: true,
      },

      // ----------------------------------
      //        V2 Resource
      // ----------------------------------

      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        displayOptions: {
          show: {
            apiVersion: ["v2"],
          },
        },
        options: [
          {
            name: "Diff",
            value: "diff",
          },
          {
            name: "Devices",
            value: "devices",
          },
        ],
        default: "diff",
        required: true,
      },
      // ----------------------------------
      //        V2-devices operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            apiVersion: ["v2"],
            resource: ["devices"],
          },
        },
        options: [
          {
            name: "Get device by address",
            value: "getDeviceByAddress",
            description: "Get an individual device by address",
          },
        ],
        default: "getDeviceByAddress",
        description: "The operation to perform.",
      },
      // ----------------------------------
      //        V2-diff operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            apiVersion: ["v2"],
            resource: ["diff"],
          },
        },
        options: [
          {
            name: "Get devices with different backups",
            value: "getDevicesWithDifferentBackups",
            description:
              "Get a list of devices that has different backups in specified time range.",
          },
        ],
        default: "getDevicesWithDifferentBackups",
        description: "The operation to perform.",
      },
      // ----------------------------------
      //        V3-devices operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["devices"],
            apiVersion: ["v3"],
          },
        },
        options: [
          {
            name: "Get devices",
            value: "getDevices",
            description: "Get a list of devices.",
          },
          {
            name: "Get device by ID",
            value: "getDeviceByID",
            description: "Get an individual device by ID.",
          },
        ],
        default: "getDevices",
        description: "The operation to perform.",
      },
      // ----------------------------------
      //        V3-backups operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["backups"],
            apiVersion: ["v3"],
          },
        },
        options: [
          {
            name: "Get device backups",
            value: "getDeviceBackups",
            description: "Get a list of all device backups.",
          },
          {
            name: "Get diff",
            value: "getDiff",
            description: "Compute and return a diff beetween two backups",
          },
        ],
        default: "getDeviceBackups",
        description: "The operation to perform.",
      },

      /* -------------------------------------------------------------------------- */
      /*        operation:getDevicesWithDifferentBackups, getDevices                                 */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "Page Index",
        name: "pageIndex",
        type: "number",
        description: "Page index (OPTIONAL)",
        default: null,
        displayOptions: {
          show: {
            operation: [
              "getDevicesWithDifferentBackups",
              "getDevices",
              "getDeviceBackups",
            ],
          },
        },
        required: false,
      },
      {
        displayName: "Page Size",
        name: "pageSize",
        type: "number",
        description: "Page size (OPTIONAL)",
        default: 2147483647,
        displayOptions: {
          show: {
            operation: [
              "getDevicesWithDifferentBackups",
              "getDevices",
              "getDeviceBackups",
            ],
          },
        },
        required: false,
      },
      {
        displayName: "Since",
        name: "since",
        type: "number",
        description: "Start of time range in seconds (OPTIONAL) (DEFAULT = 0)",
        default: 0,
        displayOptions: {
          show: {
            operation: [
              "getDevicesWithDifferentBackups",
              "getDevices",
              "getDeviceBackups",
            ],
          },
        },
        required: false,
      },
      {
        displayName: "Until",
        name: "until",
        type: "number",
        description:
          "End of time range in seconds (OPTIONAL) (DEFAULT = time of the request)",
        default: null,
        displayOptions: {
          show: {
            operation: [
              "getDevicesWithDifferentBackups",
              "getDevices",
              "getDeviceBackups",
            ],
          },
        },
        required: false,
      },

      {
        displayName: "Addresses",
        name: "addresses",
        placeholder: "Add address",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "addressesValues",
            displayName: "Address",
            values: [
              {
                displayName: "Address",
                name: "address",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      {
        displayName: "Descriptions",
        name: "descriptions",
        placeholder: "Add description",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "descriptionValues",
            displayName: "Description",
            values: [
              {
                displayName: "Description",
                name: "description",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      {
        displayName: "Vendors",
        name: "vendors",
        placeholder: "Add vendors",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "vendorsValues",
            displayName: "Vendor",
            values: [
              {
                displayName: "Vendor",
                name: "vendor",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      {
        displayName: "Types",
        name: "types",
        placeholder: "Add type",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "typesValues",
            displayName: "Type",
            values: [
              {
                displayName: "Type",
                name: "type",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      {
        displayName: "Models",
        name: "models",
        placeholder: "Add model",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "modelsValues",
            displayName: "Type",
            values: [
              {
                displayName: "Model",
                name: "model",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      {
        displayName: "Zone UUIDs",
        name: "zoneUUIDs",
        placeholder: "Add Zone UUID",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "zoneUUIDsValues",
            displayName: "Zone UUID",
            values: [
              {
                displayName: "Zone UUID",
                name: "zoneUUID",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      {
        displayName: "Schedule UUIDs",
        name: "scheduleUUIDs",
        placeholder: "Add Schedule UUID",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDevices"],
          },
        },
        description: "",
        options: [
          {
            name: "scheduleUuidsValues",
            displayName: "Schedule UUID",
            values: [
              {
                displayName: "Schedule UUID",
                name: "scheduleUUID",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },

      /* -------------------------------------------------------------------------- */
      /*        operation: getDeviceByID                                */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "UUID",
        name: "uuid",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["getDeviceByID"],
          },
        },
        required: true,
      },

      /* -------------------------------------------------------------------------- */
      /*        operation: getDeviceByAddress                               */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "Address",
        name: "address",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["getDeviceByAddress"],
          },
        },
        required: true,
      },

      /* -------------------------------------------------------------------------- */
      /*        operation:getDevicesBackups                            */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "Device UUIDs",
        name: "deviceUUIDs",
        placeholder: "Add Device UUID",
        type: "fixedCollection",
        default: "",
        typeOptions: {
          multipleValues: true,
        },
        displayOptions: {
          show: {
            operation: ["getDeviceBackups"],
          },
        },
        description: "",
        options: [
          {
            name: "deviceUuidsValues",
            displayName: "Device UUID",
            values: [
              {
                displayName: "Device UUID",
                name: "deviceUUID",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },
      {
        displayName: "Latest",
        name: "latest",
        type: "boolean",
        description: "Filter backups by valid until timestamp",
        default: true,
        displayOptions: {
          show: {
            operation: ["getDeviceBackups"],
          },
        },
        required: false,
      },

      /* -------------------------------------------------------------------------- */
      /*        operation:getDiff                            */
      /* -------------------------------------------------------------------------- */

      {
        displayName: "Original Backup UUID",
        name: "originalBackupUuid",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["getDiff"],
          },
        },
        required: true,
      },

      {
        displayName: "Reversed Backup UUID",
        name: "revisedBackupUuid",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["getDiff"],
          },
        },
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const returnData: IDataObject[] = [];
    const BaseURLV2 = "https://v2";
    const BaseURLV3 = "https://v3";
    let uri = "";
    let responseData;
    let body: any = {};
    let addressList: string[] = [];
    let descriptionList: string[] = [];
    let vendorList: string[] = [];
    let typeList: string[] = [];
    let modelList: string[] = [];
    let scheduleUUIDList: string[] = [];
    let zoneUUIDList: string[] = [];
    let deviceUUIDList: string[] = [];

    const apiVersion = this.getNodeParameter("apiVersion", 0) as string;
    if (apiVersion == "v3") {
      uri = BaseURLV3;
      const resource = this.getNodeParameter("resource", 0) as string;
      if (resource == "devices") {
        const operation = this.getNodeParameter("operation", 0) as string;
        if (operation == "getDeviceByID") {
          const uuid = this.getNodeParameter("uuid", 0) as string;
          uri = uri + "/devices/" + uuid;
        }
        if (operation == "getDevices") {
          uri = uri + "/devices";
          let addresses = this.getNodeParameter("addresses", 0) as Object;
          let descriptions = this.getNodeParameter("descriptions", 0) as Object;
          let vendors = this.getNodeParameter("vendors", 0) as Object;
          let types = this.getNodeParameter("types", 0) as Object;
          let models = this.getNodeParameter("models", 0) as Object;
          let zoneUUIDs = this.getNodeParameter("zoneUUIDs", 0) as Object;
          let scheduleUUIDs = this.getNodeParameter(
            "scheduleUUIDs",
            0
          ) as Object;

          Object.values(addresses)[0].forEach((element: any) =>
            addressList.push(element?.address)
          );
          Object.values(descriptions)[0].forEach((element: any) =>
            descriptionList.push(element?.description)
          );
          Object.values(vendors)[0].forEach((element: any) =>
            vendorList.push(element?.vendor)
          );
          Object.values(types)[0].forEach((element: any) =>
            typeList.push(element?.type)
          );
          Object.values(models)[0].forEach((element: any) =>
            modelList.push(element?.model)
          );
          Object.values(zoneUUIDs)[0].forEach((element: any) =>
            zoneUUIDList.push(element?.zoneUUID)
          );
          Object.values(scheduleUUIDs)[0].forEach((element: any) =>
            scheduleUUIDList.push(element?.scheduleUUID)
          );
          body.addresses = addressList;
          body.descriptions = descriptionList;
          body.vendors = vendorList;
          body.types = typeList;
          body.models = modelList;
          body.zoneUuids = zoneUUIDList;
          body.scheduleUuids = scheduleUUIDList;
          body.since = this.getNodeParameter("since", 0) as number;
          body.until = this.getNodeParameter("until", 0) as number;
          body.size = this.getNodeParameter("pageSize", 0) as number;
          body.page = this.getNodeParameter("pageIndex", 0) as number;
          console.log(body);
        }
      }

      if (resource == "backups") {
        const operation = this.getNodeParameter("operation", 0) as string;
        if (operation == "getDeviceBackups") {
          uri = uri + "/devices/backups";
          let deviceUUIDs = this.getNodeParameter("deviceUUIDs", 0) as Object;
          Object.values(deviceUUIDs)[0].forEach((element: any) =>
            deviceUUIDList.push(element?.deviceUUID)
          );
          body.latest = this.getNodeParameter("latest", 0) as boolean;
          body.validSince = this.getNodeParameter("since", 0) as number;
          body.validUntil = this.getNodeParameter("until", 0) as number;
          body.size = this.getNodeParameter("pageSize", 0) as number;
          body.page = this.getNodeParameter("pageIndex", 0) as number;
          body.deviceUuids = deviceUUIDList;
          console.log(body);
        }
        if (operation == "getDiff") {
          uri = uri + "/devices/backups:diff";

          body.originalBackupUuid = this.getNodeParameter(
            "originalBackupUuid",
            0
          ) as string;
          body.revisedBackupUuid = this.getNodeParameter(
            "revisedBackupUuid",
            0
          ) as string;
          console.log(body);
        }
      }
    }

    if (apiVersion == "v2") {
      uri = BaseURLV2;
      console.log("v2");
      const resource = this.getNodeParameter("resource", 0) as string;
      if (resource == "diff") {
        const operation = this.getNodeParameter("operation", 0) as string;
        if (operation == "getDevicesWithDifferentBackups") {
          console.log("recource");
          const since = this.getNodeParameter("since", 0) as number;
          const until = this.getNodeParameter("until", 0) as number;
          const pageIndex = this.getNodeParameter("pageIndex", 0) as number;
          const pageSize = this.getNodeParameter("pageSize", 0) as number;
          uri =
            uri +
            `devices/findByChangedBackup?page=:${pageIndex}&size=:${pageSize}&since=:${since}&until=:${until}`;
          console.log(uri);
        }
      }
      if (resource == "devices") {
        const address = this.getNodeParameter("address", 0) as string;

        uri = uri + `/devices/findByAddress/:${address}?attr=:`;
        console.log(uri);
      }
    }

    try {
      responseData = await unimusApiRequest.call(this, body, uri);
      responseData = JSON.parse(responseData);
    } catch (error) {
      returnData.push(error as IDataObject);
    }

    if (Array.isArray(responseData)) {
      returnData.push.apply(returnData, responseData as IDataObject[]);
    } else {
      returnData.push(responseData as IDataObject);
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
