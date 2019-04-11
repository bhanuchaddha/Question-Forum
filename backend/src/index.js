// body-parser: This is a library that you will use to convert the body of incoming requests into JSON objects.
// cors: This is a library that you will use to configure Express to add headers stating that your API accepts requests coming from other origins. This is also known as Cross-Origin Resource Sharing (CORS).
// express: This is Express itself.
// helmet: This is a library that helps to secure Express apps with various HTTP headers.
// morgan: This is a library that adds some logging capabilities to your Express app.



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authentication = require('./authentication');

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all questions
app.get('/', authentication.checkToken, (req, res) => {
    const qs = questions.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers.length,
    }));
    res.send(qs);
});

// get a specific question
app.get('/:id', authentication.checkToken, (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    res.send(question[0]);
});

// insert a new question
app.post('/', authentication.checkToken, (req, res) => {
    const { title, description } = req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
    };
    questions.push(newQuestion);
    res.status(200).send();
});

//update question
app.patch('/:id', authentication.checkToken, (req, res) => {
    const index = questions.findIndex(q => q.id === parseInt(req.params.id))
    console.log(index);
    console.log(questions);
    if (index === -1) return res.status(404).send();
    const { title, description } = req.body;
    questions[index].title = title;
    questions[index].description = description;
    res.status(200).send();
});

// insert a new answer to a question
app.post('/answer/:id', authentication.checkToken, (req, res) => {
    const { answer } = req.body;
    console.log('submitted answer ' + answer)
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer,
    });

    res.status(200).send();
});

app.post('/login', authentication.login);

// start the server
app.listen(8081, () => {
    console.log('listening on port 8081');
});