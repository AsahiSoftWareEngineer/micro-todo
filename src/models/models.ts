export const init = async () => {
  await window.api.initJSON("./src/db/db.json");
};

export const readDB = async () => {
  const data = await window.api.readJSON("./src/db/db.json");
  return data
}
