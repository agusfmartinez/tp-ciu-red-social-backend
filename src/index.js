require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const routerUsers = require("./routes/usersRoutes");
const routerPosts = require("./routes/postRouters");
const routerTags = require("./routes/tagRoutes");
const routerComments = require("./routes/commentRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(__dirname + "/docs/swagger.yaml");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/users", routerUsers);
app.use("/posts", routerPosts);
app.use("/tags", routerTags);
app.use("/comments", routerComments);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/uploads", express.static("uploads"));

app.listen(PORT, async ()=> {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Server running on ", PORT)
    } catch (error) {
        console.error("No se pudo conectar con la base de datos:", error);
    }
});