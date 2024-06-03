async function getData() {
    try {
        const data = await fetch("http://127.0.0.1:10000/user");

        if (!data.ok) {
            console.log("no record found !!!");
        }
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
                email: "naveen@gmail.com",
                fname: "naveen", 
                lname: "rajan",  
                uname: "NR_2111",  
                phone: 6382817065,
                password: "sting"
            })
        });

        const data = await res.json();

        console.log("data added successfully !!!", data);
    } catch (error) {
        console.error("error", error);
    }
}


function main() {
    AddInput();
    getData();
}

main();