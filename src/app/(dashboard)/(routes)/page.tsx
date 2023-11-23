import { authOptions } from "@/lib/auth";
import { Role } from "@/types/role.d";
import { Session, getServerSession } from "next-auth";
import AdminHomePage from "../_components/admin-home";
import UserHomePage from "../_components/user-home";

async function Home() {
  const session = (await getServerSession(authOptions)) as Session;
  const { role } = session.user;

  return role === Role.ADMINISTRADOR ? <AdminHomePage /> : <UserHomePage />;
}

export default Home;
