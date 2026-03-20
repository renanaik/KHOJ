const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/items',       require('./routes/itemRoutes'));
app.use('/api/communities', require('./routes/communityRoutes'));
app.use('/api/claims',      require('./routes/claimRoutes'));

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);