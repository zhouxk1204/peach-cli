import { frameworkList, variantList } from "../constants";
import { Framework, Variant } from "../types/index.type";

export const isValidateFramework = (framework: Framework): boolean => frameworkList.includes(framework);
export const isValidateVariant = (variant: Variant): boolean => variantList.includes(variant);