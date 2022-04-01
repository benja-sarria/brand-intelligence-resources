const fs = require("graceful-fs");
const path = require("path");
const cheerio = require("cheerio");

const extractRelevantData = async (index) => {
    const finalArray = [];
    const expArray = require("./expArray");
    const objectToSave = {
        acta: "",
        denominacion: "",
        agente: "",
        caracter: "",
        resultado: "",
    };
    let processedFile;
    // 2770907
    console.log(`Index: ${index}`);
    console.log(`Expte: ${expArray[index]}`);
    await fs.readFile(
        path.join(__dirname, `./details/${expArray[index]}.html`),
        "utf-8",
        async function (err, file) {
            //handling error
            if (err) {
                return console.log("Unable to scan directory: " + err);
            }
            const processedFile = file;
            const $ = cheerio.load(`${processedFile}`);
            const acta = $(`h1`).text().split(" ")[3];

            const gestion = $(".input");
            if (
                gestion.text().toLowerCase().includes("tipo") &&
                (gestion.text().toLowerCase().includes("concedida") ||
                    gestion.text().toLowerCase().includes("abandonada") ||
                    gestion.text().toLowerCase().includes("rechazada") ||
                    gestion.text().toLowerCase().includes("denegada"))
            ) {
                objectToSave.acta = acta;
                // console.log(gestion.text());
                gestion.each((index, element) => {
                    if (
                        $(element).text().toLowerCase().includes("agente") ||
                        $(element).text().toLowerCase().includes("agente:")
                    ) {
                        objectToSave.agente = $(element)
                            .text()
                            .replace(/\s+/g, " ")
                            .replace("AGENTE:", "")
                            .trim();
                    }
                    if ($(element).text().toLowerCase().includes("caracter")) {
                        objectToSave.caracter = $(element)
                            .text()
                            .replace(/\s+/g, " ")
                            .replace("CARACTER:", "")
                            .trim();
                    }
                    if (
                        $(element).text().toLowerCase().includes("denominación")
                    ) {
                        objectToSave.denominacion = $(element)
                            .text()
                            .replace(/\s+/g, " ")
                            .replace("DENOMINACIÓN:", "")
                            .trim();
                    }
                    if (
                        $(element).text().toLowerCase().includes("tipo") &&
                        ($(element)
                            .text()
                            .toLowerCase()
                            .includes("concedida") ||
                            $(element)
                                .text()
                                .toLowerCase()
                                .includes("abandonada") ||
                            $(element)
                                .text()
                                .toLowerCase()
                                .includes("rechazada") ||
                            $(element)
                                .text()
                                .toLowerCase()
                                .includes("denegada"))
                    ) {
                        objectToSave.resultado = $(element)
                            .text()
                            .replace(/\s+/g, " ")
                            .replace("TIPO:", "")
                            .trim();
                    }
                    /*   country.name = $(el).children("a").text();
                        country.iso3 = $(el).children("span").text();
                        // Populate countries array with country data
                        countries.push(country); */
                });
            }
            if (objectToSave.acta) {
                console.log(objectToSave);
                const json = require("./processed/processed.json");
                json.push(objectToSave);
                const parsedJson = JSON.stringify(json);
                await fs.writeFile(
                    path.join(__dirname, `./processed/processed.json`),
                    parsedJson
                );
                finalArray.push(objectToSave);
            } else {
                console.log("Sin resolución");
            }

            // console.log($(`.modal-body`).text());
        }
    );

    console.log(finalArray);
    return await finalArray;
    //=> Apple
};
const execute = async (index, timeout) => {
    setTimeout(() => {
        extractRelevantData(index);
    }, timeout);
};

const processExptes = () => {
    let debouncer = 0;
    const expArray = require("./expArray");
    let index = 26127;
    expArray.forEach((expt) => {
        if (index <= expArray.length / 2 || index <= 27000) {
            setTimeout(() => {
                execute(index, debouncer);
                index += 1;
                debouncer += 5000;
            }, debouncer);
        }
    });
};

processExptes();
