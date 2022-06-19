import { v4 as uuidv4 } from "uuid";

import { IUser } from "./interfaces";

export const findUserById = (id: string, db: IUser[]) => {
  return db.find((account) => account.id === id);
};

export const createNewUser = async (body: string): Promise<IUser> => {
  try {
    const userBody = await JSON.parse(body);
    return { id: uuidv4(), ...userBody };
  } catch (error) {
    throw error;
  }
};

export const upgradeUser = async (
  body: string,
  user: IUser | undefined
): Promise<IUser> => {
  try {
    const userBody = await JSON.parse(body);

    return { ...user, ...userBody };
  } catch (error) {
    throw error;
  }
};

export const getUserIndex = (id: string, db: IUser[]) => {
  return db.map((user) => user.id).indexOf(id);
};

export const deleteUserById = (id: string, db: IUser[]) => {
  const index = getUserIndex(id, db);
  return db.splice(index, 1);
};
