import { Module } from '@nestjs/common';
import { PullsController } from './pulls.controller';
import { PullsService } from './pulls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PullSchema } from './schemas/pull.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pull', schema: PullSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [PullsController],
  providers: [PullsService]
})
export class PullsModule { }
