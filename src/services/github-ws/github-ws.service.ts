import { Injectable, HttpService, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CreatePullRemoteDTO } from '../../apis/pulls/dto/create-pull-remote.dto';
import { UpdatePullRemoteDTO } from '../../apis/pulls/dto/update-pull-remote.dto';

@Injectable()
export class GithubWsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getAllBranches(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getAllBranches().subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    getBranchDetails(branchName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getBranchDetails(branchName).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    getCommitsByBranch(branchName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getCommitsByBranch(branchName).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    getCommitDetail(ref: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getCommitDetail(ref).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    getAllPulls(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getAllPulls().subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    compareTwoBranches(branchBase: string, branchHead: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._compareTwoBranches(branchBase, branchHead).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    createPullRequest(createPullRemoteDTO: CreatePullRemoteDTO): Promise<any> {
        return new Promise((resolve, reject) => {
            this._createPullRequest(createPullRemoteDTO).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    mergePullRequest(numberOfPullRequest: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._mergePullRequest(numberOfPullRequest).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }

    updatePullRequest(numberOfPullRequest: number, updatePullRemoteDTO: UpdatePullRemoteDTO): Promise<any> {
        return new Promise((resolve, reject) => {
            this._updatePullRequest(numberOfPullRequest, updatePullRemoteDTO).subscribe(res => {
                resolve(res.data);
            }, error => {
                console.log(error);
                reject(new InternalServerErrorException(error.response.data));
            });
        });
    }




    private _getAllBranches(): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/branches`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _getBranchDetails(branchName: string): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/branches/${branchName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _getCommitsByBranch(branchName: string): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/commits?sha=${branchName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _getCommitDetail(ref: string): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/commits/${ref}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _getAllPulls(): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/pulls?state=all`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _compareTwoBranches(branchBase: string, branchHead: string): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/compare/${branchBase}...${branchHead}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _createPullRequest(createPullRemoteDTO: CreatePullRemoteDTO): Observable<AxiosResponse<any>> {
        return this.httpService.post(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/pulls`,
            createPullRemoteDTO,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _mergePullRequest(numberOfPullRequest: number): Observable<AxiosResponse<any>> {
        return this.httpService.put(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/pulls/${numberOfPullRequest}/merge`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }

    private _updatePullRequest(numberOfPullRequest: number, updatePullRemoteDTO: UpdatePullRemoteDTO): Observable<AxiosResponse<any>> {
        return this.httpService.patch(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/pulls/${numberOfPullRequest}`,
            updatePullRemoteDTO,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`,
                    'Authorization': `Token ${process.env.GITHUB_KEY}`
                }
            }
        )
    }


}
