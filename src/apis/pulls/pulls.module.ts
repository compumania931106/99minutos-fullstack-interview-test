import { Module } from '@nestjs/common';
import { PullsController } from './pulls.controller';
import { PullsService } from './pulls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PullSchema } from './schemas/pull.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pull', schema: PullSchema }]),
  ],
  controllers: [PullsController],
  providers: [PullsService]
})
export class PullsModule { }
