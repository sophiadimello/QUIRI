// Seleciona o formulário de login
const formularioLogin = document.getElementById("formLogin");

// Seleciona o local onde mostraremos as mensagens
const mensagemLogin = document.getElementById("mensagemLogin");

// Identifica quando o formulário de login for enviado
formularioLogin.addEventListener("submit", async function (evento) {

    // Impede que a página seja recarregada
    evento.preventDefault();

    // Pega o e-mail digitado
    const email = document.getElementById("email").value;

    // Pega a senha digitada
    const senha = document.getElementById("senha").value;

    // Organiza os dados do login
    const dados = {
        email,
        senha
    };

    try {

        // Envia os dados para o backend
        const resposta = await fetch("/api/nutricionista/login", {
            method: "POST",

            // Informa que estamos enviando JSON
            headers: {
                "Content-Type": "application/json"
            },

            // Transforma os dados em JSON
            body: JSON.stringify(dados)
        });

        // Recebe a resposta do backend
        const resultado = await resposta.json();

        // Mostra a resposta no console
        console.log("Resposta do login:", resultado);

        // Mostra a mensagem na tela
        mensagemLogin.textContent = resultado.mensagem;

    } catch (erro) {

        // Mostra o erro no console
        console.error("Erro ao fazer login:", erro);

        // Mostra uma mensagem para o usuário
        mensagemLogin.textContent = "Erro ao conectar com o servidor.";
    }
});