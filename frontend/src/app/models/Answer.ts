import { Student } from './Student';
import { Question } from './Question';
export class Answer {
    id: string;
    text: string;
    student: Student;
    question: Question;
}
