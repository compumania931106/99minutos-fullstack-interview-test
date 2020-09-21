import { Controller, Get, Post, Req, Res, HttpStatus, Body, Param, Put, NotFoundException, BadRequestException, Delete, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreatePullDTO } from './dto/create-pull.dto';

import { GithubWsService } from '../../services/github-ws/github-ws.service';
import { UpdatePullDTO } from './dto/update-pull.dto';

@Controller('pulls')
export class PullsController {

    private githubWsService: GithubWsService;

    constructor(
        private readonly moduleRef: ModuleRef,
    ) { }

    async onModuleInit() {
        this.githubWsService = this.moduleRef.get(GithubWsService, { strict: false });
    }

    @Get('/')
    async getAllPull(@Res() res) {
        const data = await this.githubWsService.getAllPulls();
        res.status(HttpStatus.OK).json(data);
    }

    @Post('/')
    async createPullRequest(@Res() res, @Body() createPullDTO: CreatePullDTO) {
        const data = await this.githubWsService.createPullRequest(createPullDTO);
        res.status(HttpStatus.OK).json(data);
    }
    
    @Put('/merge/:numberOfPullRequest')
    async mergePullRequest(@Res() res, @Param() params) {
        const data = await this.githubWsService.mergePullRequest(params.numberOfPullRequest);
        res.status(HttpStatus.OK).json(data);
    }

    @Put('/:numberOfPullRequest')
    async updatePullRequest(@Res() res, @Param() params, @Body() updatePullDTO: UpdatePullDTO) {
        const data = await this.githubWsService.updatePullRequest(params.numberOfPullRequest, updatePullDTO);
        res.status(HttpStatus.OK).json(data);
    }
}
