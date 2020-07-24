import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async findOne(userOrEmail: string): Promise<User> {
		const user = await this.userModel.findOne({ username: userOrEmail }).exec();
		return user;
	}

	async signUp(createUser: CreateUserDto): Promise<User> {
		const user = new this.userModel(createUser);
		return user.save();
	}

	async newUser(userCredentials: UserCredentialsDto): Promise<User> {
		const user = new this.userModel(userCredentials);
		return user.save();
	}

	async getUsers(queryParams): Promise<User[]> {
		const query = {};
		queryParams?.filters?.split(',').forEach((filter, index) => {
			query[filter] = queryParams?.values?.split(',')[index];
		});
		const users = this.userModel
			.find({ ...query })
			.sort(queryParams.sort)
			.skip(parseInt(queryParams.page) * parseInt(queryParams.pageSize))
			.limit(parseInt(queryParams.pageSize))
			.exec();
		return users;
	}

	async activateUser(usersToActivate): Promise<User[]> {
		if (
			usersToActivate?.users?.split(',').filter((user) => {
				return user;
			}).length > 0
		) {
			const users = this.userModel
				.updateMany(
					{
						$or: usersToActivate?.users
							?.split(',')
							.filter((user) => {
								return user;
							})
							.map((user) => {
								return { _id: user || '' };
							}),
					},
					{ active: true },
					{ new: true, lean: true },
				)
				.exec();
			return users;
		} else {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
	}

	async deleteUser(id: string): Promise<User> {
		return this.userModel.findOneAndDelete({ _id: id });
	}
}
