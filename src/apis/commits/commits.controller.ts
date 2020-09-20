import { Controller, Get, Post, Req, Res, HttpStatus, Body, Param, Put, NotFoundException, BadRequestException, Delete, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

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
    async getCommitsByBranch(@Res() res, @Param() params) {
        const data = await this.githubWsService.getCommitsByBranch(params.branchName);
        res.status(HttpStatus.OK).json(data);
    }
}
