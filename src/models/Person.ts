import { GraphQLDate } from "graphql-iso-date";
import "reflect-metadata";
import "type-graphql";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Person {

    @Field({ nullable: false })
    private id: number;

    @Field({ nullable: false })
    private name: string;

    @Field((type) => Int, { nullable: true })
    private age?: number;

    @Field({ nullable: true })
    private dateBirth?: string;

    constructor($id?: number, $name?: string, $age?: number, $dateBirth?: string) {
        this.id = $id;
        this.name = $name;
        this.age = $age;
        this.dateBirth = $dateBirth;
    }

    /**
     * Getter $id
     * @return {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public setId(value: number) {
        this.id = value;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public setName(value: string) {
        this.name = value;
    }

}
