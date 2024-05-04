// Import necessary types and functions
import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { adminLogin } from "./admin/adminLogin";
import { adminLogout } from "./admin/adminLogout";
import { blockUser } from "./user/blockUser";
import { findAllUsers } from "./user/findAllUser";

/**
 ** Handles administrative tasks such as admin login, logout, user retrieval, and user blocking.
 */
export class AdminUseCase{

    private readonly _userRepository:IUserRepository;
    private readonly _adminRepository:IAdminRepository
    private readonly _secretHashService:ISecretHasher;
    private readonly _jwtService: IJWT;
    
    /**
    * ! Constructs a new instance of the AdminService class.
    * 
    * @param  userRepository - The repository for user data.
    * @param  adminRepository - The repository for admin data.
    * @param  secretHashService - The service used for hashing sensitive data like passwords.
    * @param  jwtService - The service used for JWT (JSON Web Token) generation and verification.
    */
    constructor( adminRepository:IAdminRepository, secretHashService:ISecretHasher, jwtService:IJWT, userRepository:IUserRepository ){
        this._userRepository = userRepository;
        this._adminRepository = adminRepository;
        this._secretHashService = secretHashService;
        this._jwtService = jwtService;
    }

    /**
    * ! Admin Credential Data is Used to Login.
    * 
    * @param username - The username or email of the admin.
    * @param password - The password for the admin account.
    * 
    * @returns A promise resolving with the admin data upon successful login.
    */
    async adminLogin({ username, password }: { username: string, password: string }) {

        //* Invokes the adminLogin function with provided data and services.
        return adminLogin(
            this._adminRepository,
            this._secretHashService,
            this._jwtService,
            username,
            password,
        )
    }

    /**
    * ! Logs out the current Admin.
    * 
    * @returns  A promise indicating that the admin has been successfully logged out.
    */
    async adminLogout() {
        //* Invoke the logout function to perform admin logout.
        return adminLogout();
    }


    /**
     * ! Retrieves all users from the repository.
     * 
     * @returns A promise resolving with an array of all users.
     */
    async findAllUsers() {
        //* Invoke the findAllUsers function to fetch all users from the repository.
        return findAllUsers(this._userRepository);
    }


    /**
     * ! Blocks a user identified by their user ID.
     * 
     * @param userId - The ID of the user to be blocked.
     * 
     * @returns A promise indicating that the user has been successfully blocked.
     */
    async blockUser(userId: string) {
        
        //* Invoke the blockUser function to block the user using the provided user ID.
        return blockUser(
            this._userRepository,
            userId
        )
    }

    
}