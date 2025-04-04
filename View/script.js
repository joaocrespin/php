function exibirTabela(dados) {
    // Função para exibir os dados na tabela
    const tabelaBody = document.querySelector("#tabela tbody");

    while (tabelaBody.firstChild) {
        tabelaBody.removeChild(tabelaBody.firstChild);
    }

    dados.forEach(item => {
        const linha = document.createElement("tr");
        linha.setAttribute("data-id", item.id); // Define o ID da linha

        // Cria células para cada propriedade
        const celulaDescricao = document.createElement("td");
        celulaDescricao.textContent = item.descricao;
        linha.appendChild(celulaDescricao);

        const celulaCategoria = document.createElement("td");
        celulaCategoria.textContent = item.categoria;
        linha.appendChild(celulaCategoria);

        const celulaData = document.createElement("td");
        celulaData.textContent = item.data;
        linha.appendChild(celulaData);

        const celulaValor = document.createElement("td");
        celulaValor.textContent = item.valor;
        linha.appendChild(celulaValor);

        const celulaExcluir = document.createElement("td");
        celulaExcluir.className = "celulaExcluir";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "botaoExcluir";

        // Adicionando um ícone como imagem
        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "./icons/trash.png"; // Caminho do ícone
        iconeExcluir.alt = "Excluir";
        iconeExcluir.style.width = "20px";
        botaoExcluir.appendChild(iconeExcluir);

        // Adicionando o evento click
        botaoExcluir.addEventListener("click", async function () {
            const linha = botaoExcluir.parentNode.parentNode;
            const id = linha.getAttribute("data-id"); // Obtém o ID da linha
            console.log(`Excluindo o item com ID: ${id}`);

            // Chamar o controller via API (por exemplo, usando Fetch)
            try {
                const response = await fetch(`../controller/delete.php/${id}`, { // URL do seu endpoint
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Item deletado com sucesso!');
                    linha.parentNode.removeChild(linha); // Remove a linha da tabela
                } else {
                    console.error('Erro ao deletar o item:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
            }
        });

        celulaExcluir.appendChild(botaoExcluir);
        linha.appendChild(celulaExcluir);

        tabelaBody.appendChild(linha);
    });
};




//Select boxes da data
// Referências aos elementos <select>
const diaSelect = document.getElementById("dia");
const mesSelect = document.getElementById("mes");
const anoSelect = document.getElementById("ano");

// Função para calcular os dias de um mês específico
function calcularDias(mes, ano) {
    // Meses com 31 dias
    const mesesCom31Dias = [1, 3, 5, 7, 8, 10, 12];
    // Meses com 30 dias
    const mesesCom30Dias = [4, 6, 9, 11];

    if (mesesCom31Dias.includes(mes)) {
        return 31;
    } else if (mesesCom30Dias.includes(mes)) {
        return 30;
    } else if (mes === 2) { // Fevereiro
        // Verifica se é ano bissexto
        return (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28;
    }
}

// Preencher os meses (1 a 12)
for (let i = 1; i <= 12; i++) {
    const opcao = document.createElement("option");
    opcao.value = i;
    opcao.textContent = i;
    mesSelect.appendChild(opcao);
}

// Preencher os anos (1900 a 2025, por exemplo)
const ano = new Date().getFullYear();
for (let i = 2023; i <= ano + 1; i++) {
    const opcao = document.createElement("option");
    opcao.value = i;
    opcao.textContent = i;
    anoSelect.appendChild(opcao);
}

// Atualizar os dias com base no mês e ano selecionados
function atualizarDias() {
    const mesSelecionado = parseInt(mesSelect.value);
    const anoSelecionado = parseInt(anoSelect.value);
    const diaSelecionado = parseInt(diaSelect.value); // Dia atual selecionado

    // Calcula os dias do mês selecionado
    const diasNoMes = calcularDias(mesSelecionado, anoSelecionado);

    // Limpa os dias existentes
    diaSelect.innerHTML = '';

    // Popula os dias novamente
    for (let i = 1; i <= diasNoMes; i++) {
        const opcao = document.createElement("option");
        opcao.value = i;
        opcao.textContent = i;
        diaSelect.appendChild(opcao);
    }

    // Mantém o dia selecionado, se ainda válido
    if (diaSelecionado <= diasNoMes) {
        diaSelect.value = diaSelecionado;
    } else {
        // Se o dia não for válido, ajusta para o último dia do mês
        diaSelect.value = diasNoMes;
    }
}

// Adiciona eventos para atualizar os dias quando o mês ou ano forem alterados
mesSelect.addEventListener("change", atualizarDias);
anoSelect.addEventListener("change", atualizarDias);

const hoje = new Date();
const diaAtual = hoje.getDate(); // Dia atual
const mesAtual = hoje.getMonth() + 1; // Mês atual (0-11, por isso adicionamos +1)
const anoAtual = hoje.getFullYear(); // Ano atual

// Define o valor padrão selecionado no combobox de anos
anoSelect.value = anoAtual;

// Define o valor padrão selecionado no combobox de meses
mesSelect.value = mesAtual;

atualizarDias();

// Define o valor padrão selecionado no combobox de dias
diaSelect.value = diaAtual;


// Atualizar tabela
function atualizarTabela() {
    fetch('../controller/listar.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        exibirTabela(data)
    })
    .catch(error => {
        console.error('Erro ao chamar o controller:', error);
    });
};
