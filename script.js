window.addEventListener("DOMContentLoaded", () => carregarUsuarios())

function calcular(event) {
    event.preventDefault()

    console.log("Foi executada a função calcular")

    let usuario = receberValores()

    let idadecalculada = calcularIdade(usuario.ano, usuario.mes)

    let classificacaoidade = classificaridade(idadecalculada)

    console.log(classificacaoidade)

    usuario = organizarDados(usuario, idadecalculada, classificacaoidade)

    cadastrarUsuario(usuario)

    window.location.reload()

}

function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let diaRecebida = document.getElementById("dia-nascimento").value
    let mesRecebido = document.getElementById("mes-nascimento").value
    let anoRecebido = document.getElementById("ano-nascimento").value

    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaRecebida,
        mes: mesRecebido,
        ano: anoRecebido,
    }

    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularIdade(ano, mes) {
    let dataatual = new Date ()

    let anoatual = dataatual.getFullYear()
    let idade = anoatual - ano

    let mesatual = dataatual.getMonth()

    if (mesatual < mes){
        idade--
    }

    console.log(idade)

    return idade
}

function classificaridade(idade) {
    if (idade < 12) {
        return "Crianca"
    } else if (idade >= 13 && idade < 17) {
        return "Adolescente"
    } else if (idade >= 18 && idade < 65) {
        return "Adulto"
    } else {
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, valoridade, classificacaoidade) {
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade: valoridade,
        situacaoidade: classificacaoidade,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    listaUsuarios.push(dadosUsuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

}

function carregarUsuarios() {
    let listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if (listaCarregada.length == 0) {
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado ☹️</td>
        </tr>`
    } else {
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())

function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += ` <tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="dia">${usuario.dia}</td>
        <td data-cell="mes">${usuario.mes}</td>
        <td data-cell="ano">${usuario.ano}</td>
        <td data-cell="idade">${usuario.idade}</td>
        <td data-cell="faixa etaria">${usuario.situacaoidade}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")

    window.location.reload()
}