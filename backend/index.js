const express = require('express');
const cors=require('cors');
const { getData } = require('./controller/fetchData');

const app = express();

require('dotenv').config();

app.use(cors())
app.get('/api/:location', async (req, res) => {
    let { location } = req.params;
    try {
        const data = await getData({ location })
        console.log({ data });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ message: error.message });

    }
})

app.listen(3000, () => {
    console.log("Running on port 3000")
})