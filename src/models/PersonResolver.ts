import request_promise from "request-promise";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PersonInput } from "./inputs/PersonInput";
import { Person } from "./Person";

@Resolver(() => Person)
export class PersonResolver {
    private persons: Person[] = [];

    @Query((returns) => [Person])
    public async getPersons(): Promise<Person[]> {
        return request_promise.get("http://localhost:9090/persons")
            .then((response) => {
                return JSON.parse(response);
            })
            .catch((error) => {
                return error;
            });
    }

    @Query((returns) => Person)
    public async getPersonById(@Arg("id", { nullable: true }) id: number): Promise<Person> {
        return request_promise.get("http://localhost:9090/persons/" + id)
            .then((response) => {
                return JSON.parse(response);
            })
            .catch((error) => {
                return error;
            });
    }

    @Mutation((returns) => Person)
    public async addPerson(@Arg("person") personInput: PersonInput): Promise<Person> {
        const options = {
            body: personInput.toPerson(personInput),
            json: true,
            method: "POST",
            uri: "http://localhost:9090/persons"
        };

        return request_promise.post(options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    @Mutation((returns) => Person)
    public async updatePerson(@Arg("id", { nullable: false }) id: number,
                              @Arg("name", { nullable: false }) name: string,
                              @Arg("age", {nullable: false}) age: number): Promise<Person> {
        const person = new PersonInput();
        person.setName(name);
        person.setAge(age);

        const options = {
            body: person,
            json: true,
            method: "PATCH",
            uri: "http://localhost:9090/persons/" + id,
        };

        return request_promise.patch(options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    @Mutation((returns) => Person)
    public async putPerson(@Arg("id", { nullable: true }) id: number,
                           @Arg("person") personInput: PersonInput): Promise<Person> {
        const person = personInput.toPerson(personInput);

        const options = {
            body: person,
            json: true,
            method: "PUT",
            uri: "http://localhost:9090/persons/" + id,
        };

        return request_promise.put(options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    @Mutation((returns) => Person)
    public async deletePerson(@Arg("id", { nullable: true }) id: number): Promise<Person> {
        const options = {
            json: true,
            method: "DELETE",
            uri: "http://localhost:9090/persons/" + id,
        };

        return request_promise.delete(options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
}
