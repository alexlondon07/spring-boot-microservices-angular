export class Subject {
    id: number;
    name: string;
    father: Subject;
    children: Subject[] = [];
}
