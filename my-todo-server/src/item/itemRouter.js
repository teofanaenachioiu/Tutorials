import Router from 'koa-router';
import {ItemStore} from './ItemStore';
import {Item} from "./Item";
import {brodcast} from "../core/wsBroadcast";

const itemStore = new ItemStore({filename: './db/items.json'});

// for (let i=0;i<50;i++){
//     const item =new Item(`item ${i}`, false);
//     item.userId = 'Ck0NQNspv3ZpwliY';
//     item.version = 1;
//     itemStore.insert(item);
// }


export const router = new Router();

router.get('/', async (ctx, next) => {
    // const pageN = ctx.request.query.page || 0;
    // const limita = ctx.request.query.limita || 9;

    // const limit = parseInt(limita);
    // const pageNr = parseInt(pageN);
    // console.log(limit);
    const props = ctx.request.query;
    const result = (await itemStore.find({
        //...props,
        userId: ctx.state.user._id
    }));
    // console.log(pageNr * limit, pageNr * limit + limit);
    // const resss =result.slice(pageNr * limit, pageNr * limit + limit);
    ctx.response.body = JSON.stringify(result);
    ctx.response.status = 200;
});

router.get('/:id', async (ctx, next) => {
    //console.log(ctx.params.id);
    const res = await itemStore.find({_id: ctx.params.id});
    //
    // .log(res);
    if (res.length === 0) {
        ctx.response.status = 404;
    } else {
        if (ctx.state.user._id !== res[0].userId) {
            ctx.response.status = 403;
        } else {
            ctx.response.body = res[0];
            ctx.response.status = 200;
        }
    }
});

router.post('/', async (ctx, next) => {
    const userId = ctx.state.user._id;
    const item = await itemStore.insert({...ctx.request.body, userId, version: 1});
    ctx.response.body = item;
    ctx.response.status = 200;
    //console.log(item);
    brodcast({event: 'created', payload: item});
});

router.put('/:id', async (ctx, next) => {
    console.log("Intra in put");
    const props = ctx.request.body;
    const id = ctx.params.id;
    const version = props.version;
    const oldItem = await itemStore.find({_id: id});
    if (oldItem.length === 0) {
        ctx.response.status = 404; //not found
        return;
    }
    if (oldItem[0].version > version) {
        ctx.response.status = 409; //conflict
        ctx.body.response = oldItem[0];
        return;
    }
    props.version += 1;
    const count = await itemStore.update({_id: id, userId: ctx.state.user._id}, props);
    const newItem = await itemStore.find({_id: id, userId: ctx.state.user._id});
    ctx.response.body = {"UPDATED": count};
    ctx.response.status = 200;
    console.log("Acum ma pregatesc sa fac brodcast, ", newItem[0]);
    brodcast({event: 'updated', payload: newItem[0]});
});

router.delete('/:id', async (ctx, next) => {
    const props = {_id: ctx.params.id};
    const found = await itemStore.find(props);
    const payload = found[0];
    const count = await itemStore.remove(props);
    ctx.response.body = "DELETED: " + count;
    ctx.response.status = 200;
    brodcast({event: 'deleted', payload: payload});
});
