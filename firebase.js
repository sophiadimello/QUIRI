const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

const chaveFirebase = require("./firebase-key.json");

initializeApp({
    credential: cert(chaveFirebase)
});

// Conexão com Firestore
const banco = getFirestore();

// Conexão com Firebase Authentication
const autenticacao = getAuth();

module.exports = {
    banco,
    autenticacao
};