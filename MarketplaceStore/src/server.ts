import express from 'express';


const app = express();

const catalog = [
    { title: 'Product A', description: 'Description A', price: 150 , fullDescription: 'ALONG' },
    { title: 'Product B', description: 'Description B', price: 250 , fullDescription: 'ALONG'},
    { title: 'Product C', description: 'Description C', price: 400 , fullDescription: 'ALONG'},
]

// Эндпоинт для возврата данных
app.get('/api/catalog', (req, res) => {
    res.json(catalog);
});

// Эндпоинт для возврата данных
app.get('/api/catalog/:index', (req, res) => {

    const indexItem = parseInt(req.params.index, 10);

    const catalogItem = catalog.find((catalogItem, index) => index === indexItem)

    res.json(catalogItem);
});


// Запуск сервера
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Data service is running on http://localhost:${PORT}`);
});

