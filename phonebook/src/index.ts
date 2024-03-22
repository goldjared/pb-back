import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();
const port = 3000;

app.use(express.json());

morgan.token('body', (req: any, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/notes", (req: Request, res: Response) => {
    res.json(notes);
});

app.get("/info", (req: Request, res: Response) => {
  const date: Date = new Date();
   res.send("Phonebook has info for " + notes.length + " people" + "<br/>" + date.toUTCString());
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

app.delete('/api/notes/:id', (request, response) => {
  console.log(notes.length)
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  console.log(notes.length)

  response.status(204).end()
})

const randomVal = (max: number): number => {
  return Math.floor(Math.random() * max);
}

app.post("/api/person", (req: Request, res: Response) => {
  const person = req.body; 
  if (!person.name || !person.id) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const name = person.name;
  const id = person.id;
  const serialId: string = randomVal(100) + "-" + randomVal(100) + "-" + randomVal(1000000);

  const newPerson = {
    id,
    name,
    number: serialId
  }
  notes.push(newPerson);  
  res.json(newPerson);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

