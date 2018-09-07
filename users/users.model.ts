
const users = [
    {id:'1',name:'Murílio B. Martins', email: 'peter@marvel.com'},
    {id:'2',name:'Mateus B. MArtins', email: 'mateusbms@gmail.com'}
]

export class Users {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }

    static findById(id: string): Promise<any>{
        return new Promise(resolve => {
            const filtered = users.filter(user=> user.id === id)
            let user = undefined
            if(filtered.length > 0){
                user = filtered[0]
            }
            resolve(user)
        })
    }

}