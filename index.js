const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const db = require('./models');

const app = express();


//config Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);

const Port = process.env.Port || 3001;

//Router
const bookedRouter = require('./routes/Booked');
app.use('/booked',bookedRouter);

const contactRouter = require('./routes/Contacts');
app.use('/contact',contactRouter);

const userRouter = require('./routes/User');
app.use('/user',userRouter);

db.sequelize.sync().then(()=>{
    app.listen(Port, ()=>{
        console.log("running on port http://localhost:3001")
    });
});

