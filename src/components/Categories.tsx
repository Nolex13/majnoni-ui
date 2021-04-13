import React from "react";
import {Grid} from "@material-ui/core";
import {Category} from "./Category";
import {ContainerWithMargin} from "./ContainerWithMargin";

export const Categories: React.FC = () =>
    <ContainerWithMargin>
        <Grid container spacing={3}>
            <Category title="Piadine" image="piadina" url="poke"/>
            <Category title="Hamburger" image="hamburger" url="poke"/>
            <Category title="Poké" image="poke" url="poke"/>
            <Category title="Bibite" image="bibite" url="poke"/>
        </Grid>
    </ContainerWithMargin>
