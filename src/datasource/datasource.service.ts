import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataSource } from './interfaces/datasoruce.interface';
import { User } from 'src/users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
	endpoint: process.env.DO_ENDPOINT,
	accessKeyId: process.env.DO_ACCESS_KEY_ID,
	secretAccessKey: process.env.DO_SECRET_KEY,
});

@Injectable()
export class DatasourceService {
	constructor(
		@InjectModel('DataSource') private dataSourceModel: Model<DataSource>,
	) {}

	async getPresignedUrl(user, media): Promise<string> {
		const name = media.name
			.split('.')
			.slice(0, -1)
			.join('.');
		const Key = `${user.username}/${name}-${uuidv4()}.${
			media.type.split('/')[1]
		}`;
		const url = await s3.getSignedUrlPromise('putObject', {
			Bucket: process.env.DO_BUCKET,
			ContentType: media.type,
			ACL: 'public-read',
			Key,
			Expires: 60 * 2,
		});

		new this.dataSourceModel({
			name,
			url: url
				.split('?')
				.slice(0, -1)
				.join('?'),
		}).save();
		return url;
	}

	async getDataSources(): Promise<DataSource[]> {
		const dataSources = await this.dataSourceModel.find().exec();
		return dataSources;
	}

	async findOne(dataSourceId: string): Promise<DataSource> {
		const dataSource = await this.dataSourceModel.findById(dataSourceId).exec();
		return dataSource;
	}

	async newDataSource(
		dataSourceCreateDto: any,
		user: User,
	): Promise<DataSource> {
		const dataSource = new this.dataSourceModel({
			...dataSourceCreateDto,
			creator: user.id,
		});

		return dataSource.save();
	}

	async updateDataSource(
		dataSourceId: string,
		dataSourceUpdateDto: any,
	): Promise<DataSource> {
		const dataSource = await this.dataSourceModel.findOneAndUpdate(
			dataSourceId,
			dataSourceUpdateDto,
		);
		return dataSource;
	}

	async deleteDataSource(dataSourceId: string): Promise<void> {
		const result = await this.dataSourceModel.deleteOne(dataSourceId);
	}
}
