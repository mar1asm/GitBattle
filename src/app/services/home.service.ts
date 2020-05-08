import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { IProfile } from '../profile/IProfile';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    ref: any;
    constructor(private database: AngularFirestore) {
        this.ref = database.collection("Profiles");
    }


    getMostSearched() {
        return this.ref.snapshotChanges();
    }

    addUser(profile: IProfile) {
        this.ref.doc(profile.login).set({ login: profile.login,name: profile.name, image: profile.avatar_url, profileLink:profile.html_url, count: 1 });
    }

    updateUser(profile: IProfile) {
        let docRef = this.ref.doc(profile.login);

        const sub= this.database.collection("Profiles", ref => ref.where('login', "==", profile.login)).snapshotChanges().subscribe(res => {
            sub.unsubscribe();
            if (res.length == 0) {
                this.addUser(profile);
            } else {
                return docRef.update({ count: firebase.firestore.FieldValue.increment(1) });
            }
        });
    }

}