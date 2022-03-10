import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './apiRoutes';

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRoutes);

app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'No hay nada por aquí',
    })
});

const APP_PORT = process.env.APP_PORT ?? 3000;
app.listen(APP_PORT, () => {
    console.log('Escuchando en el puerto', APP_PORT);
});
