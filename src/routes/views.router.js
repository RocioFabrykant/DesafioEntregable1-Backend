import {
    Router
} from 'express';
import Products from '../dao/dbManagers/products.js';
import Carts from '../dao/dbManagers/carts.js'
import passport from 'passport';
const router = Router();
const productManager = new Products();
const cartManager = new Carts()


// const publicAccess = (req, res, next) => {
//     if (req.session.user) return res.redirect('/');
//     next();
// }
// const privateAccess = (req, res, next) => {
//     if (!req.session.user) return res.redirect('/login');
//     next();
// }
router.get('/register',  (req, res) => {
    res.render('register')
})

router.get('/login',  (req, res) => {
    res.render('login');
})

// router.get('/', privateAccess, (req, res) => {
//     res.render('profile', {
//         user: req.session.user
//     });
// })

router.get('/products',passport.authenticate('jwt',{session:false}), async (req, res) => {
    const {
        page = 1, limit = 1, sort = "", query = ""
    } = req.query;
    try {


        const {
            docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        } = await productManager.getAll(limit, page, sort, query);

        const products = docs;

        res.render('products', {
            user: req.user,
            products,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getById(cartId);
        res.render('cart', {
            cart: cart
        })
    } catch (error) {
        console.log(error);
    }


})

router.get('/addtocart/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    try {
        // const cart = {
        //     products: []
        // }
        //const cartcreated = await cartManager.save(cart);
        //const cartId = cartcreated._id;
        const producto = {
            _id: prodId,
            quantity: 1

        }
        await cartManager.update(cartId, producto);
        const addtoCart = await cartManager.getById(cartId)
        res.render('cart', {
            cart: addtoCart
        })

    } catch (error) {
        console.log(error);
    }


})


router.get('/realtimeproducts', async (req, res) => {
    try {
        const productos = await productManager.getAll()
        res.render('realTimeProducts', {
            productos: productos
        })
    } catch (error) {

        console.log(error);
    }

})
router.get('/chat', (req, res) => {
    res.render('chat');
});




export default router;