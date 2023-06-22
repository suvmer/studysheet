require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index.js');
const connection = require('./queries.js');
const {dayjs, utils} = require('./utils.js');
const { registration } = require('./service/user-service.js');
const errorMiddleware = require('./middlewares/error-middleware.js');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json())
//app.use(cors());
/*app.use(cors({
    origin: 'http://localhost:3000'
}));*/

//TODO: WHY credentials at index.js cors policy? HACK!
app.use("/api", router)
app.use(errorMiddleware);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}
/*
router.get('/get/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await connection.query('SELECT * FROM sheets WHERE id = $1', [id])
    res.send(rows[0])
  })
router.get('/getall', async (req, res) => {
    const { rows } = await connection.query('SELECT * FROM sheets')
    res.send(rows)
})
router.get('/add/:name/:creator/:info', async (req, res) => {
    const { name, creator, info } = req.params
    const { rows } = await connection.query('INSERT INTO sheets (name, creator, info) VALUES ($1, $2, $3)', [name, creator, info])
    res.send(rows)
})
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await connection.query('DELETE FROM sheets WHERE id = $1', [id])
    res.send(rows[0])
})
router.get('/users/add/:name/:email/:password/:info/', async (req, res) => {
    //const { name, email, password, info } = req.params
    res.send(await registration(...Object.values(req.params)))
  })*/

start();

