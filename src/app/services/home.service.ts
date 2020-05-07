import { environment } from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';


export class HomeService{
    constructor( private firestore: AngularFirestore){ 
    }

    getMostSearched(){
        return this.firestore.collection("Users").snapshotChanges();
    }
}