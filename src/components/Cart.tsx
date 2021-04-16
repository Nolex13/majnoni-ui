import React from "react";
import {AddBox, IndeterminateCheckBox, RemoveShoppingCart} from "@material-ui/icons";
import {
    Box,
    Button,
    Container,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Product, useCart} from "../stores/CartStore";
import {ContainerWithMargin} from "./ContainerWithMargin";

export const Cart: React.FC = () => {
    const cart = useCart()

    return (
        <Container>
            {cart.state.length === 0 && <EmptyCart/>}
            {cart.state.length > 0 && <ProductTable/>}
        </Container>
    )
}

const EmptyCart: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <h1>Non ci sono prodotti nel carrello</h1>
            <RemoveShoppingCart fontSize="large"/>
            <p><strong>Aggiungi</strong> dei prodotti per procedere con l'ordine</p>
        </Box>
    )
}

const groupByTitle = (products: Product[]): { name: string, price: number, size: number }[] => {
    let result: Map<string, { price: number, size: number }> = new Map();
    products.forEach(product => {
        if (result.has(product.name)) {
            const p = result.get(product.name)
            result.set(product.name, {
                // @ts-ignore
                price: p.price,
                // @ts-ignore
                size: ++p.size
            })
        } else {
            result.set(product.name, {
                price: product.price,
                size: 1
            });
        }
    })
    return Array.from(result.keys()).map(name =>
        (
            {
                name: name,
                // @ts-ignore
                price: result.get(name).price,
                // @ts-ignore
                size: result.get(name).size
            }
        )
    );
}

const ProductTable: React.FC = () => {
    const cart = useCart();

    const data = groupByTitle(cart.state)

    const remove = (name: string): void => {
        cart.dispatch({type: 'remove', payload: name})
    }

    const add = (product: Product): void => {
        cart.dispatch({type: 'add', payload: product})
    }

    const getTotalUsing = (products: Product[]): string => {
        const total: number = products.reduce((result, product) => result + product.price, 0);
        return total.toFixed(2);
    }

    return (
        <ContainerWithMargin>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Totale</TableCell>
                            <TableCell align="right">Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell component="th" scope="row">{product.name}</TableCell>
                                <TableCell align="right">{product.price}€ x {product.size} = <strong>{product.price * product.size}€</strong></TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => remove(product.name)}
                                    >
                                        <IndeterminateCheckBox />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() => add(product)}
                                    >
                                        <AddBox/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="right">{getTotalUsing(cart.state)}€</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </ContainerWithMargin>
    )
}
const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center"
    },
}));
