import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(bodyParser.json());

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
