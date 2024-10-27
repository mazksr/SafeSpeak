"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function logOut() {
    (await cookies()).set("access_token", "");
    redirect("/");
}

export async function checkLoggedIn() {
    const cookie = (await cookies()).get("access_token")
    if (!cookie) {
        return {loggedIn: false, is_admin: false};
    }

    const post = await fetch(`${process.env.API_URL}/protected`, {
        credentials: "include",
        cache: "no-store",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookie?.value}`
        }
    })

    if (post.ok) {
        console.log("logged in")
        return {logged_in: true}
    } else {
        console.log("not logged in")
        console.log(post.status)
        console.log(cookie?.value)
        return {logged_in: false}
    }
}