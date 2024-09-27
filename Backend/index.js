import express from 'express';
import connectDB from './config/config.js';
import User_routes from './routes.js/User_Routes.js';
import bodyParser from 'body-parser';
import Transaction_routes from './routes.js/Transaction_Routes.js';

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/api', User_routes);
app.use('/api', Transaction_routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});