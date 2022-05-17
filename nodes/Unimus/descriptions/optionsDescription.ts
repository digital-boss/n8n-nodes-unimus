import {
	INodeProperties,
} from 'n8n-workflow';

export const publicApiOperations = [
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
] as INodeProperties[];
