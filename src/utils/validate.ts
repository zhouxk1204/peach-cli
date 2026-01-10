import { frameworkList, variantList } from "../constants";
import { Framework, Variant } from "../types/index.type";

export const isValidFramework = (framework: Framework): boolean => frameworkList.includes(framework);
export const isValidVariant = (variant: Variant): boolean => variantList.includes(variant);
