export type TranslationValue =
  | string
  | { [key: string]: TranslationValue }
  | Array<{ [key: string]: string | number }>;

export type TranslationObject = {
  [key: string]: TranslationValue;
};

export type Translation = {
  [key: string]: TranslationObject;
};
