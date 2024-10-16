"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function logOut() {
    cookies().set("access_token", "");
    redirect("/");
}

export async function checkLoggedIn() {
    if (!cookies().get("access_token")) {
        return {loggedIn: false, is_admin: false};
    }

    const post = await fetch("http://127.0.0.1:8000/protected", {
        cache: "no-store",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookies().get("access_token")?.value}`
        }
    })

    if (post.ok) {
        return {logged_in: true}
    } else {
        return {logged_in: false}
    }
}