import { Content, Schema } from "../types/types.js";
import { SchemaBuilder } from "./Schema.js";

export class ContentBuilder implements Content {
    readonly name!: string;
    readonly schema!: SchemaBuilder;
    readonly example?: any;
    readonly examples?: any;

    public constructor(data?: Content) {
        
        Object.assign(this, data);
    }

    /**
     * Sets the name of this media content object
     * 
     * @param name - the name of this media content object
     */
    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    /**
     * Sets the schema of this media content object
     * 
     * @param schema - the schema of thsi media content object
     */
    public setSchema(schema: SchemaBuilder | ((schema: SchemaBuilder) => SchemaBuilder)) {

        const result = typeof schema === 'function' ? schema(new SchemaBuilder()) : schema;

        Reflect.set(this, 'schema', result);
        return this;
    }

    /**
     * Sets the property example. This can be of any type\
     * 
     * The example object should be in the correct format as specified by the media type
     * 
     * @param example - the example of this property
     */
    public setExample(example: any) {

        Reflect.set(this, 'example', example);
        return this;
    }

    /**
     * Sets the media content examples. This can be of any type
     * 
     * Each example should match the media type and specified schema if present.
     * 
     * @param example - the examples of this media content object
     */
    public setExamples(examples: any) {

        Reflect.set(this, 'examples', examples);
        return this;
    }

    public toJSON(): any {

        const obj: any = { name: this.name, schema: this.schema.toJSON() };

        if(this.example !== undefined) {
            obj.example = this.example;
        }

        if(this.examples !== undefined) {
            obj.examples = this.examples;
        }
        
        return obj;
    }
}