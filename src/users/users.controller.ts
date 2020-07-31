import {
	Controller,
	Body,
	Get,
	UseGuards,
	Query,
	Post,
	Param,
	Delete,
	UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { QueryParams } from './interfaces/queryParams.interface';
import { GetUser } from 'src/auth/dto/get-user.decorator.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getUsers(
		@Query() queryParams: QueryParams,
		@GetUser() user,
	): Promise<any> {
		const items = await this.usersService.getUsers(queryParams, user);
		const count = await this.usersService.getUsersCount(user);
		return { items, count };
	}

	@Post('/activate')
	@UseGuards(AuthGuard('jwt'))
	async activateUsers(@Body() usersToActivate, @GetUser() user): Promise<any> {
		if (
			user.userId === '5ec98793d1be7d1fc3aaf9d5' ||
			user.userId === '5ed5559c1ce6121884455241'
		) {
			const users = await this.usersService.activateUser(usersToActivate);

			return { message: 'Users activated' };
		} else {
			throw new UnauthorizedException();
		}
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteUser(@Param('id') id: string): Promise<User> {
		return await this.usersService.deleteUser(id);
	}
}
