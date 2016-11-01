import {Serializable} from '../interfaces/serializable';
import {Injectable} from "@angular/core";

@Injectable()
export class Session implements Serializable<Session> {
  public id: number;
  public userId: number;
  public sessionKey: Int32Array;
  public expiryDate: number;
  /*constructor(public id:number,
   public userId:number,
   public sessionKey:Int32Array,
   public expiryDate:number){}*/

  deserialize(input) {
    this.id = input.id;
    this.userId = input.userId;
    this.sessionKey = input.sessionKey;
    this.expiryDate = input.expiryDate;
    return this;
  }
}
