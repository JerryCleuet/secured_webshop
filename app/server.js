const express = require("express");


const app = express();
const userRoute = require('./routes/User');
const loginRoute = require('./routes/login');
app.use('/user', userRoute);
app.use('/login', loginRoute);



// Démarrage du serveur
app.listen(8080, () => {
    console.log('Server running on port 8080');
});