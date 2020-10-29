import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        res.write("Faktoriális meghatározása\n\n");

        // Próbáljuk számra konvertálni az "n" paraméter (http://localhost:8080/?n=7) értékét:
        let n: number = parseInt(params.n as string);
        // Ha nincs "n" paraméter megadva, vagy nem lehet számra konvertálni értékét,
        // akkor az "n" változóba NaN érték kerül, ilyenkor legyen 5 az értéke:
        if (isNaN(n)) n = 5;
        res.write(`n= <input type='number' name='n' value=${n} style='max-width:100px;' onChange='this.form.submit();'>\n\n`);
        let faktor: number = 1;
        let eredmény: string = `${n}! = 1`;
        for (let i = 2; i <= n; i++) {
            faktor = faktor * i;
            eredmény += ` * ${i}`;
        }
        eredmény += ` = ${faktor}`;
        res.write(eredmény);

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
