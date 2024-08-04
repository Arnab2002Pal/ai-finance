"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Express application
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use((0, cors_1.default)()); // Enable CORS for all origins
// Example GET endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Example POST endpoint
app.post('/session', (req, res) => {
    const { data } = req.body;
    console.log(data);
    res.send('Hello, World!');
});
// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
