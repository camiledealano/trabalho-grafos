const fs = require('fs');

// Função para ler o arquivo JSON e retornar os dados
function lerArquivoJSON(nomeArquivo) {
    const dados = fs.readFileSync(nomeArquivo);
    return JSON.parse(dados);
}

// Função para criar o grafo a partir dos dados do arquivo JSON
function criarGrafo(filmes) {
    const grafo = {};

    filmes.forEach(filme => {
        // Adiciona vértices para cada filme
        grafo[filme.title] = [];

        filme.cast.forEach(ator => {
            // Adiciona arestas entre cada filme e ator
            if (!grafo[ator]) {
                grafo[ator] = [];
            }
            grafo[ator].push(filme.title); // Adiciona o título do filme como vizinho do ator
            grafo[filme.title].push(ator); // Adiciona o ator como vizinho do filme
        });
    });

    return grafo;
}


// Algoritmo BFS para encontrar o relacionamento mais próximo entre dois atores
function BFS(grafo, origem, destino) {
    if (!grafo[origem] || !grafo[destino]) {
        return null; // Origem ou destino não existem no grafo
    }

    const visitados = new Set();
    const fila = [[origem]];

    while (fila.length) {
        const caminho = fila.shift();
        const vertice = caminho[caminho.length - 1];

        if (vertice === destino) {
            return caminho;
        }

        if (!visitados.has(vertice)) {
            visitados.add(vertice);

            if (grafo[vertice]) { // Verifica se o vértice existe no grafo
                for (const vizinho of grafo[vertice]) {
                    fila.push([...caminho, vizinho]);
                }
            }
        }
    }

    return null; // Relacionamento não encontrado
}


module.exports = { lerArquivoJSON, criarGrafo, BFS };
