import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", ()=>{

    beforeEach(()=>{
        userRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    });

    it("should be able to user authenticate and return is token", async()=>{
        const name = "Gilberto Medeiros";
        const email = "gsm@test.com";
        const password = "123456";

        await createUserUseCase.execute({
            name, 
            email, 
            password 
        });

        const user = await authenticateUserUseCase.execute({
            email,
            password
        }); 

        expect(user).toHaveProperty("token");
    });
});