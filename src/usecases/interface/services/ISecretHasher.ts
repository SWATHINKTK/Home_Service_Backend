export interface ISecretHasher{
    hashSecret(secret:string):Promise<string>;
    checkSecretMatch(plainSecret:string, hashSecret:string):Promise<boolean>
}