const fetch = require('node-fetch');

async function getData() {
    const data = fetch("http://127.0.0.1:10000/user");

    if (!data) {
        console.log("no record found !!!");
    }

    const res = await data.json();
    console.log(res);
    ShowData(res)
}

function ShowData(dataRes) {
    
}