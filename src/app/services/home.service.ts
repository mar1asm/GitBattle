import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { IUser } from '../components/home/home.component';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    ref: any;
    constructor(private database: AngularFirestore) {
        this.ref = database.collection("Users");
    }


    getMostSearched() {
        return this.ref.snapshotChanges();
    }

    addUser(user) {
        this.database.collection("Users").doc(user).set({ login: user, count: 1 });
    }

    updateUser(user: string) {
        let docRef = this.ref.doc(user);

        const sub= this.database.collection("Users", ref => ref.where('login', "==", user)).snapshotChanges().subscribe(res => {
            sub.unsubscribe();
            if (res.length == 0) {
                this.addUser(user);
            } else {
                return docRef.update({ count: firebase.firestore.FieldValue.increment(1) });
            }
        });
    }

}