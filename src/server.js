const express = require('express');
const bodyParser = require('body-parser');
const { lerArquivoJSON, criarGrafo, BFS, BFS6 } = require('./grafo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota para buscar relacionamento mais próximo
app.post('/buscar-relacionamento', (req, res) => {
    const { atorOrigem, atorDestino } = req.body;
    const filmes = lerArquivoJSON('./data/latest_movies.json');
    const grafo = criarGrafo(filmes);
    const caminho = BFS(grafo, atorOrigem, atorDestino);

    if (caminho) {
        res.send(`Relacionamento encontrado: ${caminho.join(' -> ')}`);
    } else {
        res.send('Relacionamento não encontrado.');
    }
});

app.post('/buscar-relacionamento-bsf6', (req, res) => {
    const filmes = lerArquivoJSON('./data/latest_movies.json');
    const grafo = criarGrafo(filmes);
    const { atorOrigem, atorDestino } = req.body;
    const caminhos = BFS6(grafo, atorOrigem, atorDestino);

    if (caminhos) {
        const resultadosFormatados = [];

        caminhos.forEach((caminho, index) => {
            let comprimento = caminho.length - 1;
            let caminhoFormatado = caminho.join(" ➯ ");
            resultadosFormatados.push(`<p><strong>Caminho ${index + 1}:</strong> ${caminhoFormatado}. <strong>Comprimento: ${comprimento}</strong></p>`);
        });

        res.send(resultadosFormatados.join(''));
    } else {
        res.send('Relacionamento não encontrado.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
