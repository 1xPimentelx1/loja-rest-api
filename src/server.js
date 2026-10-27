require('dotenv').config();
if(!process.env.JWT_SECRET||process.env.JWT_SECRET==='troque-por-uma-chave-longa-e-aleatoria'){console.error('Configure JWT_SECRET no arquivo .env');process.exit(1);}
const app=require('./app');const port=Number(process.env.PORT||3000);app.listen(port,()=>console.log(`API disponível em http://localhost:${port}`));
