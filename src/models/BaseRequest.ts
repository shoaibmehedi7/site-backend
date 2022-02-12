import { IsNotEmpty } from 'class-validator';

export class BaseRequest {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    userName: string;

    limit: string;

    pageId: string;

}