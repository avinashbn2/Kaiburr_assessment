import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Update the path to your JSON file accordingly
const dataPath = path.join(__dirname, 'data.json');
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const app = express();
app.use(cors())

app.get('/api/data', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < jsonData.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    results.total = jsonData.length
    results.results = jsonData.slice(startIndex, endIndex);
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
