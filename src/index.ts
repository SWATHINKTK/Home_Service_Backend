import { httpServer } from "./infrastructure/webserver/config/app";
import { connectDB } from "./infrastructure/webserver/config/db";

const startServer = () => {
    const PORT = process.env.PORT;

    // Start HTTPServer
    const app = httpServer;

    

    app.listen(PORT, () => {
        console.log('server is running at 3000');
        connectDB()
    })
}

startServer();