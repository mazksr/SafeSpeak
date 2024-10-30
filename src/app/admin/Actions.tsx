"use server"

import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export async function handleDelete(id: number) {
    const URL = `${process.env.API_URL}/history/${id}`;
    const post = await fetch(URL, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`
        }
    })
    if (post.ok) {
        revalidatePath("/admin")
    }
}

interface State {
    message: string,
    success: boolean
}
export async function handleEdit(prevState: State, formData: FormData) {
    const id = formData.get("id");
    const komentar = formData.get("komentar");
    const isPositive = formData.get("Sentimen") == "Positive";

    let post: Response;
    const URL = `${process.env.API_URL}/history/${id}`;
    if (!isPositive) {
        const sentiments = {
            HS: !!formData.get("HS"),
            Abusive: !!formData.get("Abusive"),
            HS_Individual: !!formData.get("HS_Individual"),
            HS_Group: !!formData.get("HS_Group"),
            HS_Religion: !!formData.get("HS_Religion"),
            HS_Race: !!formData.get("HS_Race"),
            HS_Physical: !!formData.get("HS_Physical"),
            HS_Gender: !!formData.get("HS_Gender"),
            HS_Other: !!formData.get("HS_Other"),
            HS_Weak: !!formData.get("HS_Weak"),
            HS_Moderate: !!formData.get("HS_Moderate"),
            HS_Strong: !!formData.get("HS_Strong")
        };

        const requestBody = {
            komentar,
            is_positive: isPositive,
            ...sentiments,
        };

        post = await fetch(URL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`
            },
            body: JSON.stringify(requestBody)
        })
    } else {
        post = await fetch(URL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`
            },
            body: JSON.stringify({
                komentar,
                is_positive: isPositive
            })
        })
    }

    if (post.ok) {
        revalidatePath("/admin")
        return {message: "Berhasil", success: true}
    }
    return {message: "Gagal", success: false}

}
