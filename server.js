// pegando do modules o express
const express = require("express");
const server = express();

//Configurar o servidor para apresentar os arquivos extras
server.use(express.static('public'));

// habilitar body do formulário
server.use(express.urlencoded({ extended: true }));

//Configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'algumasenha',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})


// Config template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    // colocando dentro do express o server
    express: server,
    // Não cache: ele não guarda o cache
    noCache: true,
})

// Config apresentação da página
server.get('/', (req, res) => {
    db.query("SELECT * FROM donors", (err, result) => {
        if (err) return res.send('Erro de banco de dados');
        const donors = result.rows;
        res.render('index.html', { donors });
    })
});

// Post serve para registrar ou quardar dados
server.post("/", function(req, res) {
    // pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // add elementos no array
    // donors.push({
    //     name: name,
    //     blood: blood,
    // })

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios")
    }

    // colocar valores dentro do banco de dados
    const querry = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(querry, values, function(err) {
        // fluxo de erros
        if (err) return res.send("erro no banco de dados.")
            //fluxo ideal
        return res.redirect("/")

    })

})

// Liga o server e "ouve" a porta do servidor 
server.listen(3000, function() {
    console.log("teste")
})