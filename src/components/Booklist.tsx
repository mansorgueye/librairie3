import React from "react";
import { Livre } from "../model/Livre";
import { IonList, IonItem, IonLabel, IonAvatar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { star, starOutline, square, squareOutline, checkmark, checkmarkDone } from "ionicons/icons";
import { modifierBookFavori, modifierBookAlire, modifierBookLu } from "../storage/db";

interface Props {
  livres: Livre[];
  searchtext: string ;
}

const Livres = ({ livres , searchtext}: Props) => (

  <IonList>
    {livres.filter((livre)=>!searchtext || livre.titre.toLowerCase().includes(searchtext.toLowerCase()) )
    .map((livre) => (
      <IonItem key={livre.titre}>
        <IonLabel>
        
          <h2>{livre.titre}</h2>
          <h3>{livre.auteur}</h3>
        </IonLabel>
        <IonButtons>
          <IonButton
          onClick={() => {
              if (livre.favori==="oui") {
                modifierBookFavori(livre, "non");
              } else {
                modifierBookFavori(livre, "oui");
              }
            }
          }
          >
            {livre.favori==="non" && (<IonIcon icon={starOutline} />)}
            {livre.favori==="oui" && (<IonIcon icon={star} />)}
          </IonButton>
          <IonButton
          onClick={() => {
              if (livre.alire==="oui") {
                modifierBookAlire(livre, "non");
              } else {
                modifierBookAlire(livre, "oui");
              }
            }
          }
          >
            {livre.alire==="non" && (<IonIcon icon={squareOutline} />)}
            {livre.alire==="oui" && (<IonIcon icon={square} />)}
          </IonButton>
          <IonButton
          onClick={() => {
              if (livre.lu==="oui") {
                modifierBookLu(livre, "non");
              } else {
                modifierBookLu(livre, "oui");
              }
            }
          }
          >
            {livre.lu==="non" && (<IonIcon icon={checkmark} />)}
            {livre.lu==="oui" && (<IonIcon icon={checkmarkDone} />)}
          </IonButton>
        </IonButtons>
      </IonItem>
    ))}
  </IonList>

);

export default Livres;
