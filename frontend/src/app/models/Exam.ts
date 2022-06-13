import { Question } from './Question';
import { Subject } from './Subject';

export class Exam {
    id: number;
    name: string;
    createdAt: string;
    questions: Question[] = [];
    subject: Subject;
    replied: boolean;
}
