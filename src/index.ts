import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const Person = require('./models/persons');
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (req: any, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/people', (req: Request, res: Response) => {
  Person.find({}).then((result: any) => {
    console.log(result.length);
    res.json(result);
  });
});

app.get('/info', (req: Request, res: Response) => {
  const date: Date = new Date();

  Person.countDocuments({}).then((result: any) => {
    res.send(
      'Phonebook has info for ' +
        result +
        ' people' +
        '<br/>' +
        date.toUTCString()
    );
  });
});

app.get('/people/:id', (req: Request, res: Response, next: NextFunction) => {
  Person.findById(req.params.id)
    .then((person: any) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error: any) => next(error));
});

app.delete('/people/:id', (req: Request, res: Response, next: NextFunction) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result: any) => {
      res.status(204).end();
    })
    .catch((error: any) => next(error));
});

app.post('/people', (req: Request, res: Response) => {
  const person = req.body;
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });

  newPerson.save().then((savedPerson: any) => {
    res.json(savedPerson);
  });
});

const errorHandler = (error: any, request: any, response: any, next: any) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
