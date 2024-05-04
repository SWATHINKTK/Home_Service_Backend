import bcrypt from 'bcryptjs';
import { BadRequestError } from '../../usecases/handler/badRequestError';
import { ISecretHasher } from '../../usecases/interface/services/ISecretHasher';


export class SecretHasher implements ISecretHasher{

    async hashSecret(secret: string): Promise<string> {
        try {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(secret,salt);
        } catch (error) {
            throw new BadRequestError('Server Error')
        }
    }
    async checkSecretMatch(plainSecret: string, hashSecret: string): Promise<boolean> {
        try {
            return  bcrypt.compare(plainSecret, hashSecret)
        } catch (error) {
            throw new BadRequestError('server Error')
        }
    }

}