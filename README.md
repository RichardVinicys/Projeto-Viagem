# 🧭 Projeto-Viagem

Projeto de estudo em Node.js que permite aos usuários criar uma conta e cadastrar pontos turísticos em um mapa — lugares que já visitaram ou que pretendem conhecer.

---

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários com senha criptografada
- ✅ CRUD de pontos turísticos (criar, visualizar, editar e excluir)
- ✅ Marcação de locais no mapa via coordenadas (latitude e longitude)
- ✅ Sistema de mensagens com feedback ao usuário
- ✅ Interface simples, responsiva e intuitiva

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **Express**
- **MongoDB** com **Mongoose**
- **EJS** como motor de templates
- **Leaflet.js** para exibição do mapa
- **Helmet** e **Csurf** para segurança
- **Dotenv** para variáveis de ambiente
- **Nodemon** para desenvolvimento

---

## 📦 Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/RichardVinicys/Projeto-Viagem.git

# Acesse a pasta
cd Projeto-Viagem

# Instale as dependências
npm install

# Crie um arquivo .env e adicione suas variáveis:
CONNECTIONSTRING="sua_string_do_mongodb"
SECRETSTRING="sua_chave_secreta"

# Inicie o projeto
npm start
