const express=require('express');
const app=express();
app.disable('x-powered-by');app.use(express.json({limit:'100kb'}));
app.get('/',(req,res)=>res.json({nome:'Loja REST API',versao:'1.0.0',documentacao:'/api'}));
app.get('/api',(req,res)=>res.json({rotas:['POST /api/auth/cadastro','POST /api/auth/login','GET /api/cidades','GET /api/categorias','GET /api/produtos','GET /api/produtos/:id','POST /api/pedidos','GET /api/pedidos','GET /api/pedidos/:id','POST /api/admin/produtos','PUT /api/admin/produtos/:id','DELETE /api/admin/produtos/:id','GET /api/admin/pedidos','PUT /api/admin/pedidos/:id']}));
app.use('/api/auth',require('./routes/auth'));app.use('/api',require('./routes/catalogo'));app.use('/api/pedidos',require('./routes/pedidos'));app.use('/api/admin',require('./routes/admin'));
app.use((req,res)=>res.status(404).json({erro:'Rota não encontrada'}));
app.use((err,req,res,next)=>{if(err instanceof SyntaxError&&err.status===400&&'body'in err)return res.status(400).json({erro:'JSON inválido'});if(err.code==='ER_ROW_IS_REFERENCED_2')return res.status(409).json({erro:'Registro possui vínculos e não pode ser excluído'});if(err.code==='ER_DUP_ENTRY')return res.status(409).json({erro:'Registro duplicado'});if(err.code==='ER_NO_REFERENCED_ROW_2')return res.status(400).json({erro:'Referência inexistente'});if(err.status)return res.status(err.status).json({erro:err.message});console.error(err);res.status(500).json({erro:'Erro interno do servidor'});});
module.exports=app;
