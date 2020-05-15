import React, { useState, useEffect } from "react";
import "./ExploreContainer.css";
import Taches from "./Todolist";
import AjoutTache from "./AjoutTache";
import { getTasks, addTask } from "../storage/db";
import { Tache } from "../model/Tache";
import {IonSearchbar, IonToolbar} from "@ionic/react"

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getTasks().then((res) => setTaches(res));
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
      <AjoutTache nouvelleTache={(tache) => addTask(tache).then(setTaches)} />
      <Taches taches={taches} searchtext={searchText}></Taches>
    </>
  );
};

export default ExploreContainer;
