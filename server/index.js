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

/*
app.use((err, req, res, next) => { //json bad format safety response
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(utils.HttpCodes.badRequest).send({
            status: utils.HttpCodes.badRequest,
            message: err.message 
        }); // Bad request
    }
    next();
});*/

/*
connection.query('SELECT * FROM sheets', function(err, rows, fields) {
  if (err) throw err;
  console.log('The count of sheets rows is: ', rows.rowCount);
});*/
  
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

const today = dayjs().day(8);
//console.log(`На этой неделе ${utils.days[0]}:`, atCurWeek(1, today).format('DD.MM.YYYY'));
//console.log(`Сегодня ${utils.days[(today.day()+6)%7]}`, today.format('DD.MM.YYYY'));
for(var i = 1; i <= 7; i++) console.log(`На этой неделе ${utils.days[i-1]}:`, atCurWeek(i, today).format('DD.MM.YYYY'));
//for(var i = 1; i <= 7; i++) console.log(`На следующей неделе ${utils.days[i-1]}:`, atNextWeek(i, today).format('DD.MM.YYYY'));
//for(var i = 1; i <= 7; i++) console.log(`На предыдущей неделе ${utils.days[i-1]}:`, atPrevWeek(i, today).format('DD.MM.YYYY'));
//for(var i = 1; i <= 7; i++) console.log(`Следующий ${utils.days[i-1]}:`, nextDay(i, today).format('DD.MM.YYYY'));
//for(var i = 1; i <= 7; i++) console.log(`Ближайший ${utils.days[i-1]}:`, closestDay(i, today).format('DD.MM.YYYY'));

//console.log(`На прошлой неделе ${utils.days[0]}:`, atNextWeek(-1, today).format('DD.MM.YYYY'));

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
  })

start();

