import { Field, InputType, Int } from "type-graphql";
import { Person } from "./../Person";

@InputType()
export class PersonInput implements Partial<Person> {

    @Field({ nullable: true })
    private id?: number;

    @Field({ nullable: false })
    private name: string;

    @Field((type) => Int, { nullable: true })
    private age?: number;

    @Field({ nullable: true })
    private dateBirth?: string;

    public toPerson(personInput: PersonInput): Person {
        return new Person(personInput.id, personInput.name, personInput.age, personInput.dateBirth);
    }

    /**
     * Getter $id
     * @return {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public setId(value: number) {
        this.id = value;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public setName(value: string) {
        this.name = value;
    }

}
