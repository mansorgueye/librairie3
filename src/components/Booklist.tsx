import React, { useState } from "react";
import { Livre } from "../model/Livre";
import { IonList, IonItem, IonLabel, IonAvatar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { star, starOutline, square, squareOutline, checkmark, checkmarkDone } from "ionicons/icons";
import { modifierBookFavori, modifierBookAlire, modifierBookLu, getBooks } from "../storage/db";

interface Props {
  livres: Livre[];
  searchtext: string ;
}

const Livres = ({ livres , searchtext}: Props) => {
 // const [livress,setLivres]=useState<Livre[]>(livres);
  const [favori,setFavori]=useState<String>("");
  const [alire,setAlire]=useState<String>("");
  const [lu,setLu]=useState<String>("");
  return(
  <IonList>
    {livres.filter((livre)=>!searchtext || livre.titre.toLowerCase().includes(searchtext.toLowerCase()) )
    .map((livre) => (

      
      <IonItem key={livre.titre}>
                {setFavori(livre.favori)}
                {setAlire(livre.alire)}
                {setLu(livre.lu)}

        <IonLabel>
          <h2>{livre.titre}</h2>
          <h3>{livre.auteur}</h3>
        </IonLabel>
        <IonButtons>
            <IonButton onClick={() =>  { //modifierBookFavori(livre).then(setLivres);
            (favori==="oui")?setFavori("non"):setFavori("oui");window.location.reload();}}

          >  
            {favori==="non" && (<IonIcon icon={starOutline} />)}
            {favori==="oui" && (<IonIcon icon={star} />)}
            
            
          </IonButton>
          <IonButton
          onClick={() => { //modifierBookAlire(livre).then(setLivres);
            window.location.reload() }}
          >
            {livre.alire==="non" && (<IonIcon icon={squareOutline} />)}
            {livre.alire==="oui" && (<IonIcon icon={square} />)}
          </IonButton>
          <IonButton
          onClick={() => {//modifierBookLu(livre).then(setLivres) 
            ; window.location.reload() }}
          
          >
            {livre.lu==="non" && (<IonIcon icon={checkmark} />)}
            {livre.lu==="oui" && (<IonIcon icon={checkmarkDone} />)}
          </IonButton>
        </IonButtons>
      </IonItem>
    ))}
  </IonList>
  
);
};

export default Livres;
