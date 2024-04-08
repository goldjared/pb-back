import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

morgan.token('body', (req: any, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

interface Person {
  id: number;
  name: string;
  number: string;
}

let people: Person[] = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (req: Request, res: Response) => {
  res.send('PB Server 001');
});

app.get('/people', (req: Request, res: Response) => {
  res.json(people);
});

app.get('/info', (req: Request, res: Response) => {
  const date: Date = new Date();
  res.send(
    'Phonebook has info for ' +
      people.length +
      ' people' +
      '<br/>' +
      date.toUTCString()
  );
});

// app.get("/api/notes/:id", (req: Request, res: Response) => {
//   const id: number = Number(req.params.id);
//   const note = notes.find(note => note.id === id);
//   if(note) {
//     res.json(note);
//   } else {
//     res.status(404).end();
//   }
// });

app.delete('/people/:id', (request, response) => {
  console.log(people.length);
  const id: number = Number(request.params.id);
  people = people.filter((person) => person.id !== id);
  console.log(people.length);

  response.status(204).end();
});

app.post('/people', (req: Request, res: Response) => {
  const person = req.body;
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  const name = person.name;
  // id is incr by 1 of last id val, or if list empty id is 1
  const id = people.length > 0 ? people[people.length - 1].id + 1 : 1;
  const number: string = person.number;
  const newPerson = {
    id,
    name,
    number,
  };
  people.push(newPerson);
  res.json(newPerson);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
