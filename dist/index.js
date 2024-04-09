"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
morgan_1.default.token('body', (req, res) => JSON.stringify(req.body));
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
let people = [
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
app.get('/', (req, res) => {
    res.send('PB Server 001');
});
app.get('/people', (req, res) => {
    res.json(people);
});
app.get('/info', (req, res) => {
    const date = new Date();
    res.send('Phonebook has info for ' +
        people.length +
        ' people' +
        '<br/>' +
        date.toUTCString());
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
    const id = Number(request.params.id);
    people = people.filter((person) => person.id !== id);
    console.log(people.length);
    response.status(204).end();
});
app.post('/people', (req, res) => {
    const person = req.body;
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'content missing',
        });
    }
    const name = person.name;
    // id is incr by 1 of last id val, or if list empty id is 1
    const id = people.length > 0 ? people[people.length - 1].id + 1 : 1;
    const number = person.number;
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
