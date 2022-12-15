import { Context, helpers } from "../../../deps.ts"
import logger from "../middlewares/logger.ts";
import { Products } from "../types/users.types.ts";

const DB_PRODS: Products[] = [];
DB_PRODS.push({uuid: "1", name: 'Notebook Dell Latitude', description: 'I5 Septima generación, 15 inch, SSD 256Gb, RAM 8Gb', price:600});
DB_PRODS.push({uuid: "2", name: 'Desktop Dell Inspiron', description: 'I7 Quinta generación, SSD 256Gb, RAM 16Gb', price:825});
DB_PRODS.push({uuid: "3", name: 'Notebook Lenovo Legion', description: 'Ryzen 9, SSD 500Gb, RAM 16Gb', price:1215});
DB_PRODS.push({uuid: "4", name: 'Desktop Lenovo AIO', description: 'I3 Quinta generación, SSD 256Gb, 22 inchs, RAM 8Gb', price:983});

export const raiz = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        const text = await Deno.readTextFile('./index.html');
        ctx.response.headers.set("Content-Type", "text/html")        
        ctx.response.body = await text;
            
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}


export const findAll = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        ctx.response.body = await {code: '00', data: DB_PRODS};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const findProd = async (ctx: Context) =>{
    try {
        const { prodId } = helpers.getQuery(ctx, {mergeParams: true});
        const prod = await DB_PRODS.find((u) => u.uuid == prodId);

        if (prod) {
            ctx.response.body = await {code: '00', data: prod};
        } else {
            ctx.response.body = await {code: '01', msg: `Producto con id ${prodId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const createProd = async (ctx: Context ) => {
    try {
        ctx.response.status = 201;
        logger.debug(`status: ${ctx.response.status} method: createUser handler`);

        const { name, description, price } = await ctx.request.body().value;
       
        const newId = Number(DB_PRODS[DB_PRODS.length - 1].uuid) + 1;
        const prod: Products = {
            uuid: newId.toString(),
            name: name,
            description: description,
            price: price
        }
        DB_PRODS.push(prod)

        ctx.response.body = await {code: '00', data: prod};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const updateProd = async (ctx: Context ) => {
    try {
        ctx.response.status = 202;
        logger.debug(`status: ${ctx.response.status} method: updateUser handler`);

        const { prodId } = helpers.getQuery(ctx, {mergeParams: true});
        const prodIndex = await DB_PRODS.findIndex((u) => u.uuid == prodId);

        if (prodIndex) {
            const { name, description, price } = await ctx.request.body().value;
            DB_PRODS.splice(prodIndex, 1, {uuid: prodId, name, description, price});
           
            ctx.response.body = {code: '00', data: {uuid: prodId, name, description, price}}
        } else {
            ctx.response.body = {code: '01', msg: `Producto con id ${prodId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}

export const deleteProd = async (ctx: Context ) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: deleteUser handler`);

        const { prodId } = helpers.getQuery(ctx, {mergeParams: true});
        const prodIndex = await DB_PRODS.findIndex((u) => u.uuid == prodId);

        if (prodIndex) {
            DB_PRODS.splice(prodIndex, 1);

            ctx.response.body = {code: '00', msg: `Producto con id ${prodId} eliminado`}
        } else {
            ctx.response.body = {code: '01', msg: `Producto con id ${prodId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}

