import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        ],
    pages:{
        signIn: "/login",
    },
    callbacks:{
        // cannot log token or session
        session: async ({token, session}) => {
            if(session?.user && token?.sub){
                session.user.id = token.sub
                // console.log("current token: " + token)
            }
            console.log("no token found: " + token)
            return session
        }
    }
}

export default NextAuth(authOptions)