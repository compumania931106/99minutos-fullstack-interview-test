import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pull } from './interfaces/pull.interface';

import { CreatePullLocalDTO } from './dto/create-pull-local.dto';
import { UpdatePullLocalDTO } from './dto/update-pull-local.dto';

@Injectable()
export class PullsService {

    constructor(@InjectModel('Pull') private readonly pullModel: Model<Pull>) { }

    async getPulls(): Promise<Pull[]> {
        const pulls = await this.pullModel.find().sort({numberOfPull: -1}).exec();
        return pulls;
    }

    async getPullByExternalId(externalId: number): Promise<Pull> {
        const pull = await this.pullModel.findOne({ externalId });
        return pull;
    }

    async createPull(createPullLocalDTO: CreatePullLocalDTO): Promise<Pull> {
        const createdPull = new this.pullModel(createPullLocalDTO);
        return await createdPull.save();
    }

    async updatePull(internalId: number, updatePullLocalDTO: UpdatePullLocalDTO): Promise<Pull> {
        const updatedPull = await this.pullModel.findOneAndUpdate({ internalId }, updatePullLocalDTO, { new: true }).exec();
        return updatedPull;
    }

}
