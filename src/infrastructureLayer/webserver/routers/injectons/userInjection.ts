import { UserAdapter } from "../../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../../usecaseLayer/usecase/userUsecase";
import { userModel } from "../../../database/mongodb/models/userModel";
import { userRepository } from "../../../database/mongodb/repository/userRepository";

const userRepositories = new userRepository(userModel)
const userUsecase = new UserUseCase(userRepositories);
export const UserAdapters = new UserAdapter(userUsecase)