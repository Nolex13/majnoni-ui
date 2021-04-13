import React from "react";
import {AppBar, Badge, Fab, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import {Add, ShoppingCart} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useCart} from "../stores/CartStore";

export const BottomMenu: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const cart = useCart();

    const onAddButtonClick = () => {
        history.push("/categories");
    }

    const onCartClick = () => {
        history.push("/");
    }

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Fab color="secondary" aria-label="add" className={classes.fabButton}
                     onClick={() => onAddButtonClick()}>
                    <Add/>
                </Fab>
                <div className={classes.grow}/>
                <IconButton edge="end" color="inherit" onClick={() => onCartClick()}>
                    <Badge badgeContent={cart.state.length} color="secondary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles(() => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    grow: {
        flexGrow: 1,
    },
}));
