import { Objects, Users } from "@prisma/client";
import CreateAssignmentForm from "./_components/create-form";
import axios from "axios";
import { api_routes } from "@/routes";

const getUsers = async () => {
  try {
    const response = await axios.get(api_routes.users, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getObjects = async () => {
  try {
    const response = await axios.get(api_routes.objects, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

async function CreateAssignmentPage() {
  const users = getUsers();
  const objects = getObjects();

  const [usersData, objectsData] = (await Promise.all([users, objects])) as [
    Users[],
    Objects[]
  ];

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <CreateAssignmentForm usersData={usersData} objectsData={objectsData} />
    </div>
  );
}

export default CreateAssignmentPage;
