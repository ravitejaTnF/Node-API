const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = require('./router');
const PORT = 2000;
const url = 'mongodb+srv://user2:user2@ravicluster.8czoq5w.mongodb.net/?retryWrites=true&w=majority';
app.use(express.json());
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error, client) => {
        if (error) {
            console.log('Database connection failed' + error);
        } else {
            console.log('Database connected successfully..!');
        }
    }
)
app.use(router);
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
