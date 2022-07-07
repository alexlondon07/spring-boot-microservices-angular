import { Generic } from './Generic';

export class Student implements Generic{
    id: number;
    name: string;
    lastName: string;
    email:string;
    image:File;
    createdAt: string;
}
