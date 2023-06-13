export interface FormFields {
    type: string,
    label: string,
    inputType: string,
    name: string
    validations: Array<CustomFormValidator>
}


export interface CustomFormValidator {
    name: string,
    validator: string,
    message: string
}
