const express = require('express');
const PORT = process.env.PORT || 3000;
const router = require('./routers');

const app = express();
app.use(router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
