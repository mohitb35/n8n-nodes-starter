import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details go here
		displayName: 'NASA Pics',
		name: 'NasaPics',
		icon: 'file:nasapics.svg',
		group: ['transform'], //transform currently has no effect
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from NASAs API',
		defaults: {
			name: 'NASA Pics',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'NasaPicsApi', //must match name property in credential file
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.nasa.gov',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resources and operations go here
		],
	};
}
