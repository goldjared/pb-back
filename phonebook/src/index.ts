import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.json());

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
app.post("/api/person/:name", (req: Request, res: Response) => {
  const name = req.body.name; 
  const notesLastId: number = notes[notes.length-1].id;
  const serialId: string = randomVal(100) + "-" + randomVal(100) + "-" + randomVal(1000000);

  const newPerson = {
    id: notesLastId,
    name,
    number: serialId
  }
  console.log(notes.length)
  notes.push(newPerson);  
  console.log(notes.length)
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
