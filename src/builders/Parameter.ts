import { Content, Parameter, ParameterIn, ParameterStyle } from "../types/types.js";
import { ContentBuilder } from "./Content.js";
import { SchemaBuilder } from "./Schema.js";

export class ParameterBuilder implements Parameter {
    readonly in!: ParameterIn;
    readonly style?: ParameterStyle;
    readonly explode?: boolean;
    readonly allowReserved?: boolean;
    readonly schema?: SchemaBuilder;
    readonly content: Content[] = [];
    readonly name!: string;
    readonly description?: string;
    readonly maximum?: number;
    readonly minimum?: number;
    readonly enum: (string | number)[] = [];
    readonly example?: any;
    readonly examples?: any;
    readonly deprecated?: boolean;
    readonly allowEmptyValue?: boolean;
    readonly required?: boolean;

    public constructor(data?: Parameter) {

        Object.assign(this, data);
    }

    /**
     * Sets the location of this parameter
     * 
     * @param _in - The location for this parameter
     */
    public setIn(_in: ParameterIn) {
        
        Reflect.set(this, 'in', _in);
        return this;
    }

    /**
     * Sets the name of this parameter
     * 
     * @param name - the name of this parameter
     */
    public setName(name: string) {
        
        Reflect.set(this, 'name', name);
        return this;
    }

    /**
     * Sets the style for this parameter
     * 
     * Describes how the parameter value will be serialized depending on the type of the parameter value. 
     * 
     * Default values (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form
     * 
     * @param style - The style for this parameter
     */
    public setStyle(style: ParameterStyle) {

        Reflect.set(this, 'style', style);
        return this;
    }

    /**
     * Sets the explode for this parameter
     * 
     * When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map. 
     * 
     * For other types of parameters this property has no effect. 
     * 
     * When style is form, the default value is true. 
     * 
     * For all other styles, the default value is false.
     * 
     * @param explode - The explode boolean for this parameter
     */
    public setExplode(explode: boolean = true) {

        Reflect.set(this, 'explode', explode);
        return this;
    }

    /**
     * Sets the allowReserved
     * 
     * Determines whether the parameter value should allow reserved characters, 
     * as defined by RFC3986 :/?#[]@!$&'()*+,;= to be included without percent-encoding. 
     * 
     * This property only applies to parameters with an in value of query. 
     * 
     * The default value is false.
     * 
     * @link https://tools.ietf.org/html/rfc3986#section-2.2
     * 
     * @param allowReserved - The allow reserved characters for this parameter.
     */
    public setAllowReserved(allowReserved: boolean = true) {

        Reflect.set(this, 'allowReserved', allowReserved);
        return this;
    }

    /**
     * Sets The schema object used for this parameter.
     * 
     * @param schema - The schema object used for this parameter.
     */
    public setSchema(schema: SchemaBuilder | ((schema: SchemaBuilder) => SchemaBuilder)) {

        const result = typeof schema === 'function' ? schema(new SchemaBuilder()) : schema;

        Reflect.set(this, 'schema', result);
        return this;
    }

    /**
     * Adds a media content object in an array
     * 
     * @param content - the media content object for this parameter
     */
    public addContent(content: ContentBuilder | ((content: ContentBuilder) => ContentBuilder)) {

        const result = typeof content === 'function' ? content(new ContentBuilder()) : content;

        this.content.push(result);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
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

    public setDeprecated(deprecated: boolean = true) {
        
        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }

    /**
     * Sets the allowEmptyValue for this parameter
     * 
     * @description
     * Sets the ability to pass empty-valued parameters. 
     * 
     * This is valid only for query parameters and allows sending a parameter with an empty value. 
     * 
     * Default value is false. 
     * 
     * If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. 
     * 
     * Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
     * 
     * @param allowEmptyValue - the allowEmptyValue for this parameter
     */
    public setAllowEmptyValue(allowEmptyValue: boolean = true) {

        Reflect.set(this, 'allowEmptyValue', allowEmptyValue);
        return this;
    }

    /**
     * Sets the parameter required.
     * 
     * Determines whether this parameter is mandatory. 
     * 
     * If the parameter location is "path", this property is required and its value MUST be true. 
     * 
     * Otherwise, the property MAY be included and its default value is false.
     * 
     * @param required - The required boolean for this parameter
     */
    public setRequired(required: boolean = true) {

        Reflect.set(this, 'required', required);
        return this;
    }

    public toJSON(): any {

        const obj: any = {
            name: this.name,
            in: this.in,
            description: this.description,
            required: this.required,
            deprecated: this.deprecated,
            allowEmptyValue: this.allowEmptyValue,
            style: this.style,
            explode: this.explode,
            allowReserved: this.allowReserved,
            schema: this.schema?.toJSON(),
            example: this.example,
            examples: this.examples,
            maximum: this.maximum,
            minimum: this.minimum,
            enum: this.enum
        }

        obj.content = this.content.reduce((contents, content) => {
            
            const obj = new ContentBuilder(content).toJSON();
            delete obj.name;

            return {
                ...contents,
                [content['name']]: {
                    ...obj
                }
            }

        }, {})

        return obj;
    }
}
