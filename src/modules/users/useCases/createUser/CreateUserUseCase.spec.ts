import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", ()=>{

    beforeEach(()=>{
        userRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able to create a new user", async ()=>{
        await createUserUseCase.execute({
            name: "Gilberto Medeiros", 
            email: "gsm@test.com", 
            password: "123456"
        });

        expect(201);
    });
    
});