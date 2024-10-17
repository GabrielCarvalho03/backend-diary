"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./https/app");
app_1.app.listen({ port: 8000 }, () => console.log("Server is running on port 8000"));
