import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.json());

const notes = [
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

app.get("/api/notes/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const note = notes.find(note => note.id === id);
  if(note) {    
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post("/api/notes", (req: Request, res: Response) => {
  const note = req.body; 
  console.log(note);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
