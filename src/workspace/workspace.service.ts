import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './interfaces/workspace.interface';
import { User } from 'src/users/interfaces/user.interface';
import { CreateWorkspaceDto } from './dto/create-Workspace.dto';

@Injectable()
export class WorkspaceService {
	constructor(
		@InjectModel('Workspace') private workspaceModel: Model<Workspace>,
	) {}

	async getWorkspaces(user: any): Promise<Workspace[]> {
		const workspaces = await this.workspaceModel
			.find({ user: user.id })
			.select(
				'title activeKernel dataSources name createdAt updatedAt description dataSourcesCount selectedTab',
			)
			.exec();
		return workspaces;
	}

	async findOne(workspaceId: string, user: User): Promise<Workspace> {
		const workspace = await this.workspaceModel
			.findOne({ _id: workspaceId, user: user.id })
			.exec();
		return workspace;
	}

	async newWorkspace(
		workspaceData: CreateWorkspaceDto,
		user: User,
	): Promise<Workspace> {
		const workspace = new this.workspaceModel({
			...workspaceData,
			user: user.id,
		});
		return workspace.save();
	}

	async updateWorkspace(
		workspaceId: string,
		workspaceUpdateDto: any,
		// WorkspaceUpdateDto
	): Promise<Workspace> {
		const workspace = await this.workspaceModel.findOneAndUpdate(
			{ _id: workspaceId },
			workspaceUpdateDto,
		);

		return workspace;
	}

	async deleteWorkspace(workspaceId: string, user: User): Promise<void> {
		const result = await this.workspaceModel
			.deleteOne({ _id: workspaceId, user: user.id })
			.exec();
	}
}
