import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubWsModule } from './services/github-ws/github-ws.module';
import { AuthModule } from './apis/auth/auth.module';
import { CommitsModule } from './apis/commits/commits.module';

@Module({
  imports: [GithubWsModule, AuthModule, CommitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
