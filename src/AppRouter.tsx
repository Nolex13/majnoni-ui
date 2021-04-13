import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {BottomMenu} from "./components/BottomMenu";
import {Cart} from "./components/Cart";
import {CssBaseline} from "@material-ui/core";
import {Categories} from "./components/Categories";
import {Poke} from "./components/Poke";
import {CustomizeProduct} from "./components/CustomizeProduct";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Switch>
                <Route path="/categories">
                    <Categories />
                </Route>
                <Route path="/poke/custom">
                    <CustomizeProduct />
                </Route>
                <Route path="/poke">
                    <Poke />
                </Route>
                <Route path="/">
                    <Cart />
                </Route>
            </Switch>
            <BottomMenu />
        </BrowserRouter>
    )
}
