import React from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {useCart} from "../stores/CartStore";
import {useHistory} from "react-router-dom";

interface Props {
    title: string,
    image: string,
    price: number,
    isCustomProduct: boolean
}

export const Product: React.FC<Props> = ({title, image, price, isCustomProduct}) => {
    const cart = useCart()
    const history = useHistory();

    const addToCart = () => {
        cart.dispatch(
            {
                type: 'add',
                payload: {
                    name: title,
                    price: price
                }
            }
        );
        history.push('/');
    }

    const goToCustomizeProductPage = () => {
        history.push('/poke/custom');
    }

    const ActionButton: React.FC = () => {
        if (isCustomProduct) {
            return (
                <Button size="small" color="primary" onClick={() => goToCustomizeProductPage()}>Personalizza prodotto</Button>
            )
        }
        return (
            <Button size="small" color="primary" onClick={() => addToCart()}>Aggiungi al carrello</Button>
        )
    }

    return (
        <Grid item xs={6} sm={4}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="180"
                        image={`/images/products/${image}.jpg`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {getPriceUsing(isCustomProduct, price)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <ActionButton/>
                </CardActions>
            </Card>
        </Grid>
    );
}
const getPriceUsing = (isCustomProduct: boolean, price: number): string =>
    isCustomProduct ? `da ${price}€` : `${price}€`
