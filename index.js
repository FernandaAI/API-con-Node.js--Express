const express = require('express');
const app = express();
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "Tengo que estudiar el Bootcamp FullStacks",
        date: "2019-05-30T17:30:31.098Z",
        important: false
    },
    {
        id: 2,
        content: "Tengo base de datos",
        date: "2019-05-30T18:39:34.091Z",
        important: true
    },
    {
        id: 3,
        content: "Tengo que hacer ejercicios",
        date: "2019-05-30T18:20:14.298Z",
        important: true
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
    response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
    const note = request.body;
    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        });
    }
    const ids = notes.map(note => note.id); // Acceder al campo "id" en lugar de "ids"
    const maxId = Math.max(...ids);
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    };
    notes = [...notes, newNote];
    response.json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
