import type { ZodObject, ZodRawShape, ZodTypeAny } from 'zod';
import { ZodDate, ZodNumber, ZodString } from 'zod';

export function validate<T extends ZodRawShape>(formData: FormData, schema: ZodObject<T>) {
  const mappedFormData = mapFormDataToSchema(schema, formData);

  return schema.parse(mappedFormData);
}

function convertValue(value: FormDataEntryValue, schemaType: ZodTypeAny): any {
  const actualType =
    schemaType._def.typeName === 'ZodOptional' || schemaType._def.typeName === 'ZodNullable'
      ? schemaType._def.innerType
      : schemaType;
  switch (actualType.constructor) {
    case ZodString:
      return String(value);
    case ZodNumber:
      return Number(value);
    case ZodDate:
      return new Date(String(value));
    default:
      // Add more type conversions as needed
      return value;
  }
}

function mapFormDataToSchema<T extends ZodRawShape>(
  schema: ZodObject<T>,
  formData: FormData
): { [key in keyof T]: any } {
  const keys = getSchemaKeys(schema);
  const result: { [key in keyof T]: any } = {} as { [key in keyof T]: any };

  keys.forEach((key) => {
    const value = formData.get(key as string);
    const schemaType = schema.shape[key];
    if (!!value) {
      result[key] = convertValue(value, schemaType);
    } else {
      result[key] = null;
    }
  });

  return result;
}

function getSchemaKeys<T extends ZodRawShape>(schema: ZodObject<T>): (keyof T)[] {
  return Object.keys(schema.shape) as (keyof T)[];
}
