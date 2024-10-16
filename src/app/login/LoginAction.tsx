 "use server"

 import {cookies} from "next/headers";
 import {redirect} from "next/navigation";

 export async function loginAction(prevState: any, formData: FormData) {
     const username = formData.get("username");
     const password = formData.get("password");

     const post = await fetch("http://127.0.0.1:8000/login", {
         method: "POST",
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             username,
             password
         })
     })
     const response = await post.json();
     if (post.ok) {
         cookies().set("access_token", response.access_token)
         redirect("/history")
         return { message: response.message, success: true }
     } else {
         return { message: response.message, success: false }
     }

 }