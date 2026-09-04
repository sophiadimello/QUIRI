// Formulário de cadastro do paciente
const formularioPaciente =
    document.getElementById("formCadastroPaciente");

// Mensagem geral
const mensagemPaciente =
    document.getElementById("mensagemPaciente");


// Quando o paciente clicar em Cadastrar
formularioPaciente.addEventListener("submit", function (evento) {

    // Impede o navegador de recarregar a página
    evento.preventDefault();

    // Pega os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Limpa mensagem anterior
    mensagemPaciente.textContent = "";

    // Verifica nome
    if (nome.length < 3) {
        mostrarErro("Digite seu nome completo.");
        document.getElementById("nome").focus();
        return;
    }

    // Verifica CPF
    if (cpf.length < 11) {
        mostrarErro("Digite um CPF válido.");
        document.getElementById("cpf").focus();
        return;
    }

    // Verifica telefone
    if (telefone.length < 8) {
        mostrarErro("Digite um telefone válido.");
        document.getElementById("telefone").focus();
        return;
    }

    // Verifica e-mail
    if (!email.includes("@")) {
        mostrarErro("Digite um e-mail válido.");
        document.getElementById("email").focus();
        return;
    }

    // Verifica senha
    if (senha.length < 6) {
        mostrarErro("A senha precisa ter pelo menos 6 caracteres.");
        document.getElementById("senha").focus();
        return;
    }

    // Por enquanto, apenas confirma que o formulário está correto
    mensagemPaciente.textContent =
        "Todos os dados foram preenchidos corretamente!";

    console.log("Dados do paciente:", {
        nome,
        cpf,
        telefone,
        email
    });

});


// Função para mostrar mensagens de erro
function mostrarErro(mensagem) {

    mensagemPaciente.textContent = mensagem;
    mensagemPaciente.className = "mensagem-erro";

}