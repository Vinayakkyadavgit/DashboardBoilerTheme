export interface FormFields {
    type: string,
    label: string,
    inputType: string,
    name: string,
    validations: Array<CustomFormValidator>,
    value?: any
}


export interface CustomFormValidator {
    name: string,
    validator: string,
    message: string
}
