import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import user from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = NextAuth({
    providers: [GoogleProvider
        
    ]
})