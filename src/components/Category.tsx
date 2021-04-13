import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

interface Props{
    title: string,
    image: string,
    url: string
}

export const Category: React.FC<Props> = ({title, image, url}) => {
    const history = useHistory();

    const onClick = () => {
        history.push(`/${url}`);
    }
    return (
        <Grid item xs={6} sm={4}>
            <Card onClick={() => onClick()}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="180"
                        image={`/images/categories/${image}.jpg`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
