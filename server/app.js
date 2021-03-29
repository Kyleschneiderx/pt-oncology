const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const graphqlHttp = require('express-graphql').graphqlHTTP

const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')

const auth = require('./middleware/auth')

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json())// application/json


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,  Set-Cookie, Cookie');
  if(req.method === "OPTIONS"){
    return res.sendStatus(200)
  }
  next();
});

app.use(auth);



app.use('/graphql', cookieParser(),cors({origin: "http://localhost:3000", credentials:"same-origin", withCredentials:true}), graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  customFormatErrorFn(err){
    if(!err.originalError){
      throw err
    }
    const data = err.originalError.data || "An error occurred"
    const message = err.message
    const code = err.originalError.code || 500
    return{message: message, status:code, data: data}
  }
}))

app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema,
    context: { req, res },
  })(req, res);
});

// app.use(cors({origin: "http://localhost:3000", credentials:true}))
// app.use(cookieParser())

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  
});

const port = process.env.PORT || 8080

mongoose
  .connect(
    'mongodb+srv://kyleschneider:H3ABMHGEu2zUfqsu@cluster0.1p3nw.mongodb.net/pt-oncology?retryWrites=true&w=majority')
  .then(result => {
    app.listen(port);
  })
  .catch(err => console.log(err));
