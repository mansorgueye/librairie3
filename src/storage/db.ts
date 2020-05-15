import { SQLite } from "@ionic-native/sqlite";
import { Tache } from "../model/Tache";
import { isPlatform } from "@ionic/react";
import defaultTasks from "../model/data/taches.json";
import donnees from "../model/data/data.json";

var inMemoryTasks = defaultTasks;

donnees.forEach(function(element){
  inMemoryTasks = [...inMemoryTasks,
    {
      titre: element.fields.titre!,
      auteur: element.fields.auteur!,
    }];
});

const initDBIfNeeded = async () => {
  const db = await SQLite.create({
    name: "data2.db",
    location: "default",
  });
  await db.executeSql(
    "CREATE TABLE IF NOT EXISTS taches(identifiant INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, auteur TEXT, photo TEXT)",
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

export const addTask = async (tache: Tache) => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    inMemoryTasks = [...inMemoryTasks, tache];
    return inMemoryTasks;
  }

  await (
    await initDBIfNeeded()
  ).executeSql("INSERT INTO taches(titre,auteur,photo) VALUES(?,?,?)", [
    tache.titre,
    tache.auteur,
    tache.photo,
  ]);

  return getTasks();
};
