const express=require('express')
const mod=require('../functions/minerfunctions');
const minerRoutes= express.Router();
 minerRoutes.route('/register').post(mod.registerminer);
 minerRoutes.route('/getminers').get(mod.getminers);
 module.exports=minerRoutes;