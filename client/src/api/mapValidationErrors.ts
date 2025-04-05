export interface ValidationError {
    field: string;
    messages: string[];
}

export function mapValidationErrors(errors: Record<string, string[]>): ValidationError[] {
    return Object.entries(errors).map(([field, messages]) => ({
        field,
        messages,
    }));
}