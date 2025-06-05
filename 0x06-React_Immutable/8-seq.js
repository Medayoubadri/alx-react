import { Seq } from 'immutable';

export default function printBestStudents(grades) {
  const result = Seq(grades)
    .filter((student) => student.score >= 70)
    .map((student) => ({
      ...student,
      firstName:
        student.firstName.charAt(0).toUpperCase() + student.firstName.slice(1),
      lastName:
        student.lastName.charAt(0).toUpperCase() + student.lastName.slice(1),
    }))
    .entrySeq()
    .toArray()
    .reduce((acc, [key, student]) => {
      acc[key] = student;
      return acc;
    }, {});

  console.log(result);
}
