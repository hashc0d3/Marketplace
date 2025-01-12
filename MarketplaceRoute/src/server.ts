import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors()); // Разрешаем CORS

app.get('/api/catalog', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/api/catalog');
        res.json(response.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching data from third microservice:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Получение информации по конкретному индексу
app.get('/api/catalog/:index', async (req, res) => {
    const { index } = req.params; // Получаем индекс из параметров URL
    try {
        const response = await axios.get(`http://localhost:4000/api/catalog/${index}`); // Запрос к другому микросервису с использованием индекса
        res.json(response.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching data from third microservice:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
