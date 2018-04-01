declare namespace APIResponse {
    interface signUp {
        status?: string,
        error?:string,
        userId?: {
            id: number,
            role: string
        }
    } 

    interface login {
        status?: string,
        error?:string,
        token?: string
    }
}