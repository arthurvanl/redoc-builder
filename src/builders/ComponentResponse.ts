import { ComponentResponse, Content, PathMethod } from "../types/types.js";
import { ContentBuilder } from "./Content.js";

export class ComponentResponseBuilder implements ComponentResponse {
    readonly name!: string;
    readonly description!: string;
    /**
     * @todo NOT FULLY IMPLEMENTED YET
     * @link https://redocly.com/docs/openapi-visual-reference/header/
     */
    readonly headers?: any;
    readonly content: Content[] = [];
    /**
     * @todo NOT IMPLEMENTED YET
     * @link https://redocly.com/docs/openapi-visual-reference/links/
     */    
    readonly links?: any;

    public constructor(data?: ComponentResponse) {

        Object.assign(this, data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public setDescription(description: string) {
        
        Reflect.set(this, 'description', description);
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

    public toJSON(): any {

        const obj: any = {
            name: this.name,
            description: this.description,
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

        }, {});

        return obj;
    }
}