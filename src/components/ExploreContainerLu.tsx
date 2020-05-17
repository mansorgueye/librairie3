import React, { useState, useEffect } from "react";
import "./ExploreContainer.css";
import Livres from "./Booklist";
import AjoutLivre from "./AjoutLivre";
import { getBooks, getBooksLu, addBook } from "../storage/db";
import { Livre } from "../model/Livre";
import {IonSearchbar, IonToolbar} from "@ionic/react"

interface ContainerProps {
  name: string;
}

const ExploreContainerlu: React.FC<ContainerProps> = ({ name }) => {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getBooksLu().then((res) => setLivres(res));
  }, []);

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
      <Livres livres={livres} searchtext={searchText}></Livres>
    </>
  );
};

export default ExploreContainerlu;
