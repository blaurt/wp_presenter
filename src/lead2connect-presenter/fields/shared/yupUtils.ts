import * as yup from 'yup';


export const concatSchemas = (schemas: (yup.Schema<any> | undefined)[], i = 0, initialSchema?: yup.Schema<any>): yup.Schema<any> => {
  if (!initialSchema) { // Sets first schema from array as initial to concat with
    initialSchema = schemas[i++];
    return concatSchemas(schemas, i, initialSchema);
  }
  if (i < schemas.length) {
    const schema = schemas[i++];
    if (schema) {
      initialSchema = initialSchema.concat(schema);
    }
    return concatSchemas(schemas, i, initialSchema)
  } else {
    if (typeof initialSchema == undefined) throw new Error('You have to provide at least one schema.')
    return initialSchema;
  }
}