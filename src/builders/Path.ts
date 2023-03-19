import { ComponentResponse, ExternalDocs, Parameter, PathItem, PathMethod, PathOperation } from "../types/types.js";
import { ComponentResponseBuilder } from "./ComponentResponse.js";
import { ParameterBuilder } from "./Parameter.js";
import { RequestBodyBuilder } from "./RequestBody.js";

export class PathBuilder implements PathItem {
    readonly path!: string;
    readonly '$ref'?: string | undefined;
    readonly summary!: string;
    readonly description!: string;
    readonly get?: PathOperation;
    readonly post?: PathOperation;
    readonly put?: PathOperation;
    readonly delete?: PathOperation;
    readonly options?: PathOperation;
    readonly head?: PathOperation;
    readonly patch?: PathOperation;
    readonly trace?: PathOperation;
    readonly servers?: any;
    readonly parameters: Parameter[] = [];

    public constructor(data?: PathItem) {

        Object.assign(this, data);
    }

    public setPath(path: string) {

        Reflect.set(this, 'path', path);
        return this;
    }

    public setRef(ref: string) {

        Reflect.set(this, '$ref', ref);
        return this;
    }

    public setSummary(summary: string) {

        Reflect.set(this, 'summary', summary);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    public addOperation(operation: PathOperationBuilder | ((operation: PathOperationBuilder) => PathOperationBuilder)) {

        const result = typeof operation === 'function' ? operation(new PathOperationBuilder()) : operation;

        Reflect.set(this, result.type, result);
        return this;
    }

    public addParameter(parameter: ParameterBuilder | ((parameter: ParameterBuilder) => ParameterBuilder)) {

        const result = typeof parameter === 'function' ? parameter(new ParameterBuilder()) : parameter;

        this.parameters.push(result);
        return this;
    }

    public toJSON(): any {

        const obj: any = {
            path: this.path,
            summary: this.summary,
            description: this.description,
        }

        if(this.parameters.length != 0) { obj.parameters = this.parameters };

        // only adding when type isn't undefined
        if(this.get !== undefined) { obj.get = new PathOperationBuilder(this.get).toJSON(); delete obj.get.type; }
        if(this.post !== undefined) { obj.post = new PathOperationBuilder(this.post).toJSON(); delete obj.post.type; }
        if(this.put !== undefined) { obj.put = new PathOperationBuilder(this.put).toJSON(); delete obj.put.type; }
        if(this.delete !== undefined) { obj.delete = new PathOperationBuilder(this.delete).toJSON(); delete obj.delete.type; }
        if(this.options !== undefined) { obj.options = new PathOperationBuilder(this.options).toJSON(); delete obj.options.type; }
        if(this.head !== undefined) { obj.head = new PathOperationBuilder(this.head).toJSON(); delete obj.head.type; }
        if(this.patch !== undefined) { obj.patch = new PathOperationBuilder(this.patch).toJSON(); delete obj.patch.type; }
        if(this.trace !== undefined) { obj.trace = new PathOperationBuilder(this.trace).toJSON(); delete obj.trace.type; }

        return obj;
    }
}

export class PathOperationBuilder implements PathOperation {
    readonly tags: string[] = [];
    readonly type!: PathMethod;
    readonly summary!: string;
    readonly description!: string;
    readonly operationId!: string;
    readonly externalDocs?: ExternalDocs;
    readonly parameters: Parameter[] = [];
    readonly requestBody?: RequestBodyBuilder;
    readonly responses: ComponentResponse[] = [];
    readonly callback?: any;
    readonly deprecated?: boolean;
    readonly security?: any;
    readonly servers?: any;

    public constructor(data?: PathOperation) {

        Object.assign(this, data);
    }

    /**
     * Adds a tag for this operation
     * 
     * Tags is a list of tags for API documentation control. 
     * 
     * Tags can be used for logical grouping of operations by resources or any other qualifier.
     * 
     * @param tag - The tag for this operation
     */
    public addTag(tag: string)     {

        this.tags.findIndex((x) => x == tag) == -1 ? this.tags.push(tag) : null;
        return this;
    }

    /**
     * Sets the type for this operation.
     * 
     * The type will be used in toJSON() method.
     * 
     * It'll be the root name of this operation.
     * 
     * @param type - The type for this operation
     */
    public setType(type: PathMethod) {

        Reflect.set(this, 'type', type);
        return this;
    }

    public setSummary(summary: string) {

        Reflect.set(this, 'summary', summary);
        return this;
    }

    public setDescription(description: string) {

        Reflect.set(this, 'description', description);
        return this;
    }

    /**
     * Sets the operationId for this operation
     * 
     * Unique string used to identify the operation. The id MUST be unique among all operations described in the API. 
     * 
     * The operationId value is case-sensitive. 
     * 
     * Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, 
     * it is RECOMMENDED to follow common programming naming conventions.
     * @param operationId - The operationId for this operation
     */
    public setOperationId(operationId: string) {

        Reflect.set(this, 'operationId', operationId);
        return this;
    }

    public addParameter(parameter: ParameterBuilder | ((parameter: ParameterBuilder) => ParameterBuilder)) {

        const result = typeof parameter === 'function' ? parameter(new ParameterBuilder()) : parameter;

        this.parameters.push(result);
        return this;
    }

    public setRequestBody(requestBody: RequestBodyBuilder | ((requestBody: RequestBodyBuilder) => RequestBodyBuilder)) {

        const result = typeof requestBody === 'function' ? requestBody(new RequestBodyBuilder) : requestBody;
        
        Reflect.set(this, 'requestBody', result);
        return this;
    }

    public addResponse(response: ComponentResponseBuilder | ((response: ComponentResponseBuilder) => ComponentResponseBuilder)) {

        const result = typeof response === 'function' ? response(new ComponentResponseBuilder()) : response;

        this.responses.push(result);
        return this;
    }

    public setDeprecated(deprecated: boolean = true) {

        Reflect.set(this, 'deprecated', deprecated);
        return this;
    }

    public toJSON(): any {
        
        const obj: any = {
            tags: this.tags,
            type: this.type,
            summary: this.summary,
            description: this.description,
            operationId: this.operationId,
            requestBody: this.requestBody?.toJSON(),
            deprecated: this.deprecated,
        }

        if(this.parameters.length != 0) { obj.parameters = this.parameters };

        obj.responses = this.responses.reduce((responses, response) => {
            
            const obj = new ComponentResponseBuilder(response).toJSON();
            delete obj.name;

            return {
                ...responses,
                [response['name']]: {
                    ...obj
                }
            }

        }, {});

        return obj;
    }
}