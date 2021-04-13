import React from "react";
import {ContainerWithMargin} from "./ContainerWithMargin";
import {Product} from "./Product";
import {Grid} from "@material-ui/core";

interface Props {
    title: string
}

export const Products: React.FC<Props> = ({title}) => {
    return (
        <ContainerWithMargin>
            <h1>{title}</h1>
            <Grid container spacing={3}>
                <Product title="Poké 1" image="poke-1" price={9.99} isCustomProduct={false}/>
                <Product title="Poké 2" image="poke-2" price={9.99} isCustomProduct={false}/>
                <Product title="Poké 3" image="poke-3" price={9.99} isCustomProduct={false}/>
                <Product title="Personalizzato" image="poke-custom" price={5.99} isCustomProduct={true}/>
            </Grid>
        </ContainerWithMargin>
    );
}
