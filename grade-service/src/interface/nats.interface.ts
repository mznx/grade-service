/** Информация о студенте */
export interface StudentInfo {
    personalCode: string;
    name: string;
    lastName: string;
}

/** Информация о полученной студентом оценке */
export interface StudentGrade {
    personalCode: string;
    grade: number;
    subject: string;
}
