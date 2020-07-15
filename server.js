// Installer un serveur express
const express = require ('express');
const path = require ('path');
const app = express ();

// Ne sert que les fichiers statiques du répertoire dist
app.use (express.static ('./dist/miage-app'));

app.get ('/ *', function (req, res) {
    res.sendFile('index.html', {root:'dist/miage-app/'});
});

// Démarrez l'application en écoutant sur le port Heroku par défaut
app.listen (process.env.PORT || 8080);