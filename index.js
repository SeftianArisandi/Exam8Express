const express = require('express');
const cors = require('cors');
const client = require('./connection');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES TO USE
const usersRouter = require('./routes/users');

app.use(usersRouter);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))  
