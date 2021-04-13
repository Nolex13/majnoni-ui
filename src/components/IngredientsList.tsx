import React from "react";
import {
    Avatar,
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

export type Ingredient = {
    title: string,
    description: string,
    image: string,
    price: number
}

interface Props {
    ingredients: Ingredient[],
    selectedIndex: number,
    onClick: (index: number) => void
}

export const IngredientsList: React.FC<Props> = ({ingredients, selectedIndex, onClick}) => {
    const classes = useStyles();

    const onClickEvent = (index: number) => {
        onClick(index)
    };

    return (
        <List className={classes.root}>
            {ingredients.map((ingredient, index) => (
                <>
                    <ListItem alignItems="flex-start" key={`ingredient-${ingredient.title}`}
                              selected={selectedIndex === index} onClick={() => onClickEvent(index)}>
                        <ListItemAvatar>
                            <Avatar alt={ingredient.title} src={`/images/ingredients/${ingredient.image}.jpg`}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={ingredient.title}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >+{ingredient.price}€</Typography>
                                    {` —  ${ingredient.description}`}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </>
            ))}
        </List>
    );
}
