const http = require("http");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const port = process.env.PORT
const hostname = process.env.HOST

const server = http.createServer(async (request, response) => {
    if (request.method === 'POST' || request.url === "/users-signin") {
        let body= [];
        request.on('data', chunk => {
            body.push(chunk);
        }).on('end', async()=>{
            try {
                const data = JSON.parse(body);
                const user = await Prisma.user.create({
                    data: {
                        email: data.email,
                        firstname: data.fname,
                        lastname: data.lname,
                        username: data.uname,
                        phone: data.phone,
                        password: data.password
                    }
                })

                response.statusCode = 200
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify({ message: "user created succesfully" }));
                console.log(user)
            } catch(err) {
                console.error("Error in adding user data", err);
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ error: "Internal Server Error" }));
            }
        })
    } else if (request.method === "POST" || request.url === "/user") {
        try {
            const data = await Prisma.user.findMany()
            response.statusCode = 200
            response.setHeader('content-Type', 'application/json')
            response.end(JSON.stringify({ message: "user frtched succesfully", data }));
        } catch (err) {
            response.statusCode = 500
            response.end(JSON.stringify({ error: "cannot fetch the data" }));
        }
    } else {
        response.end(JSON.stringify({ error: '404 Not Found !!!' }));
    }
})

server.listen(port, hostname, () => {
    console.log(`listening to http://${hostname}:${port}`)
})