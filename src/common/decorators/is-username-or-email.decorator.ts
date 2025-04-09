import { RegexConstant } from '@/common/constants/regex';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsUsernameOrEmail(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUsernameOrEmail',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            (RegexConstant.EMAIL.test(value) || RegexConstant.USERNAME.test(value))
          );
        },
        defaultMessage(_args: ValidationArguments) {
          return `${property} must be a valid email or username.`;
        },
      },
    });
  };
}
