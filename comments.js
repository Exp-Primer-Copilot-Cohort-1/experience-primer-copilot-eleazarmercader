// create web server
// 1. npm init -y
// 2. npm install express
// 3. node comments.js
// 4. http://localhost:3000
// 5. http://localhost:3000/comments
// 6. http://localhost:3000/comments/1
// 7. http://localhost:3000/comments/2
// 8. http://localhost:3000/comments/3
// 9. http://localhost:3000/comments/4
// 10. http://localhost:3000/comments/5

const express = require('express');
const app = express();
const port = 3000;

// 1. npm install cors
// 2. npm install body-parser
// 3. npm install nodemon --save-dev
// 4. npm install -g nodemon
// 5. npm install mongoose
// 6. npm install mongodb

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String
});

const Comment = mongoose.model('Comment', commentSchema);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/comments', (req, res) => {
    let comments = [
        {
            id: 1,
            name: 'John',
            email: '