import { RedocUtils } from "./utils";
import { Server } from "../types";

export class ServerBuilder extends RedocUtils implements Server {
    readonly url!: string;
    readonly description!: string;

    public constructor(data?: Server) {
        super();

        this.addProps(data);
    }

    public setUrl(url: string) {

        Reflect.set(this, 'url', url);
        return this;
    }

    public setDescription(...line: string[]) {

        Reflect.set(this, 'description', line.join("\n"));
        return this;
    }
}