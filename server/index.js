const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index.js');
const connection = require('./queries.js');
const utils = require('./utils.js');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.use("/api", router)

app.use(cors({
    origin: 'http://localhost:3000'
}));


connection.query('SELECT * FROM sheets', function(err, rows, fields) {
  if (err) throw err;
  console.log('The count of sheets rows is: ', rows.rowCount);
});
  
    /*console.log("plmap:", pl.map(elem => Object.values(elem)).flat(1));
    console.log("preparevalues :", utils.prepareSqlKeys(pl, 5));
    connection.query(`INSERT INTO posts(title, descr, img, likes, date) VALUES ${utils.prepareSqlKeys(pl, 5)}`,
    pl.map(elem => Object.values(elem)).flat(1),
    function(err, rows) {
    if (err) throw err;
    console.log('Done: ', rows);
  })*/


const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

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

start();
