// Import necessary types and functions
import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { IBookingRepository } from "../interface/repository/IBookingRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IWorkerRepository } from "../interface/repository/IWorkerRepository";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { adminLogin } from "./admin/adminLogin";
import { adminLogout } from "./admin/adminLogout";
import { dashboardChartData } from "./admin/dashboardChart";
import { dashboardRecent } from "./admin/dashboardRecent";
import { totalDashboardData } from "./admin/dashboardTotalData";
import { performingWorkersAndUsers } from "./admin/performingWorkersAndUsers";
import { refreshToken } from "./admin/refreshToken";
import { viewAllBookings } from "./admin/viewBooking";
import { viewSalesReport } from "./admin/viewSalesReport";
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
    private readonly _bookingRepository: IBookingRepository;
    private readonly _workerRepository: IWorkerRepository;
    
   
    constructor( adminRepository:IAdminRepository, secretHashService:ISecretHasher, jwtService:IJWT, userRepository:IUserRepository, bookingRepository:IBookingRepository, workerRepository:IWorkerRepository ){
        this._userRepository = userRepository;
        this._adminRepository = adminRepository;
        this._secretHashService = secretHashService;
        this._jwtService = jwtService;
        this._bookingRepository = bookingRepository;
        this._workerRepository = workerRepository;
    }

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


    async refreshToken(adminRTkn :string){
        return refreshToken(adminRTkn, this._jwtService)
    }

    
    async adminLogout() {
        //* Invoke the logout function to perform admin logout.
        return adminLogout();
    }


   
    async findAllUsers() {
        //* Invoke the findAllUsers function to fetch all users from the repository.
        return findAllUsers(this._userRepository);
    }


  
    async blockUser(userId: string) {
        
        //* Invoke the blockUser function to block the user using the provided user ID.
        return blockUser(
            this._userRepository,
            userId
        )
    }

    async viewSalesReport(startDate:string, endDate:string, page:number, pageSize:number){
        return viewSalesReport(startDate, endDate, page, pageSize, this._bookingRepository)
    }

    async viewBookings(page:number) {
        return viewAllBookings(page,this._bookingRepository)
    }

    async dashboardTotalData(){
        return totalDashboardData(this._bookingRepository, this._userRepository, this._workerRepository)
    }

    async dashboardRecentData(){
        return dashboardRecent(this._bookingRepository, this._workerRepository)
    }

    async dashboardChartData(){
        return dashboardChartData(this._bookingRepository, this._userRepository)
    }

    async performingWorkersAndUsers(){
        return performingWorkersAndUsers(this._bookingRepository);
    }
}