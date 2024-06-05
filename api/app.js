const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import router
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/teacherRoute')
dotenv.config();


const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes); // Use router

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
const port = 3002;
app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));
