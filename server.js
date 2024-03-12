// Require Express, Fs, and UUID
const express = require('express');
const fs = require('fs');
const { METHODS } = require('http');
const uuid = require('uuid');
// Create app and port
const app = express();
const PORT = 3001;
// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// Create routes for HTML

app.get('/notes', (req,res) =>{
    res.sendFile(__dirname + ' notes.html');
});

app.get('*', (req, res) =>{
    res.sendFile(__dirname + ' index.html');
})

// Create API routes

app.get("/api/notes", (req,res) =>{
    fs.readFile('db.json', 'utf8', (err, data) =>{
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});
//  app.post this is reading the file db.json parsing the data of notes and new note inside of it with writeFile
app.post('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) =>{
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body
        newNote.id = uuidv4();
        notes.push(newNote);
        fs.writeFile('db.json', JSON.stringify(notes), (err) =>{
            if (err) throw err;
            res.json(newNote);
        });
    });
});
// Create delete function with specific id

// Create server start
app.listen(PORT, () => console.log(`App Listening on http://localhost:${PORT}`));