import { SQLite } from "@ionic-native/sqlite";
import { Livre} from "../model/Livre";
import { isPlatform } from "@ionic/react";
import defaultBooks from "../model/data/livres.json";
import donnees from "../model/data/data.json";

var inMemoryBooks = defaultBooks;
var inMemoryBooksFavori = defaultBooks.filter((x)=>x.favori==="oui");
var inMemoryBooksAlire = defaultBooks.filter((x)=>x.alire==="oui");
var inMemoryBooksLu = defaultBooks.filter((x)=>x.lu==="oui");

donnees.forEach(function(element){
  inMemoryBooks = [...inMemoryBooks,
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
    "CREATE TABLE IF NOT EXISTS livres(identifiant INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT, auteur TEXT, favori TEXT, alire TEXT, lu TEXT)",
    []
  );
  return db;
};

export const getBooks = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryBooks;
  }

  const data = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM livres",
    []
  );
  const retour: Livre[] = [];
  for (let index = 0; index < data.rows.length; index++) {
    const element = data.rows.item(index);
    retour.push(element);
  }
  return retour;
};

export const getBooksFavori = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryBooksFavori;
  }

  const datafav = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM livres",
    []
  );
  const retourfav: Livre[] = [];
  for (let index = 0; index < datafav.rows.length; index++) {
    if (inMemoryBooks[index].favori === "oui") {
      const element = datafav.rows.item(index);
      retourfav.push(element);
    }
  }
  return retourfav;
};

export const getBooksAlire = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryBooksAlire;
  }

  const dataalire = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM livres",
    []
  );
  const retouralire: Livre[] = [];
  for (let index = 0; index < dataalire.rows.length; index++) {
    if (inMemoryBooks[index].alire === "oui") {
      const element = dataalire.rows.item(index);
      retouralire.push(element);
    }
  }
  return retouralire;
};

export const getBooksLu = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryBooksLu;
  }

  const datalu = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM livres",
    []
  );
  const retourlu: Livre[] = [];
  for (let index = 0; index < datalu.rows.length; index++) {
    if (inMemoryBooks[index].lu === "oui") {
      const element = datalu.rows.item(index);
      retourlu.push(element);
    }
  }
  return retourlu;
};

export const addBook = async (livre: Livre) => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    inMemoryBooks = [...inMemoryBooks, livre];
    return inMemoryBooks;
  }

  await (
    await initDBIfNeeded()
  ).executeSql("INSERT INTO livres(titre,auteur,avori) VALUES(?,?,?,?)", [
    livre.titre,
    livre.auteur,
    livre.favori,
    livre.alire,
    livre.lu,
  ]);

  return getBooks();
};

export const modifierBookFavori = async (livre2: Livre, favori: string) => {
    let index = 0;
    while (index < inMemoryBooks.length && inMemoryBooks[index].titre !== livre2.titre) {
      index++;
    }
    inMemoryBooks[index].favori = favori;
    inMemoryBooksFavori = inMemoryBooks.filter((x)=>x.favori==="oui");
    inMemoryBooksAlire = inMemoryBooks.filter((x)=>x.alire==="oui");
    inMemoryBooksLu = inMemoryBooks.filter((x)=>x.lu==="oui");
};

export const modifierBookAlire = async (livre2: Livre, alire:string) => {
  let index = 0;
  while (index < inMemoryBooks.length && inMemoryBooks[index].titre !== livre2.titre) {
    index++;
  }
  inMemoryBooks[index].alire = alire;
  inMemoryBooksFavori = inMemoryBooks.filter((x)=>x.favori==="oui");
  inMemoryBooksAlire = inMemoryBooks.filter((x)=>x.alire==="oui");
  inMemoryBooksLu = inMemoryBooks.filter((x)=>x.lu==="oui");
};

export const modifierBookLu = async (livre2: Livre, lu:string) => {
  let index = 0;
  while (index < inMemoryBooks.length && inMemoryBooks[index].titre !== livre2.titre) {
    index++;
  }
  inMemoryBooks[index].lu = lu;
  inMemoryBooksFavori = inMemoryBooks.filter((x)=>x.favori==="oui");
  inMemoryBooksAlire = inMemoryBooks.filter((x)=>x.alire==="oui");
  inMemoryBooksLu = inMemoryBooks.filter((x)=>x.lu==="oui");
};