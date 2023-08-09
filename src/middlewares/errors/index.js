//DE ACUERDO AL CODIGO DE ERROR (DICCIONARIO). CODIGO HTTP
import EErrors from "./enums.js"

export default (error,req,res,next)=>{
    switch(error.code){
        case EErrors.INVALID_TYPE_ERROR:
            res.status(400).send({
                status:'error',
                error:error.name,
                description:error.cause
            })
            break;
            default:
                res.status(500).send({
                    status:'error',
                    error:error.name,
                    description:error.cause
                })
                break;
            //deberiamos definir un case por cada error que tenemos definido
    }
    next();//para que ejecucion siga correctamente, y se lancen los codigos http
}