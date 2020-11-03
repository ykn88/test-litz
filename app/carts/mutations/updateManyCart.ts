import {Ctx} from "blitz"
import db, {CartUpdateManyArgs} from "db"

type UpdateManyCartInput = Pick<CartUpdateManyArgs, "where" | "data">

export default async function updateMany({where, data}: UpdateManyCartInput, ctx:Ctx) {
    ctx.session.authorize()

    const cart = await db.cart.updateMany({where, data})

    return cart
}