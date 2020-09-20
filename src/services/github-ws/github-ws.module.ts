import { Module, HttpModule } from '@nestjs/common';
import { GithubWsService } from './github-ws.service';

@Module({
  imports: [
    HttpModule
  ],
  providers: [GithubWsService]
})
export class GithubWsModule {}
