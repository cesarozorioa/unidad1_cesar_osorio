const http = require('http');
const fs = require('fs');

const PORT = 3000;

// Cargar el archivo pokedex.json
const pokedexData = fs.readFileSync('pokedex.json');
const pokedex = JSON.parse(pokedexData);

const server = http.createServer((req, res) => {
    // Obtener el nombre o id del Pokemon de la URL
    const urlParams = req.url.split('/');
    const param = urlParams[1];

    // Buscar el Pokemon por nombre o id
    let pokemon = pokedex.find(p => p.id === parseInt(param) || Object.values(p.name).includes(param));

    if (pokemon) {
        // Si se encuentra el Pokemon, enviar su información
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Nombre: ${pokemon.name.english}\n`);
        res.write(`Tipo: [${pokemon.type.join(', ')}]\n`);
        res.write(`HP: ${pokemon.base.HP}\n`);
        res.write(`Attack: ${pokemon.base.Attack}\n`);
        res.write(`Defense: ${pokemon.base.Defense}\n`);
        res.write(`Sp. Attack: ${pokemon.base["Sp. Attack"]}\n`);
        res.write(`Sp. Defense: ${pokemon.base["Sp. Defense"]}\n`);
        res.write(`Speed: ${pokemon.base.Speed}`);
    } else {
        // Si no se encuentra el Pokemon, enviar un mensaje de error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Pokemon no encontrado');
    }
    res.end();
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});