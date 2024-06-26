const { hostname } = require('os');

var express = require('express'),
path=require('path'),
bodyParser = require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),
pg = require('pg'),
app = express();

const config = {
    host:'enter db location or rds link',
    user: 'db username',
    database: 'database name',
    password: 'db password',
    port: 5432                  //Default port, change it if needed
};

//DB Connect String
//var connect = "postgres://recipeadmin:password@localhost/recipebookdb";

//Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

//Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')))

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM cars', function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.render('index', {cars: result.rows})
            done();
       })
   })
});

//server
app.listen(3000, function() {
    console.log('server started on port 3000');
});