export type KebabToPascalCase<S extends string> = S extends `${infer T}-${infer U}`
  ? `${Capitalize<T>}${KebabToPascalCase<U>}`
  : Capitalize<S>;