import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceSchema } from './schemas/workspace.schema';
import { WorkspaceController } from './workspace.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Workspace', schema: WorkspaceSchema }]),
	],
	providers: [WorkspaceService],
	controllers: [WorkspaceController],
	exports: [WorkspaceService],
})
export class WorkspaceModule {}
