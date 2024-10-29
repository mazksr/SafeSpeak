 "use server"

 import {cookies} from "next/headers";

 interface State {
        message: string,
        success: boolean
 }
 export async function loginAction(prevState: State, formData: FormData) {
     const username = formData.get("username");
     const password = formData.get("password");

     const post = await fetch(`${process.env.API_URL}/login`, {
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
         (await cookies()).set("access_token", response.access_token, {
             domain: ".safespeak.info",
             secure: true
         })
         return { message: "success", success: true }
     } else {
         return { message: "failed", success: false }
     }

 }