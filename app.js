const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/stats', require('./routes/stats'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
