import { Controller, Get, Post, Res, HttpStatus, Body, Param, Put, UseGuards } from '@nestjs/common';
import { PullsService } from './pulls.service';
import { ModuleRef } from '@nestjs/core';
import { CreatePullRemoteDTO } from './dto/create-pull-remote.dto';
import { UpdatePullRemoteDTO } from './dto/update-pull-remote.dto';
import { CreatePullLocalDTO } from './dto/create-pull-local.dto';
import { UpdatePullLocalDTO } from './dto/update-pull-local.dto';
import { AuthGuard } from '@nestjs/passport';

import { GithubWsService } from '../../services/github-ws/github-ws.service';

@Controller('pulls')
export class PullsController {

    private githubWsService: GithubWsService;

    constructor(
        private readonly moduleRef: ModuleRef,
        private pullsService: PullsService,
    ) { }

    async onModuleInit() {
        this.githubWsService = this.moduleRef.get(GithubWsService, { strict: false });
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async getAllPull(@Res() res) {
        const data = await this.githubWsService.getAllPulls();

        for (const iterator of data) {
            
            const localPull = await this.pullsService.getPullByExternalId(iterator.id);
            
            if (!localPull) {
                const pullSavedDate: CreatePullLocalDTO = {
                    externalId: iterator.id,
                    numberOfPull: iterator.number,
                    author: iterator.user.login,
                    title: iterator.title,
                    body: iterator.body,
                    state: iterator.state,
                    closeAt: iterator.closed_at,
                    mergedAt: iterator.merged_at
                };

                const pullSaved = await this.pullsService.createPull(pullSavedDate);
            } else {

                let updatedPullLocalDate: UpdatePullLocalDTO = {};
                let updatedLocal: boolean = false;

                if (localPull.author !== iterator.user.login) {
                    updatedPullLocalDate.author = iterator.user.login;
                    updatedLocal = true;
                }

                if (localPull.title !== iterator.title) {
                    updatedPullLocalDate.title = iterator.title;
                    updatedLocal = true;
                }

                if (localPull.body !== iterator.body) {
                    updatedPullLocalDate.body = iterator.body;
                    updatedLocal = true;
                }

                if (localPull.state !== iterator.state) {
                    updatedPullLocalDate.state = iterator.state;
                    updatedLocal = true;
                }

                if (localPull.closeAt === null && iterator.closed_at !== null) {
                    updatedPullLocalDate.closeAt = iterator.closed_at;
                    updatedLocal = true;
                }

                if (localPull.mergedAt === null && iterator.merged_at !== null) {
                    updatedPullLocalDate.mergedAt = iterator.merged_at;
                    updatedLocal = true;
                }

                if (updatedLocal === true) {
                    const updatedPullLocal = await this.pullsService.updatePull(iterator.id, updatedPullLocalDate);
                }

            }

        }

        const localPulls = await this.pullsService.getPulls();

        res.status(HttpStatus.OK).json(localPulls);
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async createPullRequest(@Res() res, @Body() createPullRemoteDTO: CreatePullRemoteDTO) {
        const data = await this.githubWsService.createPullRequest(createPullRemoteDTO);
        res.status(HttpStatus.OK).json(data);
    }
    
    @Put('/merge/:numberOfPullRequest')
    @UseGuards(AuthGuard('jwt'))
    async mergePullRequest(@Res() res, @Param() params) {
        const data = await this.githubWsService.mergePullRequest(params.numberOfPullRequest);
        res.status(HttpStatus.OK).json(data);
    }

    @Put('/:numberOfPullRequest')
    @UseGuards(AuthGuard('jwt'))
    async updatePullRequest(@Res() res, @Param() params, @Body() updatePullRemoteDTO: UpdatePullRemoteDTO) {
        const data = await this.githubWsService.updatePullRequest(params.numberOfPullRequest, updatePullRemoteDTO);
        res.status(HttpStatus.OK).json(data);
    }
}
