const fs = require('fs')


 excluiRelatorio = () =>{
    try {
        fs.unlinkSync('./index.html');
        console.log('Arquivo Excluido');
    } catch (error) {
      console.log("Erro ao excluir o relatorio"+ error) ;
    }
}


module.exports = excluiRelatorio