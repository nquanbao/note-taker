const fs  = require ('fs');
const express = require ('express');
const path = require ('path')
const db = require ('./db/db.json');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})
app.get('/api/notes', (req, res) => {
    res.json (db);
})
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text
        };
        db.push(newNote)
        const NoteString = JSON.stringify(db)
        fs.writeFile(`./db/db.json`, NoteString, (err) => {
            err? console.error(err):console.log ('New noted added')
        });
        const response = {
            status: 'success',
            body: newNote,
          };
      
          console.log(response);
          res.status(201).json(response);
    }else{
        res.status(500).json('Error in posting review');
    }
})
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);