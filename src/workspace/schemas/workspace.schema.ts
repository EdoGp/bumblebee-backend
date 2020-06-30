import { Schema } from 'mongoose';

export const WorkspaceSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 4,
		},
		activeKernel: { type: Boolean, default: false },
		connection: {
			id: { type: String },
			createDate: { type: Date },
		},
		commands: [
			{
				type: String,
			},
		],
		selectedTab: { type: Number, default: 0 },
		tabs: [
			{
				name: { type: String },
				profiling: { type: String },
				dataSources: [
					{
						type: Schema.Types.ObjectId,
						ref: 'DataSource',
						default: null,
					},
				],
			},
		],
		dataSources: [
			{
				type: Schema.Types.ObjectId,
				ref: 'DataSource',
				default: null,
			},
		],
	},
	{ timestamps: true },
);
