import db from '../../db.json';

export default function dbHandler(request, response) {
    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    //liberando acesso externo ao db -> config de server
    //Permitir fazer uma acao
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.json(db);
}

//Capturando pelo navegador
//fetch('http://localhost:3000/api/db').then(async (resposta) => { const resp = await resposta.json(); console.log(resp);});