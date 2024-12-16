import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private afs = inject(AngularFirestore);
  private toastr = inject(ToastrService);
  saveData(data: {}) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        this.toastr.success('Data Insert Successfully..!');
      });
  }
  getData() {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  updateData(id: string, editData: {}) {
    this.afs
      .doc(`categories/${id}`)
      .update(editData)
      .then((docRef) => {
        this.toastr.success('Data Update Successfully..!');
      });
  }
  deleteData(id: string) {
    this.afs
      .doc(`categories/${id}`)
      .delete()
      .then((docRef) => {
        this.toastr.success('Data Deleted Successfully..!');
      });
  }
}
