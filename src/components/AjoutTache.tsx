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
import { Tache } from "../model/Tache";
import { camera , add} from "ionicons/icons";
import { CameraResultType } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera";

interface Props {
  nouvelleTache: (tache: Tache) => void;
}

const AjoutTache = ({ nouvelleTache }: Props) => {
  const [titre, setTitre] = useState<string>();
  const [auteur, setAuteur] = useState<string>();
  const { photo, getPhoto } = useCamera();
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
          nouvelleTache({
            titre: titre!,
            auteur: auteur!,
            photo: photo?.base64String,
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

export default AjoutTache;
