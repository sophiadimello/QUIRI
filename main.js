const express = require("express");
const { banco, autenticacao } = require("./firebase.js");

const app = express();
const PORTA = 3000;

// Permite que o backend receba dados em formato JSON
app.use(express.json());

// Mostra os arquivos da pasta html
app.use(express.static("html"));

// Página inicial
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

// ========================================
// CADASTRO DA NUTRICIONISTA
// ========================================

app.post("/api/nutricionista/cadastro", async function (req, res) {

    // Pega os dados enviados pelo formulário
    const {
        nome,
        cpf,
        telefone,
        crn,
        email,
        senha
    } = req.body;

    try {

        // Cria a conta no Firebase Authentication
        // O e-mail e a senha ficam no Authentication
        const usuario = await autenticacao.createUser({
            email: email,
            password: senha
        });

        // Salva somente os dados da nutricionista no Firestore
        // A senha NÃO é salva aqui
        await banco.collection("nutricionistas").doc(usuario.uid).set({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            crn: crn,
            email: email
        });

        // Informa que o cadastro foi realizado
        res.status(201).json({
            mensagem: "Nutricionista cadastrada com sucesso!"
        });

    } catch (erro) {

        // Mostra o erro no terminal do backend
        console.error("Erro ao cadastrar nutricionista:", erro);

        // Informa ao navegador que houve um erro
        res.status(400).json({
            mensagem: "Não foi possível realizar o cadastro."
        });
    }
});

// ========================================
// LOGIN DA NUTRICIONISTA
// ========================================

app.post("/api/nutricionista/login", async function (req, res) {

    // Pega o e-mail e a senha enviados pelo formulário
    const { email, senha } = req.body;

    try {

        // O Firebase Admin não realiza login diretamente com e-mail e senha.
        // Por enquanto, verificamos se existe uma conta com esse e-mail.
        const usuario = await autenticacao.getUserByEmail(email);

        // Informa que encontramos a conta
        console.log("Usuário encontrado:", usuario.uid);

        // Responde ao navegador
        res.json({
            mensagem: "E-mail encontrado! Login em desenvolvimento."
        });

    } catch (erro) {

        // Mostra o erro no terminal
        console.error("Erro ao fazer login:", erro);

        // Responde ao navegador
        res.status(401).json({
            mensagem: "E-mail ou senha inválidos."
        });
    }
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORTA, function () {
    console.log("================================");
    console.log("          QUiRi");
    console.log("================================");
    console.log("Servidor iniciado!");
    console.log("Acesse: http://localhost:3000");
    console.log("Firebase conectado!");
});