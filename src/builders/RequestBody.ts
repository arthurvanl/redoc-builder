import { Content, RequestBody } from "../types/types.js";
import { ContentBuilder } from "./Content.js";

export class RequestBodyBuilder implements RequestBody {
    readonly description?: string;
    readonly content: Content[] = [];
    /** Determines if the request body is required in the request */
    readonly required?: boolean = false;

    public constructor(data?: RequestBody) {

        Object.assign(this, data);
    }
    
    /**
     * Sets the description of this request body
     * 
     * @param description - the description for this request body
     */
    public setDescription(description: string) {
        
        Reflect.set(this, 'description', description);
        return this;
    }

    /**
     * Adds a media content object in an array
     * 
     * @param content - the media content object for this request body
     * @returns 
     */
    public addContent(content: ContentBuilder | ((content: ContentBuilder) => ContentBuilder)) {

        const result = typeof content === 'function' ? content(new ContentBuilder()) : content;

        this.content.push(result);
        return this;
    }

    /**
     * Sets the request body required for this request
     * 
     * By default value is true
     * 
     * @param required - the required boolean for this request body
     */
    public setRequired(required: boolean = true) {
        
        Reflect.set(this, 'required', required);
        return this;
    }

    public toJSON(): any {

        const obj: any = {
            description: this.description,
            required: this.required ?? false
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