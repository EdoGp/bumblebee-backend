import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './interfaces/workspace.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class WorkspaceService {
	constructor(
		@InjectModel('Workspace') private workspaceModel: Model<Workspace>,
	) {}

	async getWorkspaces(): Promise<Workspace[]> {
		const workspaces = await this.workspaceModel.find().exec();
		return workspaces;
	}

	async findOne(workspaceId: string): Promise<Workspace> {
		const workspace = await this.workspaceModel.findById(workspaceId).exec();
		return workspace;
	}

	async newWorkspace(
		workspaceData: any,
		user: User,
		// WorkspaceCreateDto
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
			workspaceId,
			workspaceUpdateDto,
		);
		return workspace;
	}

	async deleteWorkspace(workspaceId: string): Promise<void> {
		const result = await this.workspaceModel.deleteOne(workspaceId);
		console.log(result);
	}
}
