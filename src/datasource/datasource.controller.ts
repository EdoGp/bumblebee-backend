import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
	Controller,
	Logger,
	Get,
	UseGuards,
	Post,
	Delete,
	Body,
	Put,
	Param,
} from '@nestjs/common';
import { DatasourceService } from './datasource.service';
import { GetUser } from 'src/auth/dto/get-user.decorator.dto';
import { User } from 'src/users/interfaces/user.interface';

@ApiTags('Data Sources')
@Controller('datasource')
export class DatasourceController {
	private logger = new Logger('DataSource');
	constructor(private readonly datasourceService: DatasourceService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getDataSources(): Promise<any> {
		return [];
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async postDataSource(
		@Body() createDataSourceDto: any,
		@GetUser() user: User,
	): Promise<any> {
		this.logger.verbose('DataSoruce created');
		return {};
	}

	@Put()
	@UseGuards(AuthGuard('jwt'))
	async updateDataSource(
		@Param('id') id: string,
		@Body() dataSourceUpdateDto: any,
	): Promise<any> {
		return [];
	}

	@Delete()
	@UseGuards(AuthGuard('jwt'))
	async deleteDataSource(@Param('id') id: string): Promise<void> {
		return null;
	}
}
