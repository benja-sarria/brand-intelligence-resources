const postData = require("./fetchFunction");
const fs = require("fs");
const path = require("path");

const obtainMoreData = async () => {
    const asTrademarks = require("./asTrademarks");

    let debouncer = 0;
    asTrademarks.forEach(async (trademark) => {
        setTimeout(async () => {
            const acta = trademark.Acta;
            const url = `https://portaltramites.inpi.gob.ar/MarcasConsultas/Resultado/${acta}`;
            const details = await postData(url, acta);

            fs.writeFileSync(
                path.resolve(__dirname, `./details/${trademark.Acta}.html`),
                details,
                "utf-8"
            );
        }, debouncer);
        debouncer += 750;
    });
};

// obtainMoreData();

const obtainActArray = async () => {
    const finalArray = [];
    //joining path of directory
    const directoryPath = path.join(__dirname, "details");
    //passsing directoryPath and callback function
    await fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            const [number] = file.split(".", 1);
            console.log(number);
            finalArray.push(number);
        });
        fs.writeFileSync(
            path.resolve(__dirname, `./expArray.js`),
            finalArray.toString(),
            "utf-8"
        );
    });
};
// obtainActArray();
