import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google credentials are not defined.");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session?.user && session?.user?.email) {
        const sessionUser = await User.findOne({ email: session.user.email });
        // @ts-ignore
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      if (!profile) return false;
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            // @ts-ignore
            image: profile?.picture,
          });
        }

        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error checking if user exists: ", error.message);
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
