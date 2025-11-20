export const init = async () => {
  const isExists = await window.api.existsJSON("./src/db/db.json");
  if (isExists) return;
  await window.api.writeJSON("./src/db/db.json", {projects: [], tasks:[]});
};



export const readDB = async () => {
  const data = await window.api.readJSON("./src/db/db.json");
  return data
}
