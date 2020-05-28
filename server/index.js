const express = require('express');
const app = express();

const Block = require('./Components/Block');
console.log(Block.genesis());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.listen(5000, () => console.log('Server Started on port 5000'));
