import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    const data = ['This is the list of our students'];
    readDatabase(process.argv[2]).then((val) => {
      for (const [field, list] of Object.entries(val)) {
        data.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      response.status(200).end(data.join('\n'));
    }).catch(() => {
      response.status(500);
      response.end('Cannot load the database');
    });
  }

  static getAllStudentsByMajor(request, response) {
    const data = request.params.major;
    readDatabase(process.argv[2]).then((val) => {
      response.status(200);
      response.send(`List: ${val[data].join(', ')}`);
    }).catch(() => {
      response.status(500);
      if (data !== 'CS' || data !== 'SWE') {
        response.send('Major parameter must be CS or SWE');
      }
      response.send('Cannot load the database');
    });
  }
}
