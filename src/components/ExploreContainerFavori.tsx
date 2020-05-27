import React, { useState, useEffect } from "react";
import "./ExploreContainer.css";
import Livres from "./Booklist";
import AjoutLivre from "./AjoutLivre";
import { getBooks, getBooksFavori, addBook } from "../storage/db";
import { Livre } from "../model/Livre";
import {IonSearchbar, IonToolbar} from "@ionic/react"

interface ContainerProps {
  name: string;
}

const ExploreContainerfavori: React.FC<ContainerProps> = ({ name }) => {
  const [livresFavoris, setLivresFavori] = useState<Livre[]>([]);
  const [searchText, setSearchText] = useState("");

    
   getBooksFavori().then((res) => setLivresFavori(res));

  return (
    <>
      <IonToolbar>
        <IonSearchbar
          value={searchText}
          type="tel"
          placeholder="titre du livre"
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
      </IonToolbar>
      <Livres livres={livresFavoris} searchtext={searchText}></Livres>
    </>
  );
};

export default ExploreContainerfavori;
