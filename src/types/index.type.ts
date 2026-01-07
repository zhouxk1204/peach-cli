import { frameworkList, variantList } from "../constants";

export type Framework = (typeof frameworkList)[number];
export type Variant = (typeof variantList)[number];

export interface CreateCommandOption {
  framework: Framework;
  variant: Variant;
  remote: string;
}
