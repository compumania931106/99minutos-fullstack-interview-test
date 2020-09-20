import { Injectable, HttpService, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

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




    private _getAllBranches(): Observable<AxiosResponse<any>> {
        return this.httpService.get(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPOSITORY}/branches`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `${process.env.GITHUB_USERNAME}`
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
                    'User-Agent': `${process.env.GITHUB_USERNAME}`
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
                    'User-Agent': `${process.env.GITHUB_USERNAME}`
                }
            }
        )
    }


}
