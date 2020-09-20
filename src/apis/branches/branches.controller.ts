import { Controller, Get, Post, Req, Res, HttpStatus, Body, Param, Put, NotFoundException, BadRequestException, Delete, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { GithubWsService } from '../../services/github-ws/github-ws.service';

@Controller('branches')
export class BranchesController {

    private githubWsService: GithubWsService;

    constructor(
        private readonly moduleRef: ModuleRef,
    ) { }

    async onModuleInit() {
        this.githubWsService = this.moduleRef.get(GithubWsService, { strict: false });
    }

    @Get('/')
    async getBranches(@Res() res) {
        const data = await this.githubWsService.getAllBranches();
        res.status(HttpStatus.OK).json(data);
    }

    @Get('/:branchName')
    async getBranchDetails(@Res() res, @Param() params) {
        const data = await this.githubWsService.getBranchDetails(params.branchName);
        res.status(HttpStatus.OK).json(data);
    }
}
