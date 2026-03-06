import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Premium Real Estate API',
      version: '1.0.0',
      description: 'REST API for properties, leads, auth, documents, NRI',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'dist/routes/*.js', 'dist/controllers/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
