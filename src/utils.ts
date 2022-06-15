export const getIdFromUrl = (url: string) => {
  return url.split("/")[3];
};

export const checkIfValidId = (id: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(id);
};
