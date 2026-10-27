const router=require('express').Router(),db=require('../config/db');
const {HttpError,asyncRoute,positiveInt}=require('../utils/http');
router.get('/cidades',asyncRoute(async(req,res)=>{const [r]=await db.query('SELECT * FROM cidades ORDER BY nome');res.json(r);}));
router.get('/categorias',asyncRoute(async(req,res)=>{const [r]=await db.query('SELECT * FROM categorias ORDER BY nome');res.json(r);}));
router.get('/produtos',asyncRoute(async(req,res)=>{const {categoria_id,disponiveis}=req.query;let sql='SELECT p.*,c.nome AS categoria FROM produtos p JOIN categorias c ON c.id=p.categoria_id WHERE 1=1',args=[];if(categoria_id!==undefined){if(!positiveInt(categoria_id))throw new HttpError(400,'Categoria inválida');sql+=' AND categoria_id=?';args.push(categoria_id);}if(disponiveis==='true')sql+=' AND quantidade>0';sql+=' ORDER BY p.id';const [r]=await db.query(sql,args);res.json(r);}));
router.get('/produtos/:id',asyncRoute(async(req,res)=>{if(!positiveInt(req.params.id))throw new HttpError(400,'ID inválido');const [r]=await db.query('SELECT * FROM produtos WHERE id=?',[req.params.id]);if(!r.length)throw new HttpError(404,'Produto não encontrado');res.json(r[0]);}));
module.exports=router;
