import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private db: IDBPDatabase<any>;

  constructor() {
    this.connectToDb();
  }

  async connectToDb() {
    this.db = await openDB<any>('my-db', 1, {
      upgrade(db) {
        db.createObjectStore('user-store');
      },
    });
  }

  getUser =async (keyName)=>{
    let returnData = {}
    // console.log(this.db.get('user-store',"name"))
    await this.db.get('user-store',keyName).then(async data=>{
       returnData = await data
    }).catch(err=>console.log)
    debugger
    console.log(returnData)
    return await returnData
  }


  addUser(name: any, keyName) {
    console.log(keyName)
    debugger
    return this.db.put('user-store', name, keyName);
  }

  deleteUser(key: string) {
    return this.db.delete('user-store', key);
  }
}

interface MyDB extends DBSchema {
  'user-store': {
    key: string;
    value: any;
  };
}