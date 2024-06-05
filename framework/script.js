async function SignIn() {
    try {
    const email =  "naveen93@gmail.com"
    const fname =  "naveen"
    const lname =  "rajan M"
    const uname =  "N_2111"
    const phone =  "6382817065"
    const password =  "sting"
    const response = await fetch("http://127.0.0.2:10001/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email,
        fname,
        lname,
        uname,
        phone,
        password
      }),
      headers: { "Content-Type": "application/json" } 
    });

    if (response.ok) {
      const data = await response.json(); 
      console.log("data added successfully:", data); 
    } else {
      console.error("Sign-in failed:", response.statusText); 
    }
  } catch (error) {
    console.error("Error during sign-in:", error); 
  }
}

SignIn();
