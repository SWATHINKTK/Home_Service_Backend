import { Next, Req, Res } from "../../infrastructureLayer/types/expressTypes";
import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { adminLogin } from "./admin/adminLogin";
import { findAllUsers } from "./user/findAllUser";


export class AdminUseCase{

    private readonly userRepository:IUserRepository;
    private readonly adminRepository:IAdminRepository
    private readonly secretHashService:ISecretHasher;
    private readonly jwtService:IJWT;
    constructor( adminRepository:IAdminRepository,secretHashService:ISecretHasher, jwtService:IJWT, userRepository:IUserRepository ){
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.secretHashService = secretHashService;
        this.jwtService = jwtService;

    }

    async adminLogin( { username, password }:{ username:string, password:string }){
        return adminLogin(
            this.adminRepository,
            this.secretHashService,
            this.jwtService,
            username,
            password,
        )
    }


    async findAllUsers(){
        return findAllUsers(this.userRepository);
    }

    
}