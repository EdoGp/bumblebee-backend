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
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service';
import { AuthGuard } from '@nestjs/passport';
import { Workspace } from './interfaces/workspace.interface';
import { QueryParams } from './interfaces/queryParams.interface';
import { GetUser } from 'src/auth/dto/get-user.decorator.dto';
import { User } from 'src/users/interfaces/user.interface';
import { CreateWorkspaceDto } from './dto/create-Workspace.dto';
import { EditWorkspaceDto } from './dto/edit-Workspace.dto';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspaceController {
	private logger = new Logger('Workspace');
	constructor(private readonly workspaceService: WorkspaceService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getWorkspaces(
		@GetUser() user: User,
		@Query() queryParams: QueryParams,
	): Promise<any> {
		const items = await this.workspaceService.getWorkspaces(user, queryParams);
		const count = await this.workspaceService.countWorkspaces(user);
		return { items, count };
	}

	@Get('/:id')
	@UseGuards(AuthGuard('jwt'))
	async getWorkspace(
		@GetUser() user: User,
		@Param('id') id: string,
	): Promise<Workspace> {
		return await this.workspaceService.findOne(id, user);
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postWorkspace(
		@Body() createWorkspaceDto: CreateWorkspaceDto,
		@GetUser() user: User,
	): Promise<Workspace> {
		this.logger.verbose(`Workspace created ${createWorkspaceDto.name}`);
		return this.workspaceService.newWorkspace(createWorkspaceDto, user);
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateWorkspace(
		@Param('id') id: string,
		@GetUser() user: User,
		@Body() workspaceUpdateDto: EditWorkspaceDto,
	): Promise<Workspace> {
		return await this.workspaceService.updateWorkspace(id, workspaceUpdateDto);
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteWorkspace(
		@Param('id') id: string,
		@GetUser() user: User,
	): Promise<void> {
		return await this.workspaceService.deleteWorkspace(id, user);
	}
}
