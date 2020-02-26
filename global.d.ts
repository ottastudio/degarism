/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="node"/>

import { Model, Document } from "mongoose";

// MONGOOSE MODEL AND SCHEMA
export declare interface IUserDocument extends Document {
  // USER DOCUMENT
  name: {
    first_name: string;
    last_name: string;
  };
  email: string;
  password: string;
  subscribe: boolean;
  role: number;
  cart: object[];
  accessToken: string;
  refreshToken: string[];
}
export declare type IUserModel = Model<IUserDocument>; // USER MODEL

export interface IFaqDocument extends Document {
  // FAQ SCHEMA
  topic: string;
  markup: string;
}
export type IFaqModel = Model<IFaqDocument>; // FAQ MODEL
export interface ICategoryDocument extends Document {
  // CATEGORY SCHEMA
  name: string;
}
export type ICategoryModel = Model<ICategoryDocument>; // FAQ MODEL

export interface ISiteDocument extends Document {
  name: {
    full: string;
    short: string;
  };
  domicile: {
    country: string;
    city: string;
    province: string;
    zip: string;
  };
  partners: Array<{ name: string; url: string }>;
  about: Array<{ body: string }>;
}
export type ISiteModel = Model<ISiteDocument>;

export declare type IDatabase = {
  User: IUserModel;
  Site: ISiteModel;
  Faq: IFaqModel;
  Category: ICategoryModel;
};
