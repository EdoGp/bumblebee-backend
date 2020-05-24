import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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

	async getUsers(): Promise<User[]> {
		const users = this.userModel.find().exec();
		return users;
	}

	// async deleteUser(): Promise<void>{
	// 	// this.userModel.
	// }
}
