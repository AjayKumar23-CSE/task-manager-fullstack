const express = require('express');
const cors = require('cors');
const router = require('./route')
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());



app.use('/api/tasks',router);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
