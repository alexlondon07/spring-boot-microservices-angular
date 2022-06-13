import { Student } from './Student';
import { Exam } from './Exam';

export class Course {

    id: number;
    name: string;
    description: string;
    createdAt: string;
    students: Student[] = [];
    exams: Exam[] = [];
}
