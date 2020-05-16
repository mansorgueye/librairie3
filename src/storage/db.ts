import { SQLite } from "@ionic-native/sqlite";
import { Tache } from "../model/Tache";
import { isPlatform } from "@ionic/react";
import defaultTasks from "../model/data/taches.json";
import donnees from "../model/data/data.json";

var inMemoryTasks = defaultTasks;
var inMemoryTasksFavori = defaultTasks.filter((x)=>x.favori==="oui");
var inMemoryTasksAlire = defaultTasks.filter((x)=>x.alire==="oui");
var inMemoryTasksLu = defaultTasks.filter((x)=>x.lu==="oui");

donnees.forEach(function(element){
  inMemoryTasks = [...inMemoryTasks,
    {
      titre: element.fields.titre!,
      auteur: element.fields.auteur!,
      favori: "non",
      alire: "non",
      lu: "non"
    }];
});

const initDBIfNeeded = async () => {
  const db = await SQLite.create({
    name: "data2.db",
    location: "default",
  });
  await db.executeSql(
    "CREATE TABLE IF NOT EXISTS taches(identifiant INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, auteur TEXT, photo TEXT, favori TEXT)",
    []
  );
  return db;
};

export const getTasks = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryTasks;
  }

  const data = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM taches",
    []
  );
  const retour: Tache[] = [];
  for (let index = 0; index < data.rows.length; index++) {
    const element = data.rows.item(index);
    retour.push(element);
  }
  return retour;
};

export const getTasksFavori = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryTasksFavori;
  }

  const datafav = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM taches",
    []
  );
  const retourfav: Tache[] = [];
  for (let index = 0; index < datafav.rows.length; index++) {
    if (inMemoryTasks[index].favori === "oui") {
      const element = datafav.rows.item(index);
      retourfav.push(element);
    }
  }
  return retourfav;
};

export const getTasksAlire = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryTasksAlire;
  }

  const dataalire = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM taches",
    []
  );
  const retouralire: Tache[] = [];
  for (let index = 0; index < dataalire.rows.length; index++) {
    if (inMemoryTasks[index].alire === "oui") {
      const element = dataalire.rows.item(index);
      retouralire.push(element);
    }
  }
  return retouralire;
};

export const getTasksLu = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryTasksLu;
  }

  const datalu = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM taches",
    []
  );
  const retourlu: Tache[] = [];
  for (let index = 0; index < datalu.rows.length; index++) {
    if (inMemoryTasks[index].lu === "oui") {
      const element = datalu.rows.item(index);
      retourlu.push(element);
    }
  }
  return retourlu;
};

export const addTask = async (tache: Tache) => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    inMemoryTasks = [...inMemoryTasks, tache];
    return inMemoryTasks;
  }

  await (
    await initDBIfNeeded()
  ).executeSql("INSERT INTO taches(titre,auteur,photo,favori) VALUES(?,?,?,?)", [
    tache.titre,
    tache.auteur,
    tache.photo,
    tache.favori,
  ]);

  return getTasks();
};
