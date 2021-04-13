import React from 'react';
import {AppRouter} from "./AppRouter";
import {CartProvider} from "./stores/CartStore";


export const App: React.FC = () =>
    <CartProvider>
        <AppRouter/>
    </CartProvider>
