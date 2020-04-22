/*site alvo https://sp.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/kia-motors/picanto?gb=2&pe=29000&re=31&rs=29
Itens a serem capturados:
Nome: Kia Picanto
valor:
divulgação do anuncio:
codigo do anuncio:
link do anuncio: https://sp.olx.com.br/sao-paulo-e-regiao/autos-e-pecas/carros-vans-e-utilitarios/picanto-2012-ex-1-1-aut-734271523
*/ 

const axios  = require ('axios');
const cheerio = require ('cheerio');
const fs = require ('fs');

const siteAlvo = 'https://sp.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/kia-motors/picanto?gb=2&pe=29000&re=31&rs=29';

const dadosBrutos = async () => {
    try {
        const res = await axios.get(siteAlvo);
       // console.log(res.data);
       return res.data;
        
    } catch (error) {
        console.log('Problema ao extrari as informações: '+ error);
        
    }
};

//array para armazenar os links filhos
const dados = []

dadosBrutos();

const listaLinks = async () => {
    const html = await dadosBrutos();
    const $ = await cheerio.load(html);
    $('.OLXad-list-link').each(function(i, lnk){
        dados[i] = $(lnk).attr('href');
    })
    //console.log(dados);
    return dados;
}

//listaLinks();

//const lnkFilho = 'https://sp.olx.com.br/sao-paulo-e-regiao/autos-e-pecas/carros-vans-e-utilitarios/picanto-2012-ex-1-1-aut-734271523'
//pega a função listaLink e extrai os dados dela
const coletaDados = async (pg) => {
    try {
        const res = await axios.get(pg);
        const html =  res.data;
        const $ = await cheerio.load(html);
        let nomeProduto = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.jTuobL > h1').text();
        let valor = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.jisuAT > div > div.sc-kAzzGY.sc-hqyNC.sc-1leoitd-2.dZHcZu > h2').text();
        let publicacao = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.erFhuY > div.h3us20-3.csYflq > span').text();
        let codigo = $('#content > div.sc-1d7g5sb-3.jyDaIy > div > div.sc-bwzfXH.h3us20-0.cBfPri > div.sc-1ys3xot-0.h3us20-0.jAHFXn > div.h3us20-5.erFhuY > div.h3us20-2.bdQAUC > div > span.sc-ifAKCX.sc-16iz3i7-0.fxfcRz').text();

        const resultado = `
        <h1>Produto: ${nomeProduto}</h1>
        <h3>Valor: ${valor}</h3>
        <h3>${publicacao}</h3>
        <h3>${codigo}</h3>
        <h3>Link: <a href="${pg}">Produto</a></h3>
        `
        gravaHtml(resultado);
       // console.log(resultado);
    } catch (error) {
      console.log('Problema ao extrair os dados '+ error) ;
    }
};


const gravaHtml = async (result) =>{
    fs.writeFileSync('./index.html', result, {flag: 'a+'}, function (err) {
        if(err)
        console.log('Problemas na geração do html: '+ err);
        
    });
};

const apresentaDados = async () => {
    const todosLinks = await listaLinks();
    todosLinks.map(function (linksFilhos) {
        coletaDados(linksFilhos);
    })
};

const main = async () => {
    await apresentaDados();
}

main();

