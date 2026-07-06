import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const FILES = {
  profile: "profile.json",
  projects: "projects.json",
  experience: "experience.json",
  certificates: "certificates.json",
};

async function readJSON(key) {
  const filePath = path.join(DATA_DIR, FILES[key]);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function writeJSON(key, data) {
  const filePath = path.join(DATA_DIR, FILES[key]);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

export async function getProfile() {
  return readJSON("profile");
}

export async function saveProfile(newProfile) {
  return writeJSON("profile", newProfile);
}

export async function getCollection(key) {
  return readJSON(key);
}

export async function saveCollection(key, list) {
  return writeJSON(key, list);
}

export async function addItem(key, item) {
  const list = await readJSON(key);
  const id = `${key.slice(0, 4)}-${Date.now()}`;
  const newItem = { id, ...item };
  list.push(newItem);
  await writeJSON(key, list);
  return newItem;
}

export async function updateItem(key, id, updates) {
  const list = await readJSON(key);
  const idx = list.findIndex((it) => it.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates, id };
  await writeJSON(key, list);
  return list[idx];
}

export async function deleteItem(key, id) {
  const list = await readJSON(key);
  const filtered = list.filter((it) => it.id !== id);
  await writeJSON(key, filtered);
  return filtered;
}
