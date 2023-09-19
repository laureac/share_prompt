import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ReactNode } from "react";

export const metadata = {
  title: "PromptHub",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <Provider>
        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
