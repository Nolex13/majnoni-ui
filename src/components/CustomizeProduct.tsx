import React, {useState} from "react";
import {Step, StepButton, StepContent, Stepper, Typography} from "@material-ui/core";
import {ContainerWithMargin} from "./ContainerWithMargin";
import {Ingredient, IngredientsList} from "./IngredientsList";
import {TotalIngredients} from "./TotalIngredients";

const getSteps = () => {
    return ['Pesce', 'Insalata', 'Non lo so'];
}

const ingredients: Ingredient[][] = [
    [
        {
            title: "Tartare",
            description: "Piccola descrizione volendo...",
            image: "tartare",
            price: 2.50
        },
        {
            title: "Tonno",
            description: "Ovviamente ogni tipologia ha la sua immagine ma mi sono stufato di cercare immagini su Google :D",
            image: "tartare",
            price: 2.00
        }
    ],
    [
        {
            title: "Lattuga",
            description: "Piccola descrizione volendo...",
            image: "tartare",
            price: 1.50
        },
        {
            title: "Erba",
            description: "Ovviamente ogni tipologia ha la sua immagine ma mi sono stufato di cercare immagini su Google :D",
            image: "tartare",
            price: 0.50
        },
        {
            title: "Maria",
            description: "Ovviamente ogni tipologia ha la sua immagine ma mi sono stufato di cercare immagini su Google :D",
            image: "tartare",
            price: 1.20
        }
    ],
    [
        {
            title: "Manzo",
            description: "Piccola descrizione volendo...",
            image: "tartare",
            price: 2.50
        },
        {
            title: "Agnello",
            description: "Piccola descrizione volendo...",
            image: "tartare",
            price: 2.50
        }
    ]
]

export const CustomizeProduct: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedIngredients, setSelectedIngredients] = useState<number[]>([0, 0, 0])
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const createClickIngredientHandler = (step: number) => {
        return (index: number) => {
            const v = selectedIngredients;
            v[step] = index;
            setSelectedIngredients(v);
            handleNext();
        }
    }

    const getStepContent = (step: number) => {
        return <IngredientsList ingredients={ingredients[step]} selectedIndex={selectedIngredients[step]}
                                onClick={createClickIngredientHandler(step)}/>
    }

    return (
        <ContainerWithMargin>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)}>{label}</StepButton>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                        </StepContent>
                    </Step>
                ))}
                <Step>
                    <StepButton>Resoconto</StepButton>
                    <StepContent>
                        <Typography>
                            <TotalIngredients ingredients={ingredients} selections={selectedIngredients} />
                        </Typography>
                    </StepContent>
                </Step>
            </Stepper>
        </ContainerWithMargin>
    );
}
