import { Schema, SchemaFormatType, SchemaProperty, SchemaType } from "../types/types.js";

export class SchemaBuilder implements Schema {

    readonly name!: string;
    readonly type?: SchemaType;
    readonly ref?: string;
    readonly items!: { ref: string };
    readonly properties: SchemaProperty[] = [];
    readonly required?: string[];
    readonly example?: any;

    constructor(data?: Schema) {
        Object.assign(this, data);
    }

    /**
     * Sets the name of the scheme
     * 
     * Schema name is used for schema components
     * 
     * @param name - The name of the scheme
     */
    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    /**
     * Sets the scheme of the scheme
     * @param type - The type of the scheme
     */
    public setType(type: SchemaType) {

        Reflect.set(this, 'type', type);
        return this;
    }

    /**
     * Sets the ref of the scheme
     * 
     * Ref or reference is used for finding a specific scheme.
     * @example
     * // this is a ref string. 
     * "#/components/responses/ftp/post"
     * @param ref - The ref of the scheme
     */
    public setRef(ref: string) {

        Reflect.set(this, 'ref', ref);
        return this;
    }

    /**
     * Sets the ref for every item.
     * items has only effect whenever type is "array"
     * @param ref - The ref for the items
     */
    public setItems(ref: string) {

        this.items ? this.items.ref = ref : Reflect.set(this, 'items', {ref});

        return this;
    }

    public addProperty(property: SchemaPropertyBuilder | ((property: SchemaPropertyBuilder) => SchemaPropertyBuilder)) {

        const result = typeof property === 'function' ? property(new SchemaPropertyBuilder()) : property;

        this.properties.findIndex((x) => x.name === property.name) === -1 ? this.properties.push(result) : null;
        return this;
    }

    public toJSON() {
        const obj: any = {name: this.name, type: this.type};

        // only adding when type isn't undefined
        
        if(this.ref !== undefined) {
            obj.$ref = this.ref;
        }

        if(this.required !== undefined) {
            obj.required = this.required
        }

        if(this.example !== undefined) {
            obj.example = this.example;
        }

        if (this.type === 'array') {
            obj.items = { $ref: this.items.ref };
        } else if (this.type === 'object') {
            obj.properties = this.properties.reduce((properties, property) => {
                let {propertyType: _, name: __, ...obj}: any = property

                for(const prop in obj) {
                    
                    // removing falsey values & empty arrays
                    if(obj[prop] === undefined || (Array.isArray(obj[prop]) && obj[prop].length == 0)) {
                        delete obj[prop]
                    }
                }

                return {
                    ...properties,
                    [property['name']]: {
                        ...obj,
                        type: property.type,
                    }
                }
            },
            {})
        }

        return obj;
    }
}

export class SchemaPropertyBuilder implements SchemaProperty {
    readonly type!: SchemaType;
    readonly name!: string;
    readonly description?: string;
    readonly title?: string;
    readonly format?: SchemaFormatType;
    readonly maximum?: number;
    readonly minimum?: number;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly pattern?: string;
    readonly readOnly?: boolean;
    readonly writeOnly?: boolean;
    readonly enum: (string | number)[] = [];
    readonly example?: any;
    readonly deprecated?: boolean;

    constructor(data?: SchemaProperty) {

        Object.assign(this, data)
    }

    public setType(propertyType: SchemaType) {
        
        Reflect.set(this, 'type', propertyType);
        return this;
    }

    public setName(name: string) {
        
        Reflect.set(this, 'name', name);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public setTitle(title: string) {
        
        Reflect.set(this, 'title', title);
        return this;
    }

    public setFormat(format: SchemaFormatType) {

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

    public setReadOnly(readOnly: boolean) {

        Reflect.set(this, 'readOnly', readOnly);
        return this;
    }

    public setWriteOnly(writeOnly: boolean) {

        Reflect.set(this, 'writeOnly', writeOnly);
        return this;
    }

    public addEnum(_enum: string | number) {

        this.enum?.findIndex((x) => x == _enum) == -1 ? this.enum.push(_enum) : null;
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

    public setDeprecated(deprecated: boolean) {
        
        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }
}