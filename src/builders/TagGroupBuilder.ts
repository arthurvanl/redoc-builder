import { TagGroup } from "../types/types.js";

export class TagGroupBuilder implements TagGroup {
    readonly name!: string;
    readonly tags: string[] = [];

    public constructor(data?: TagGroup) {

        Object.assign(this, data);
    }

    public setName(name: string) {

        Reflect.set(this, 'name', name);
        return this;
    }

    public addTag(tag: string) {

        this.tags.findIndex((x) => x === tag) === -1 ? this.tags.push(tag) : null;
        return this;
    }

    public setTags(tags: string[]) {

        Reflect.set(this, 'tags', tags);
        return this;
    }

    public toJSON(): any {

        return {
            name: this.name,
            tags: this.tags
        }
    }
}