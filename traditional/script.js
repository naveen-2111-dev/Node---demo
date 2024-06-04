async function getData() {
    try {
        const datas = await fetch("http://127.0.0.1:10000/user", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log("Fetched Users:", datas);

        if (!datas.ok) {
            console.log("no record found!!!");
            return;
        }

        const data = await datas.text();
        console.log(data,"2")
        ShowData(data)
    } catch (err) {
        console.log("error", err);
    }
}

function ShowData(dataRes) {                            
    console.log("data found", dataRes);
}

// model User {
//   id        Int    @id @default(autoincrement())
//   email     String @unique
//   firstname String
//   lastname  String
//   username  String @unique
//   phone     BigInt
//   password  String

// adding data

async function AddInput() {
    try {
        const res = await fetch("http://127.0.0.1:10000/users-signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "naveen237@gmail.com",
                fname: "naveen", 
                lname: "rajan M",  
                uname: "NRE_2111",  
                phone: "6382817065",
                password: "sting"
            })
        });

        const data = await res.json();

        console.log("data added successfully !!!", data);
    } catch (error) {
        console.error("error", error);
    }
}

async function LoginUser() {
    try {
        const response = await fetch("http://127.0.0.1:10000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "naveen@gmail.com",
                pass: "sting"
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log("error in logging in", err);
    }
}

function main() {
    AddInput();
    getData();
    LoginUser();
}

main().then(() => {
    console.log("success-fully executed")
}).catch((err) => {
    console.log(err);
})