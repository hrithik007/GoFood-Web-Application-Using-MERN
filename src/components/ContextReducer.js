// import React,{createContext, useContext, useReducer } from 'react'

// const CartStateContext = createContext();
// const CartDispatchContext = createContext();

// function reducer(state,action){
//     switch(state.type){
//         case "ADD":
//             return [...state, { id: action.id, name: action.name, qty: action.qty, price: action.price, img: action.img }]
//         default:
//             console.log("Error in Reducer"); 
//     }
// }


// export const ContextReducer =({children})=>{
//  const [state, dispatch] = useReducer(reducer,[]);

//     return(
// <CartStateContext.Provider value={state}>
// <CartDispatchContext.Provider value={dispatch}>
//         {children}
// </CartDispatchContext.Provider>
// </CartStateContext.Provider>
//     )
// }


// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);
