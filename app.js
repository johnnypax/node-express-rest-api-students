// Importare i pacchetti necessari
const express = require('express');
const bodyParser = require('body-parser');

// Creare l'app Express
const app = express();

// Configurare body-parser per analizzare i dati JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creare un array di utenti come semplice database
const students = [
    {
        id: 1,
        name: "Giovanni Pace",
        code: "AB1234"
    },
    {
        id: 2,
        name: "Mario Rossi",
        code: "AB125"
    },
    {
        id: 3,
        name: "Valeria Verdi",
        code: "AB1236"
    },
];

let studentIdCounter = 3;

app.get('/api/students', (req, res) => {
  res.json({
    status: 'success',
    data: students
  });
});

app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex((student) => student.id === id);

    if (index !== -1) {
        res.status(200).json({
            status: 'success',
            data: students[index]
        });
    } else {
        res.status(404).json({
            status: 'error', 
            message: 'Student not found' 
        });
    }
});

app.post('/api/students', (req, res) => {
  const student = req.body;
  student.id = studentIdCounter++; // Assegna un ID autoincrementale e incrementa il contatore
  students.push(student);
  res.status(201).json({
    status: 'success',
    data: student
  });
});

app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedStudent = req.body;
  const index = students.findIndex((student) => student.id === id);

  if (index !== -1) {
    students[index] = updatedStudent;
    res.status(200).json({
        status: 'success',
        data: updatedStudent
      });
  } else {
    res.status(404).json({
        status: 'error', 
        message: 'Student not found' 
    });
  }
});

app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((user) => user.id === id);

  if (index !== -1) {
    students.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ 
        status: 'error',
        message: 'Student not found' });
  }
});

// Avviare il server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
