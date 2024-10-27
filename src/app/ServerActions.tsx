"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function logOut() {
    (await cookies()).set("access_token", "");
    redirect("/");
}

export async function checkLoggedIn() {
    if (!(await cookies()).get("access_token")) {
        return {loggedIn: false, is_admin: false};
    }

    const post = await fetch(`${process.env.API_URL}/protected`, {
        cache: "no-store",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`
        }
    })

    if (post.ok) {
        console.log("logged in")
        return {logged_in: true}
    } else {
        console.log("not logged in")
        console.log(post.status)
        return {logged_in: false}
    }
}