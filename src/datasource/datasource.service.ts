import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataSource } from './interfaces/datasoruce.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class DatasourceService {
	constructor(
		@InjectModel('DataSource') private dataSourceModel: Model<DataSource>,
	) {}

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
		//  DataSourceCreateDto,
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
		console.log(result);
	}
}
