export class CreatePullLocalDTO {
    externalId?: number;
    numberOfPull?: number;
    author?: string;
    title?: string;
    body?: string;
    state?: string;
    closeAt?: Date;
    mergedAt?: Date;
}