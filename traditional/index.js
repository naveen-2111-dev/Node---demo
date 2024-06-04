const http = require("http");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

const port = process.env.PORT;
const hostname = process.env.HOST;

const server = http.createServer(async (request, response) => {
    if (request.method === 'POST' && request.url === "/users-signin") {
        let body = [];

        request.on('data', chunk => {
            body.push(chunk);
        }).on('end', async () => {
            try {
                const data = JSON.parse(body.toString());
                const userData = {
                    email: data.email,
                    firstname: data.fname,
                    lastname: data.lname,
                    username: data.uname,
                    phone: data.phone,
                    password: data.password
                };
                const existingUser = await Prisma.user.findUnique({
                    where: {
                        email: userData.email,
                    },
                });

                if (existingUser) {
                    response.statusCode = 409;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify({ error: "Email already registered" }));
                    return;
                }
                const user = await Prisma.user.create({
                    data: userData
                });

                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ message: "User created successfully" }));
                console.log(user);
            } catch (err) {
                console.error("Error in adding user data", err);
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ error: "Internal Server Error" }));
            }
        });
    } else if (request.method === "POST" && request.url === "/user") {
        try {
            const data = await Prisma.user.findMany();
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ message: "user fetched successfully" }));
            response.end(data);
        } catch (err) {
            response.statusCode = 500;
            response.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if(request.method === "POST" && request.url === "/login"){
        let body = '';

        request.on('data', chunk => {
            body += chunk;
        }).on('end', async () => {
            try {
                const data = JSON.parse(body);
                const dataFromDb = await Prisma.user.findUnique({
                    where: {
                        email: data.email,
                        password: data.password,
                    }
                });
                if (dataFromDb) {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify({ message: "you are logged in" }));
                }
            } catch (err) {
                console.log("error", err);
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ error: "Internal Server Error" }));
            }
        });
    } else {
        response.end(JSON.stringify({ error: '404 Not Found!!! enter a valid url' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`listening to http://${hostname}:${port}`);
});
