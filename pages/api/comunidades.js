const dotenv = require("dotenv")
if (process.env.NODE_ENV != 'production') { dotenv.config() }
import { SiteClient } from 'datocms-client';
export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = process.env.DATO_TOKEN;
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "975316",
            ...request.body,
            // title: "Godzilla GiroFlex",
            // imageUrl: "https://i.imgur.com/CmaXjFC.png",
            // creatorSlug: "RaianWZ",
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!",
    })
}
