import { Objects, SpecificLocations, States } from "@prisma/client";

export interface FullObjectData extends Objects {
    category: {
      name: string;
    };
    state: States;
    specific_location: SpecificLocations;
  }