import { ValidatorConstraintInterface, ValidationArguments } from "class-validator";
export declare class IsMongoId implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
