import createCart from 'app/carts/mutations/createCart';
import updateCart from 'app/carts/mutations/updateCart';
import upsertCart from 'app/carts/mutations/upsertCart';
import { useMutation, Router } from 'blitz';
import React, { useEffect } from 'react'
import styles from '../../styles/Footer.module.scss';


const Footer = ({final, grand}) => {

    let cartArray 
    useEffect(() => {
       cartArray = JSON.parse(window.localStorage.getItem('array'))
    })    
    const [createCartMutation] = useMutation(createCart)
    const [upsertCartMutation] = useMutation(upsertCart)
    const addToCart = async() => {
        
     const cart = JSON.parse(window.localStorage.getItem('cart'))
        try {
            cart.forEach(async cart => {
                const updated = await upsertCartMutation({
                    where: {userId_productId: {userId: cart.userId, productId: cart.productId}},
                    update: {quantity: cart.quantity},
                    create: {
                        quantity: cart.quantity,
                        productPrice: cart.productPrice,
                        user: {connect: {id: cart.userId}},
                        product: {connect: {id: cart.productId}}
                    }
                })
                });
                Router.push('/orders')
            }  catch (error) {
              alert('product exists in cart')
               Router.push('/orders')
            }
    }

    return (
        <>
        <div className={styles.mainDivs}>
        <div className={styles.mainDiv}>
            <div className={styles.first}>
            <h2 className={styles.header}>{final} <span className={styles.span}>Products</span></h2>
            </div>
            <div className={styles.second}>
                <h2 className={styles.header2}>$ {grand}</h2>
            </div>
            <div className={styles.third}>
            <button  disabled={final < 15 && true} onClick={addToCart} className={styles.button}>CheckOut</button>
            </div>
            
        </div>
        </div>
        </>
    )
}

export default Footer
