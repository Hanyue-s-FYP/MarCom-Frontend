import type { User } from "./User";

export interface BusinessPublicProfile {
  DisplayName: string;
  BusinessType: string;
  Description: string;
  CoverImgPath?: File | string;
}

export type RegisterBusinessData = User &
  Omit<BusinessPublicProfile, "CoverPic"> & { CoverImgPath: string };

export type GetBusinessData = User &
  Omit<BusinessPublicProfile, "CoverPic"> & { CoverImgPath: string; ID: number };
