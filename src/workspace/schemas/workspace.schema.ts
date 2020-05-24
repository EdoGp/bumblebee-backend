import { Schema } from 'mongoose';

export const WorkspaceSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 4,
		},
		profiling: { type: String, trim: true },
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
