import { Controller, Get, Res, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { GithubWsService } from '../../services/github-ws/github-ws.service';

@Controller('commits')
export class CommitsController {

    private githubWsService: GithubWsService;

    constructor(
        private readonly moduleRef: ModuleRef,
    ) { }

    async onModuleInit() {
        this.githubWsService = this.moduleRef.get(GithubWsService, { strict: false });
    }

    @Get('/:branchName')
    @UseGuards(AuthGuard('jwt'))
    async getCommitsByBranch(@Res() res, @Param() params) {
        const data = await this.githubWsService.getCommitsByBranch(params.branchName);
        res.status(HttpStatus.OK).json(data);
    }

    @Get('/detail/:ref')
    @UseGuards(AuthGuard('jwt'))
    async getCommitDetail(@Res() res, @Param() params) {
        const data = await this.githubWsService.getCommitDetail(params.ref);
        res.status(HttpStatus.OK).json(data);
    }
}
