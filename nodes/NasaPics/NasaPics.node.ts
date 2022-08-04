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
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Astronomy Picture of the Day',
						value: 'astronomyPictureOfTheDay',
					},
					{
						name: 'Mars Rover Photo',
						value: 'marsRoverPhotos',
					},
				],
				default: 'astronomyPictureOfTheDay',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['astronomyPictureOfTheDay'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the APOD',
						description: 'Get the Astronomy Picture of the day',
						routing: {
							request: {
								method: 'GET',
								url: '/planetary/apod',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['marsRoverPhotos'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Get Mars Rover photos',
						description: 'Get photos from the Mars Rover',
						routing: {
							request: {
								method: 'GET',
								url: '=/mars-photos/api/v1/rovers/{{$parameter.roverName}}/photos',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Rover Name',
				description: 'Choose which Mars Rover to get a photo from',
				required: true,
				name: 'roverName',
				type: 'options',
				options: [
					{ name: 'Curiosity', value: 'curiosity' },
					{ name: 'Opportunity', value: 'opportunity' },
					{ name: 'Perseverance', value: 'perseverance' },
					{ name: 'Spirit', value: 'spirit' },
				],
				default: 'curiosity',
				displayOptions: {
					show: {
						resource: ['marsRoverPhotos'],
					},
				},
			},
			{
				displayName: 'Date',
				description: 'Earth date',
				required: true,
				name: 'marsRoverDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: ['marsRoverPhotos'],
					},
				},
				routing: {
					request: {
						// You've already set up the URL. qs appends the value of the field as a query string
						qs: {
							earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
						},
					},
				},
			},
			// Optional/additional fields will go here
		],
	};
}
