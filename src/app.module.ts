import { Module } from '@nestjs/common';
import { GithubWsModule } from './services/github-ws/github-ws.module';
import { AuthModule } from './apis/auth/auth.module';
import { CommitsModule } from './apis/commits/commits.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BranchesModule } from './apis/branches/branches.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GithubWsModule,
    AuthModule,
    CommitsModule,
    BranchesModule
  ],
})
export class AppModule {}
