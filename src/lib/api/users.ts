import { get } from "./utils"

export async function getUsers(): Promise<{ users: User[] }> {
    return get("/users");
}
