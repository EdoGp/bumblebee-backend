import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Logger,
	Put,
	Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service';
import { AuthGuard } from '@nestjs/passport';
import { Workspace } from './interfaces/workspace.interface';
import { GetUser } from 'src/auth/dto/get-user.decorator.dto';
import { User } from 'src/users/interfaces/user.interface';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspaceController {
	private logger = new Logger('Workspace');
	constructor(private readonly workspaceService: WorkspaceService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getWorkspaces(): Promise<Workspace[]> {
		return await this.workspaceService.getWorkspaces();
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postWorkspace(
		@Body() createWorkspaceDto: any,
		@GetUser() user: User,
	): Promise<Workspace> {
		this.logger.verbose(`Workspace created ${createWorkspaceDto.name}`);
		return this.workspaceService.newWorkspace(createWorkspaceDto, user);
	}

	@Put()
	@UseGuards(AuthGuard('jwt'))
	async updateWorkspace(
		@Param('id') id: string,
		@Body() workspaceUpdateDto: any,
		// WorkspaceUpdateDto
	): Promise<Workspace> {
		return await this.workspaceService.updateWorkspace(id, workspaceUpdateDto);
	}

	@Delete()
	@UseGuards(AuthGuard('jwt'))
	async deleteWorkspace(@Param('id') id: string): Promise<void> {
		return await this.workspaceService.deleteWorkspace(id);
	}
}
