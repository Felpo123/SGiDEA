import { writeFile } from "fs/promises";
import path from "path";

export const upload = async (userPhoto: File) => {
    try {        
        const bytes = await userPhoto.arrayBuffer();
        const buffer = Buffer.from(bytes);
       
        const filePath = path.join(process.cwd(),"static","imgs",userPhoto.name);
        writeFile(filePath,buffer);
        return true;
    } catch (error) {
        return false;        
    }
}