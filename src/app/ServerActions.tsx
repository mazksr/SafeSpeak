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
        return {logged_in: false};
    }
    const post = await fetch(`${process.env.API_URL}/protected`, {
        cache: "no-store",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookie?.value}`
        }
    })


    if (post.ok) {
        return {logged_in: true}
    } else {
        return {logged_in: false}
    }
}