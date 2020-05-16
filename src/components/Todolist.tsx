import React from "react";
import { Tache } from "../model/Tache";
import { IonList, IonItem, IonLabel, IonAvatar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { star, starOutline, square, squareOutline, checkmark, checkmarkDone } from "ionicons/icons";
import { modifierTaskFavori, modifierTaskAlire, modifierTaskLu } from "../storage/db";

interface Props {
  taches: Tache[];
  searchtext: string ;
}

const Taches = ({ taches , searchtext}: Props) => (

  <IonList>
    {taches.filter((tache)=>!searchtext || tache.titre.toLowerCase().includes(searchtext.toLowerCase()) )
    .map((tache) => (
      <IonItem key={tache.titre}>
        <IonLabel>
          {tache.photo && (
            <IonAvatar slot="start">
              <img alt="" src={`data:image/png;base64, ${tache.photo}`} />
            </IonAvatar>
          )}
          <h2>{tache.titre}</h2>
          <h3>{tache.auteur}</h3>
        </IonLabel>
        <IonButtons>
          <IonButton
          onClick={() => {
              if (tache.favori==="oui") {
                modifierTaskFavori(tache, "non");
              } else {
                modifierTaskFavori(tache, "oui");
              }
            }
          }
          >
            {tache.favori==="non" && (<IonIcon icon={starOutline} />)}
            {tache.favori==="oui" && (<IonIcon icon={star} />)}
          </IonButton>
          <IonButton
          onClick={() => {
              if (tache.alire==="oui") {
                modifierTaskAlire(tache, "non");
              } else {
                modifierTaskAlire(tache, "oui");
              }
            }
          }
          >
            {tache.alire==="non" && (<IonIcon icon={squareOutline} />)}
            {tache.alire==="oui" && (<IonIcon icon={square} />)}
          </IonButton>
          <IonButton
          onClick={() => {
              if (tache.lu==="oui") {
                modifierTaskLu(tache, "non");
              } else {
                modifierTaskLu(tache, "oui");
              }
            }
          }
          >
            {tache.lu==="non" && (<IonIcon icon={checkmark} />)}
            {tache.lu==="oui" && (<IonIcon icon={checkmarkDone} />)}
          </IonButton>
        </IonButtons>
      </IonItem>
    ))}
  </IonList>

);

export default Taches;
