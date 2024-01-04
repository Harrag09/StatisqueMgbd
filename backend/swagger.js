// swagger.js
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/*.js']; 

const swaggerAutogenConfig = {
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'API documentation using Swagger',
  },
  host: 'localhost:8000', // Replace with your actual host and port
  basePath: '/',
};

swaggerAutogen(outputFile, endpointsFiles, swaggerAutogenConfig);
