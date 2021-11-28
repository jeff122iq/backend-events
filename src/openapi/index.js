const PORT = process.env.PORT || 5000;

const swagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Event and Auth user API",
            version: "1.0.0",
            description: "Backend challenge CRUD Events and Auth Users",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}

module.exports = swagger;