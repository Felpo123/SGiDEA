import { Objects, Users } from "@prisma/client";
import CreateAssignmentForm from "./_components/create-form";
import axios from 'axios';

const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

const getObjects = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/objects', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

async function CreateAssignmentPage() {
  const usersData = await getUsers() as Users[];
  const objectsData = await getObjects() as Objects[];
   return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <CreateAssignmentForm usersData={usersData} objectsData={objectsData} />  
    </div>
   )
}

export default CreateAssignmentPage;