import { Application } from "./deps.ts";
import { router } from "./oak-api/src/routes/user.routes.ts"; // "./src/routes/users.routes.ts";

const app = new Application();

app.use(router.routes());

app.listen({ port: 8080 });
console.log(`Server on http://localhost:8080/`);