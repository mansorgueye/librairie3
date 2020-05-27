import React, { useState } from "react";
import { Livre } from "../model/Livre";
import { IonList, IonItem, IonLabel, IonAvatar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { star, starOutline, square, squareOutline, checkmark, checkmarkDone, reload } from "ionicons/icons";
import { modifierBookFavori, modifierBookAlire, modifierBookLu } from "../storage/db";

interface Props {
  livres: Livre[];
  searchtext: string ;
}

const Livres = ({ livres , searchtext}: Props) => {

 


  return(
  <IonList>
    {livres.filter((livre)=> !searchtext || livre.titre.toLowerCase().includes(searchtext.toLowerCase()) )
    .map((livre) => {
      var iconFavori:string=(livre.favori==="oui")?star:starOutline; 
      var iconAlire:string=(livre.alire==="oui")?square:squareOutline; 
      var iconLu:string=(livre.lu==="oui")?checkmarkDone:checkmark; 
      
    return(
      <IonItem key={livre.titre}>
        <IonLabel>
       
          <h2>{livre.titre}</h2>
          <h3>{livre.auteur}</h3>
        </IonLabel>
        <IonButtons>
          
          <IonButton
          onClick={() => { modifierBookFavori(livre) ; iconFavori=(iconFavori===squareOutline)?star:starOutline;}
          }
          >
          <IonIcon icon={iconFavori} />
          </IonButton>
          <IonButton
          onClick={() => {
                modifierBookAlire(livre);
                iconAlire=(iconAlire===squareOutline)?square:squareOutline; 
             
            }
          }
          >
           <IonIcon icon={iconAlire} />
          </IonButton>
          <IonButton
          onClick={() => {

                modifierBookLu(livre);
                iconLu=(iconLu===checkmarkDone)?checkmark:checkmarkDone; 
              
            }
          }
          >
      <IonIcon icon={iconLu} />
           
          </IonButton>
        </IonButtons>
      </IonItem>
    )})}
  </IonList>

);
        };

export default Livres;