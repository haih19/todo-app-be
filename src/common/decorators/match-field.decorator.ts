import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

type MatchFieldConstraints = {
  fieldToMatch: string;
  option?: {
    caseInsensitive?: boolean;
    trim?: boolean;
  };
};

export function MatchField(fieldToMatch: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'matchField',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{ fieldToMatch }],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const constraints: MatchFieldConstraints = args.constraints[0];
          let fieldValue = args.object[constraints.fieldToMatch];

          if (
            constraints.option?.trim &&
            typeof value === 'string' &&
            typeof fieldValue === 'string'
          ) {
            value = value.trim();
            fieldValue = fieldValue.trim();
          }

          if (
            constraints.option?.caseInsensitive &&
            typeof value === 'string' &&
            typeof fieldValue === 'string'
          ) {
            value = value.toLowerCase();
            fieldValue = fieldValue.toLowerCase();
          }

          return value === fieldValue;
        },
      },
    });
  };
}
