import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { googleAuthentication, credentialAuthentication } from "../api/utility/api";


export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;
                
                try {
                    const user = await credentialAuthentication('credentials', {
                        email: credentials.email,
                        password: credentials.password
                    });
                    
                    if (!user || !user.userData) {
                        return null;
                    }
                    
                    return {
                        id: user.userData.id,
                        name: user.userData.name,
                        email: user.userData.email,
                        profile: user.userData.profile,
                    };
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            }
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
                    token: `${account.token_type} ${account.id_token}`
                }              
                user.accessToken = await googleAuthentication('session', { userData }).then(result => result.data)
                return true;
            }else if(account.provider === "credentials"){
                user.accessToken = user
                return true
            }
            return false
        },
        jwt: async ({ token, user }: any) => {
            if (user) {                
                token = { 
                    user_id: user.accessToken.id,
                    name: user.accessToken.name,
                    email: user.accessToken.email,
                    profile: user.accessToken.profile_image
                }
            }
            return token
        },
        session: ({ session, token }: any) => {
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