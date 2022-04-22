const dotenv = require("dotenv");
const result = dotenv.config();
const express = require("express");
const Thing = require('./models/Thing');
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const path = require("path")
app.use((req, res, next) => {                                                                  // permet de donner les acces a tout le monde
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.nxkzj.mongodb.net/project0?retryWrites=true&w=majority`, 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))           // si la connexion est reussi
  .catch(() => console.log('Connexion à MongoDB échouée !'));         // si la connexion a echouer
  module.exports = mongoose;

  app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended: true }));
  app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.use('/api/sauces', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });
const userRoutes = require('./routes/user');            
app.use('/api/auth', userRoutes);


module.exports = app;