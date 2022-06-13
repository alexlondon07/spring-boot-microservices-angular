import { Exam } from './Exam';
export class Question {
    id: number;
    text: string;
    exam: Exam[] = [];
}
