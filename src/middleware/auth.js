const jwt=require('jsonwebtoken');
const {HttpError}=require('../utils/http');
function auth(req,res,next){const token=/^Bearer (.+)$/i.exec(req.headers.authorization||'')?.[1];if(!token)return next(new HttpError(401,'Token de autenticação necessário'));try{req.user=jwt.verify(token,process.env.JWT_SECRET);next();}catch{return next(new HttpError(401,'Token inválido ou expirado'));}}
function admin(req,res,next){if(req.user?.papel!=='admin')return next(new HttpError(403,'Acesso restrito a administradores'));next();}
module.exports={auth,admin};
