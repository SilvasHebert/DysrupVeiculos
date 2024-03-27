import {Realm} from '@realm/react';

export class Trip extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  userId!: Realm.BSON.ObjectId;
  carPlate!: string;
  finality!: string;
  checkInLat!: number;
  CheckInLng!: number;
  CheckInAt!: Date;
  checkInAddress!: string;
  CheckOutLat?: number;
  CheckOutLng?: number;
  checkOutAddress?: string;
  checkOutAt?: Date;
  active!: Boolean;

  static schema = {
    name: 'Trip',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      userId: 'objectId',
      carPlate: 'string',
      finality: 'string',
      checkInLat: 'float',
      CheckInLng: 'float',
      checkInAddress: 'string',
      CheckInAt: 'date',
      CheckOutLat: 'float?',
      CheckOutLng: 'float?',
      checkOutAddress: 'string?',
      checkOutAt: 'date?',
      active: 'bool',
    },
  };
}
