import { Module } from '@nestjs/common';
import { GithubWsModule } from './services/github-ws/github-ws.module';
import { AuthModule } from './apis/auth/auth.module';
import { CommitsModule } from './apis/commits/commits.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BranchesModule } from './apis/branches/branches.module';
import { PullsModule } from './apis/pulls/pulls.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://localhost:27017/${configService.get<string>('DB_NAME')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    GithubWsModule,
    AuthModule,
    CommitsModule,
    BranchesModule,
    PullsModule
  ],
})
export class AppModule {}
