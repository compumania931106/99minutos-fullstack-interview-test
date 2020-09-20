import { Test, TestingModule } from '@nestjs/testing';
import { GithubWsService } from './github-ws.service';

describe('GithubWsService', () => {
  let service: GithubWsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubWsService],
    }).compile();

    service = module.get<GithubWsService>(GithubWsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
