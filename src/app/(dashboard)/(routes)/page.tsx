"use client";

import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      session: {JSON.stringify(session?.user)}
    </div>
  );
}
export default Home;
