import { RedocUtils } from "./utils";
import { SchemaProperty, SchemaPropertyType, SchemaPropertyFormatType } from "../types";

export class PropertyBuilder extends RedocUtils implements SchemaProperty {
    readonly name!: string;
    readonly type!: SchemaPropertyType;
    readonly format?: SchemaPropertyFormatType;
    readonly title?: string;
    readonly description?: string;
    readonly maximum?: number;
    readonly minimum?: number;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly pattern?: string;
    readonly readOnly?: boolean;
    readonly writeOnly?: boolean;
    readonly enum?: (string | number)[] = [];
    readonly example?: any;
    readonly deprecated?: boolean;

    public setType(type: SchemaPropertyType) {
        
        Reflect.set(this, 'type', type);
        return this;
    }

    public setName(name: string) {
        
        Reflect.set(this, 'name', name);
        return this;
    }

    public setDescription(...line: string[]) {

        Reflect.set(this, 'description', line.join("\n"));
        return this;
    }

    public setTitle(title: string) {
        
        Reflect.set(this, 'title', title);
        return this;
    }

    public setFormat(format: SchemaPropertyFormatType) {

        Reflect.set(this, 'format', format);
        return this;
    }

    public setMaximum(maximum: number) {

        Reflect.set(this, 'maximum', maximum);
        return this;
    }

    public setMinimum(minimum: number) {

        Reflect.set(this, 'minimum', minimum);
        return this;
    }

    public setLength(length: number) {
        
        Reflect.set(this, 'maxLength', length);
        Reflect.set(this, 'minLength', length);
        return this;
    }

    public setMaxLength(maxLength: number) {

        Reflect.set(this, 'maxLength', maxLength);
        return this;
    }

    public setMinLength(minLength: number) {

        Reflect.set(this, 'minLength', minLength);
        return this;
    }

    public setPattern(pattern: string) {

        Reflect.set(this, 'pattern', pattern);
        return this;
    }

    /**
     * Sets the property to readOnly. 
     * 
     * This prevents request bodies to be without this property if reference is set
     * @param readOnly wether this property should be readOnly. Default is true
     * @returns 
     */
    public setReadOnly(readOnly: boolean = true) {

        Reflect.set(this, 'readOnly', readOnly);
        return this;
    }
    /**
     * Sets the property to writeOnly. 
     * 
     * This prevents response bodies to be without this property if reference is set
     * @param writeOnly wether this property should be writeOnly. Default is true
     * @returns 
     */
    public setWriteOnly(writeOnly: boolean = true) {

        Reflect.set(this, 'writeOnly', writeOnly);
        return this;
    }

    public addEnum(_enum: string | number) {

        this.enum?.findIndex((x) => x == _enum) == -1 ? this.enum.push(_enum) : null;
        return this;
    }

    public setEnum(enums: (string | number)[]) {

        Reflect.set(this, 'enum', enums);
        return this;
    }

    /**
     * Sets the property example. This can be of any type
     * 
     * @param example - the example of this property
     */
    public setExample(example: any) {

        Reflect.set(this, 'example', example);
        return this;
    }

    /**
     * Sets the property deprecation
     * 
     * @param deprecated - value for setting the deprecation
     * @returns 
     */
    public setDeprecated(deprecated: boolean = true) {
        
        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }

    public toJSON() {

        return this.removeUndefinedKeys({
            type: this.type,
            format: this.format,
            title: this.title,
            description: this.description,
            maximum: this.maximum,
            minimum: this.minimum,
            maxLength: this.maxLength,
            minLength: this.minLength,
            pattern: this.pattern,
            readOnly: this.readOnly,
            writeOnly: this.writeOnly,
            enum: this.enum,
            example: this.example,
            deprecated: this.deprecated
        });
    }
}