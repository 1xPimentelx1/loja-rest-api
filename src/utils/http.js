class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
const asyncRoute=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const positiveInt=v=>Number.isSafeInteger(Number(v))&&Number(v)>0&&String(v).trim()!=='';
const nonnegative=v=>v!==null&&v!==undefined&&v!==''&&Number.isFinite(Number(v))&&Number(v)>=0;
module.exports={HttpError,asyncRoute,positiveInt,nonnegative};
