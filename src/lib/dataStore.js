import fs from "fs/promises";
import path from "path";
import defaultProfile from "../../data/profile.json";
import defaultProjects from "../../data/projects.json";
import defaultExperience from "../../data/experience.json";
import defaultCertificates from "../../data/certificates.json";

const DEFAULTS = {
  profile: defaultProfile,
  projects: defaultProjects,
  experience: defaultExperience,
  certificates: defaultCertificates,
};


const DATA_DIR = path.join(process.cwd(), "data");

const FILES = {
  profile: "profile.json",
  projects: "projects.json",
  experience: "experience.json",
  certificates: "certificates.json",
};

const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKV(key) {
  const url = `${process.env.KV_REST_API_URL}/get/${key}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`KV GET failed: ${res.statusText}`);
  }
  const data = await res.json();
  if (data.result === null || data.result === undefined) {
    return null;
  }
  try {
    return typeof data.result === "string" ? JSON.parse(data.result) : data.result;
  } catch {
    return data.result;
  }
}

async function setKV(key, data) {
  const url = `${process.env.KV_REST_API_URL}/set/${key}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`KV SET failed: ${res.statusText}`);
  }
  return data;
}

async function readJSON(key) {
  if (hasKV) {
    try {
      const data = await getKV(key);
      if (data !== null) {
        return data;
      }
      // If Vercel KV doesn't have the data yet, populate it from local files
      const localData = await readLocalJSON(key);
      await setKV(key, localData);
      return localData;
    } catch (err) {
      console.error("Vercel KV read error, falling back to local file:", err);
      return readLocalJSON(key);
    }
  }
  return readLocalJSON(key);
}

async function readLocalJSON(key) {
  try {
    const filePath = path.join(DATA_DIR, FILES[key]);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Local file read failed for ${key}, using bundled default:`, err.message);
    return DEFAULTS[key];
  }
}

async function writeJSON(key, data) {
  if (hasKV) {
    try {
      return await setKV(key, data);
    } catch (err) {
      console.error("Vercel KV write error, falling back to local file:", err);
      // Fall through to local write if KV write fails
    }
  }
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
