require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index.js');
const errorMiddleware = require('./middlewares/error-middleware.js');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(cookieParser());
app.use(express.json())

app.use("/api", router)
app.use(errorMiddleware);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start();

