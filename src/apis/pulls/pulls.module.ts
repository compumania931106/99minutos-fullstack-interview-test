import { Module } from '@nestjs/common';
import { PullsController } from './pulls.controller';
import { PullsService } from './pulls.service';

@Module({
  controllers: [PullsController],
  providers: [PullsService]
})
export class PullsModule {}
