"use server"

import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export async function handleDelete(id: number) {
    const URL = `http://127.0.0.1:8000/history/${id}`;
    const post = await fetch(URL, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookies().get("access_token")?.value}`
        }
    })
    if (post.ok) {
        console.log("ehhh")
        revalidatePath("/history")
    }
}

export async function handleEdit(prevState: any, formData: FormData) {
    const id = formData.get("id")
    const komentar = formData.get("komentar")
    const sentimen = formData.get("sentimen")
    const klasifikasi = formData.get("hateSpeechLabels")

    const URL = `http://127.0.0.1:8000/history/${id}`;
    const post = await fetch(URL, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookies().get("access_token")?.value}`
        },
        body: JSON.stringify({
            komentar,
            sentimen,
            ...(klasifikasi !== "None" && {klasifikasi})
        })
    })
    const response = await post.json()
    if (post.ok) {
        revalidatePath("/history")
        return {message: response.message, success: true}
    }
    return {message: response.message, success: false}
}
