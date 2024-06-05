const express = require('express')
const app = express();
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
require("dotenv").config()
const port = process.env.PORT_NEW
const hostname = process.env.HOST_NEW

app.listen(port, () => {
    console.log(`listening to port http://${hostname}:${port}` )
})

app.post("/sign-in", async(req,res) => {
    const requestData = req.body

    if (requestData) {
        const userdata = {
            email: requestData.email,
            firstname: requestData.fname,
            lastname: requestData.lname,
            username: requestData.uname,
            phone: requestData.phone,
            password: requestData.password
        }

        const userChecker = Prisma.user.findUnique({
            where: {
                email: userdata.email,
                username: userdata.username
            }
        })

        if (userChecker) {
            res.status(500)
                .json("email || user alredy exist")
                .statusMessage('user exist')

            return
        }

        try {
            Prisma.user.create({
                data: userdata
            })
        } catch (err) {
            res.status(500)
                .json("not able to add data")
                .statusMessage("server error")
            console.log(err)
        }

        return
    } 
})