const fetch = require("node-fetch");

async function postData(url = "", acta = {}) {
    console.log(acta);
    const details = {
        Acta: `${acta}`,
    };

    let formBody = [];
    for (let property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "es-419,es;q=0.9",
            "Cache-Control": "max-age=0",
            Connection: "keep-alive",
            "Content-Length": "11",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Cookie: "ASP.NET_SessionId=job20jf4aiajkgtt2k5yphzv; cookiesession1=678B2868DFGHIJKLMNOPQRSTUVWXC652",
            DNT: "1",
            Host: "portaltramites.inpi.gob.ar",
            Origin: "https://portaltramites.inpi.gob.ar",
            Referer:
                "https://portaltramites.inpi.gob.ar/MarcasConsultas/Grilla",
            "sec-ch-ua": `" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formBody, // body data type must match "Content-Type" header
    });
    const parsedResponse = response.text();

    return parsedResponse; // parses JSON response into native JavaScript objects
}

module.exports = postData;
