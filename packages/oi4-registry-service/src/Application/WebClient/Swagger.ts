import express = require('express');
import swaggerUi from 'swagger-ui-express';

export class Swagger
{
    private readonly _client: express.Application;

    constructor(client: express.Application) {
        this._client = client;
    }

    public initSwagger(): void {
        this._client.use(express.static('public'));
        // Workaround for type incompatibility between swagger-ui-express and express
        const serve = (swaggerUi.serve as unknown as express.RequestHandler);
        const setup = (swaggerUi.setup(null, { swaggerOptions: { url: '/api/openapi.json' } }) as unknown as express.RequestHandler);
        this._client.use('/api', serve, setup);
    }
}
