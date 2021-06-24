import { request } from "express";
import { verify } from "jsonwebtoken";

import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

interface IPayload {
    sub: string;
}

describe("Authenticate User", ()=>{

    beforeEach(()=>{
        userRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory);
    });

    it("should be able to receive a token through the header, and return the user's profile", async()=>{
        const user = await createUserUseCase.execute({
            name: "Gilberto Medeiros", 
            email: "gsm@test.com", 
            password: "123456"
        });

        console.log(user);
        
        const userAuthenticated = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })
          
        const { sub: user_id } = verify(userAuthenticated.token, 'senhasupersecreta123') as IPayload;
        
        expect(userAuthenticated).toHaveProperty("id");
    });

});