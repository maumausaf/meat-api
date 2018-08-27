
const users = [
    {name:'Murílio B. Martins', email: 'peter@marvel.com'},
    {name:'Mateus B. MArtins', email: 'mateusbms@gmail.com'}
]

export class Users {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }
}