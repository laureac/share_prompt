"use client";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
  children: ReactNode;
  session?: Session;
};

const Provider = ({ children, session }: ProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
