import { createSlice } from '@reduxjs/toolkit'

const cartRedux = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        total: 0,
        quantity: 0,
    },
    reducers: {
        addProduct: (state, action) => {

            const productToAdd = action.payload
            const productName = productToAdd.title + ' ' + productToAdd.selectedPlatform

            const existingProduct = state.products.find(
                (product) => product.name === productName
            );

            if (existingProduct) {

                existingProduct.quantity += 1
                

            } else {

                const newProduct = { ...productToAdd, name: productName };
                state.products.push(newProduct);
                
            }


            state.total = Number(
                (state.total + action.payload.price).toFixed(2)
            );


            state.quantity += 1;


        },

        increaseQuantity: (state, action) => {

            const productName = action.payload.name;

            

         

            const existingProduct = state.products.find(
                (product) => product.name === productName
                
            );

            if (existingProduct) {

                existingProduct.quantity += 1;
                state.quantity += 1;
                state.total = Number((state.total + existingProduct.price).toFixed(2));
            }
        },
        decreaseQuantity: (state, action) => {

            const productName = action.payload.name;

            const existingProduct = state.products.find(
                (product) => product.name === productName
            );

            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
                state.quantity -= 1;
                state.total = Number((state.total - existingProduct.price).toFixed(2));
            }
        },

        removeProduct: (state, action) => {

            const productName = action.payload.name
            const productToRemove = state.products.find(
                (product) => product.name === productName
            )

            if (productToRemove) {

                state.quantity -= productToRemove.quantity;
                state.total = Number((state.total - productToRemove.price * productToRemove.quantity).toFixed(2));


                state.products = state.products.filter(
                    (product) => product.name !== productName
                );
            }

        },

        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});


export const { addProduct, clearCart, increaseQuantity, decreaseQuantity, removeProduct } = cartRedux.actions
export default cartRedux.reducer