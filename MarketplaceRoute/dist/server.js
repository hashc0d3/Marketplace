"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware для обработки JSON
app.use(body_parser_1.default.json());
// REST API: простой endpoint
app.post('/api/hello', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    res.json({ message: `Hello, ${name}!` });
});
// Запуск REST API сервера
app.listen(PORT, () => {
    console.log(`REST API server running on http://localhost:${PORT}`);
});
