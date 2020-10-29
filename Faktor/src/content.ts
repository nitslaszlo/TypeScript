import fs from "fs";
import http from "http";
import url from "url";
import Fakt from "./fakt";

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
        res.write("<title>FaktorTs</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->

        res.write("Szám faktoriálisa (1 - 21)\n");
        const u = url.parse(req.url as string, true).query;
        let x: number = parseInt(u.x as string);
        if (isNaN(x) || x < 1 || x > 21) {
            x = 5; // alapértelmetett érték
        }

        res.write(`x = <input type='text' name='x' value=${x} style='width:3em'>\n`);
        const fakt: Fakt = new Fakt(x);
        res.write(`${fakt.textFull} = ${fakt.res}\n`);
        res.write(`${fakt.textShort} = ${fakt.res}\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
