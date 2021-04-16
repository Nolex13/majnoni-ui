import React, {createContext, useContext, useReducer} from "react";
import {LocalStorageRepository} from './LocalStorageRepository';

export type Product = { name: string, price: number }
type Action = { type: 'add', payload: Product } | { type: 'remove', payload: string }
type State = Product[]
type Dispatch = (action: Action) => void

const CartStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)
const localStorageRepository = new LocalStorageRepository();

const cartReducer = (state: State, action: Action): State => {
    const getIndexOf = (products: Product[], name: string): number => {
        let result = -1
        products.forEach((value, index) => {
            if (value.name === name) {
                result = index
            }
        })
        return result
    }

    switch (action.type) {
        case 'add': {
            const result = state.concat(action.payload);
            localStorageRepository.set(result)
            return result;
        }
        case "remove": {
            const productIndex = getIndexOf(state, action.payload)
            if (productIndex >= 0) {
                const result = [
                    ...state.slice(0, productIndex),
                    ...state.slice(productIndex + 1)
                ];
                localStorageRepository.set(result)
                return result;
            }
            return state;
        }
    }
}

export const CartProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, localStorageRepository.get())
    const value = {state, dispatch}
    return (
        <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>
    )
};

export const useCart = (): { state: State; dispatch: Dispatch } => {
    const context = useContext(CartStateContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CountProvider')
    }
    return context
}
