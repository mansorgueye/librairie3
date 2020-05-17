import React, { useState } from "react";
import {
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { Livre } from "../model/Livre";
import {  add} from "ionicons/icons";


interface Props {
  nouvelleLivre: (livre: Livre) => void;
}

const AjoutLivre = ({ nouvelleLivre }: Props) => {
  const [titre, setTitre] = useState<string>();
  const [auteur, setAuteur] = useState<string>();
  const [showAjout, setShowAjout] = useState<boolean>(false);
  return (
    <>
    <IonFab vertical="top"  activated= {showAjout} horizontal="end" slot="fixed" onClick={(e)=>{setShowAjout(!showAjout);}} >
          <IonFabButton > 
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
    <IonGrid hidden= {!showAjout} >
      <IonRow>
        <IonCol> <IonInput
        placeholder="titre"
        onIonChange={(e) => setTitre(e.detail.value!)}
      ></IonInput></IonCol>
      <IonCol>
      <IonTextarea
        placeholder="auteur"
        onIonChange={(e) => setAuteur(e.detail.value!)}
      ></IonTextarea>
      </IonCol>
      </IonRow>
      <IonRow>
      <IonCol>
      <IonButton
        onClick={() =>
          nouvelleLivre({
            titre: titre!,
            auteur: auteur!,
            favori: "non",
            alire: "non",
            lu: "non"
          })
        }
      >
        Ajouter
      </IonButton>
      </IonCol>
      </IonRow>
    </IonGrid>
     
     
      
    </>
  );
};

export default AjoutLivre;
