import { inject, Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { FirebaseStorage } from 'firebase/storage';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private storage: FirebaseStorage;
  private afs = inject(AngularFirestore);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  editMode: boolean = false;
  constructor() {
    this.storage = getStorage();
  }
  uploadImage(
    selectedImg: File,
    postData: Post,
    formStatus: string,
    id: string
  ) {
    const filePath = `postIMG/${Date.now()}`;

    const storageRef = ref(this.storage, filePath);
    uploadBytesResumable(storageRef, selectedImg).then(() => {
      getDownloadURL(storageRef).then((url) => {
        postData.postImgPath = url;
        if (formStatus === 'Edit') {
          this.updateData(postData, id);
        } else {
          this.saveData(postData);
        }
      });
    });
  }
  saveData(postData: Post) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data Insert Successfully..!');
        this.router.navigate(['/posts']);
      });
  }
  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  loadEditData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }
  updateData(postData: Post, id: string) {
    this.afs
      .collection('posts')
      .doc(id)
      .update(postData)
      .then((docRef) => {
        this.toastr.success('Data Update Successfully..!');
        this.router.navigate(['/posts']);
      });
  }
  deleteImage(pathImage: any, id: string) {
    const storageRef = ref(this.storage, pathImage);
    deleteObject(storageRef).then(() => {
      this.deleteData(id);
    });
  }
  deleteData(id: string) {
    this.afs
      .doc(`posts/${id}`)
      .delete()
      .then((docRef) => {
        this.toastr.success('Post Deleted Successfully..!');
      });
  }
  markFeatured(id: string, featuredData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(featuredData)
      .then(() => {
        this.toastr.info('Featured Status Updated');
      });
  }
}
