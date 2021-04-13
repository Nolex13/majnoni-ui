import React from "react";
import {
    Avatar, Button,
    createStyles,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import {Ingredient} from "./IngredientsList";
import {useCart} from "../stores/CartStore";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

interface Props {
    ingredients: Ingredient[][],
    selections: number[]
}

export const TotalIngredients: React.FC<Props> = ({ingredients, selections}) => {
    const cart = useCart();
    const history = useHistory();

    const onConfirmation = () => {
        cart.dispatch({
            type: 'add',
            payload: {
                name: `Poké (${getIngredientList()})`,
                price: getTotalPrice()
            }
        });
        history.push('/');
    }

    const getIngredientList = (): string => {
        return ingredients.map((ingredient, index) => {
            return ingredient[selections[index]].title
        }).join(', ')
    }

    const getTotalPrice = (): number => {
        let result = 0;
        ingredients.forEach((ingredient, index) => {
            result += ingredient[selections[index]].price
        })
        return result;
    }

    const classes = useStyles();

    return (
        <>
            <List className={classes.root}>
                {selections.map((selectedIndex, index) => (
                    <>
                        <ListItem alignItems="flex-start" key={`total-ingredient-${ingredients[index][selectedIndex].title}`}>
                            <ListItemAvatar>
                                <Avatar alt={ingredients[index][selectedIndex].title}
                                        src={`/images/ingredients/${ingredients[index][selectedIndex].image}.jpg`}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ingredients[index][selectedIndex].title}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >+{ingredients[index][selectedIndex].price}€</Typography>
                                        {` —  ${ingredients[index][selectedIndex].description}`}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </>
                ))}
            </List>
            <Button onClick={() => onConfirmation()}>Aggiungi al carrello</Button>
        </>
    );
}
