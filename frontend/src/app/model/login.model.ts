export interface loginReq{
    Username:string | null
    password:string | null
}

export interface loginResponse{
    Token:string
}

export interface logOutResponse{
    message:string
}