import React, { useState, useEffect } from "react";
import "./ExploreContainer.css";
import Livres from "./Booklist";
import AjoutLivre from "./AjoutLivre";
import { getBooks, getBooksFavori, addBook } from "../storage/db";
import { Livre } from "../model/Livre";
import {IonSearchbar, IonToolbar, IonIcon, IonButton} from "@ionic/react"
import { micOutline } from "ionicons/icons";
import { SpeechRecognition } from '@ionic-native/speech-recognition';

let options = {

language: "fr-FR",
matches:1,
prompt:"dites le titre de livre à rechercher",
showPopup: true,
showPartial :true


}
interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [searchText, setSearchText] = useState("");

    
  
    getBooks().then((res) => setLivres(res));
   
    

  return (
    <>
      <IonToolbar>
     
    
        <IonSearchbar
          value={searchText}
          type="tel"
          inputmode="text"
          placeholder="titre du livre"
          onIonChange={(e) => setSearchText(e.detail.value!)}
        > 
         <IonButton onClick={()=>{ 
          
          // Request permissions

          SpeechRecognition.hasPermission()
          .then((permission : boolean)=>
          { SpeechRecognition.requestPermission();})

          SpeechRecognition.startListening(options)
           .subscribe(
    (matches: string[]) =>{ if (matches && matches.length>0){setSearchText(matches[0]);}},
    (onerror) => alert('on a pas compris, reessayez svp !')
  );
 
  SpeechRecognition.stopListening();

         }}>
          <IonIcon icon={micOutline}>
            </IonIcon>

            </IonButton>   
            </IonSearchbar>
       
      </IonToolbar>
      <AjoutLivre nouvelleLivre={(livre) => addBook(livre).then(setLivres)} />
      <Livres livres={livres} searchtext={searchText}></Livres>
    </>
  );
};

export default ExploreContainer;
