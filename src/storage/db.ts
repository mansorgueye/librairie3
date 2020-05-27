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
    name: "data3.db",
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
    "SELECT * FROM livres WHERE favori= 'oui' ",
    []
  );
  const retourfav: Livre[] = [];
  for (let index = 0; index < datafav.rows.length; index++) {
    
      const element = datafav.rows.item(index);
      retourfav.push(element);
    
  }
  return retourfav;
};

export const getBooksAlire = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryBooksAlire;
  }

  const dataalire = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM livres WHERE alire='oui'",
    []
  );
  const retouralire: Livre[] = [];
  for (let index = 0; index < dataalire.rows.length; index++) {
    
      const element = dataalire.rows.item(index);
      retouralire.push(element);
  }
  return retouralire;
};

export const getBooksLu = async () => {
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    return inMemoryBooksLu;
  }

  const datalu = await (await initDBIfNeeded()).executeSql(
    "SELECT * FROM livres WHERE lu='oui'",
    []
  );
  const retourlu: Livre[] = [];
  for (let index = 0; index < datalu.rows.length; index++) {
    
      const element = datalu.rows.item(index);
      retourlu.push(element);
    
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
  ).executeSql("INSERT INTO livres(titre,auteur,favori,alire,lu) VALUES(?,?,?,?,?)", [
    livre.titre,
    livre.auteur,
    livre.favori,
    livre.alire,
    livre.lu,
  ]);

  return getBooks();
};

export const modifierBookFavori = async (livre: Livre) => {

  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    let index = 0;
    while (index < inMemoryBooks.length && inMemoryBooks[index].titre !== livre.titre) {
      index++;
    }
    inMemoryBooks[index].favori = (inMemoryBooks[index].favori==="oui")?"non":"oui";
    inMemoryBooksFavori = inMemoryBooks.filter((x)=>x.favori==="oui");
   return  //inMemoryBooks;
  }
  await (
    await initDBIfNeeded()
  ).executeSql("UPDATE  livres SET favori=? WHERE titre=? ", [
    (livre.favori==="oui")?"non":"oui",
    livre.titre
  ]);

    return //getBooks();
};

export const modifierBookAlire = async (livre: Livre, ) => {
  
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    let index = 0;
    while (index < inMemoryBooks.length && inMemoryBooks[index].titre !== livre.titre) {
      index++;
    }
    inMemoryBooks[index].alire= (inMemoryBooks[index].alire==="oui")?"non":"oui";
    inMemoryBooksAlire = inMemoryBooks.filter((x)=>x.alire==="oui");
    return //inMemoryBooks;
  }
  await (
    await initDBIfNeeded()
  ).executeSql("UPDATE  livres SET alire=? WHERE titre=? ", [
    (livre.alire==="oui")?"non":"oui",
    livre.titre
  ]);

  return //getBooks();
    

};

export const modifierBookLu = async (livre: Livre) => {
  
  if (!isPlatform("android") && !isPlatform("ios")) {
    // Pas sur mobile, comportement dégradé
    let index = 0;
    while (index < inMemoryBooks.length && inMemoryBooks[index].titre !== livre.titre) {
      index++;
    }
    inMemoryBooks[index].lu = (inMemoryBooks[index].lu==="oui")?"non":"oui";
    inMemoryBooksLu = inMemoryBooks.filter((x)=>x.lu==="oui");
    return //inMemoryBooks;
  }
  await (
    await initDBIfNeeded()
  ).executeSql("UPDATE  livres SET lu=? WHERE titre=? ", [
    (livre.lu==="oui")?"non":"oui",
    livre.titre
  ]);

  return //getBooks();
    

};