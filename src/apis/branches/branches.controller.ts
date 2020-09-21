import { Controller, Get, Res, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(AuthGuard('jwt'))
    async getBranches(@Res() res) {
        const data = await this.githubWsService.getAllBranches();
        res.status(HttpStatus.OK).json(data);
    }

    @Get('/:branchName')
    @UseGuards(AuthGuard('jwt'))
    async getBranchDetails(@Res() res, @Param() params) {
        const data = await this.githubWsService.getBranchDetails(params.branchName);
        res.status(HttpStatus.OK).json(data);
    }

    @Get('/compare/:branchBase/:branchHead')
    @UseGuards(AuthGuard('jwt'))
    async compareTwoBranches(@Res() res, @Param() params) {
        const data = await this.githubWsService.compareTwoBranches(params.branchBase, params.branchHead);
        res.status(HttpStatus.OK).json({ status: data.status });
    }
}
