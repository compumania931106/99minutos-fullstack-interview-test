import { Module } from '@nestjs/common';
import { GithubWsService } from './github-ws.service';

@Module({
  providers: [GithubWsService]
})
export class GithubWsModule {}
