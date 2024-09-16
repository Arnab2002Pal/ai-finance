import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { googleAuthentication, checkUserOrCreate } from "../api/utility/api";


export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {                
                const userData = {
                    email: credentials?.email,
                    password: credentials?.password
                }
                
                const user = await checkUserOrCreate('credentials', userData)                
                return {
                    id: user.userData.id,
                    name: user.userData.name,
                    email: user.userData.email,
                    profile: user.userData.profile,
                    token: user.userData.token
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID! || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        signIn: async ({ account, user }: any) => {
            if (account.provider === 'google') {
                const userData = {
                    provider: account.provider,
                    token: account.token_type + " " + account.id_token
                }              
                user.accessToken = await googleAuthentication('session', { userData })
                return true;
            }else if(account.provider === "credentials"){
                return true
            }
            return false
        },
        jwt: async ({ token, user }: any) => {
            if (user) {                
                token = { 
                    access_token: user.accessToken.token,
                    user_id: user.accessToken.data.id,
                    name: user.accessToken.data.name,
                    email: user.accessToken.data.email,
                    profile: user.accessToken.data.profile_image
                 }
            }
            return token
        },
        session: ({ session, token }: any) => {
            // TODO
        
            session.accessToken = token.accessToken
            session.user.user_id = token.user_id
            session.user.image = token.profile                        
            return session;
        }
    },
    pages: {
        signIn: "/signin", 
    }
}