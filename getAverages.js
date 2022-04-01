const fs = require("fs");
const path = require("path");

const getCategories = async () => {
    const finalObject = {
        caracter: [],
        resultado: [],
        agente: [],
    };
    const json = require("./processed/processed.json");
    json.forEach((element) => {
        if (!finalObject.agente.includes(element.agente)) {
            finalObject.agente = [...finalObject.agente, element.agente];
        }
        if (!finalObject.caracter.includes(element.caracter)) {
            finalObject.caracter = [...finalObject.caracter, element.caracter];
        }
        if (!finalObject.resultado.includes(element.resultado)) {
            finalObject.resultado = [
                ...finalObject.resultado,
                element.resultado,
            ];
        }
    });

    const parsedObject = JSON.stringify(finalObject);

    await fs.writeFile(
        path.join(__dirname, `./processed/categories.json`),
        parsedObject,
        () => {
            console.log("File saved");
        }
    );
};

const getAverages = async () => {
    const finalObject = {
        individuals: {
            total: 0,
            conceeded: 0,
            denied: 0,
        },
        represented: {
            total: 0,
            conceeded: 0,
            denied: 0,
        },
    };

    const json = require("./processed/processed.json");
    json.forEach((element) => {
        if (
            (element.caracter.toLowerCase() === "apoderado" &&
                element.agente.toLowerCase().includes("particular")) ||
            element.caracter.toLowerCase() === "" ||
            element.agente.toLowerCase() === "" ||
            (element.caracter.toLowerCase() === "titular" &&
                (element.agente.toLowerCase().includes("particular") ||
                    element.agente.toLowerCase() === ""))
        ) {
            finalObject.individuals.total += 1;
            if (element.resultado.toLowerCase() === "concedida") {
                finalObject.individuals.conceeded += 1;
            } else {
                finalObject.individuals.denied += 1;
            }
        } else {
            finalObject.represented.total += 1;
            if (element.resultado.toLowerCase() === "concedida") {
                finalObject.represented.conceeded += 1;
            } else {
                finalObject.represented.denied += 1;
            }
        }
    });

    const parsedObject = JSON.stringify(finalObject);
    await fs.writeFile(
        path.join(__dirname, `./processed/averages.json`),
        parsedObject,
        () => {
            console.log("File saved");
        }
    );
};

getAverages();
