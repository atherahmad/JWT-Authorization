export const users = [

];

export const teaList = [
    {
        teaName : "Black Tea",
        teaId : 1
    },
    {
        teaName : "Ginger Tea",
        teaId : 2
    }
]

export const setUser = (user) => users.push(user);

export const addFavorites = (req,res) =>{
    const {teaId} = req.body
        const userIndex = users.findIndex(user=>user.userName === req.userName)

        if(!users[userIndex].favorites.includes(teaId)){ 
            users[userIndex].favorites.push(teaId)
            res.json("successfully favoritted")
        }
        else res.status(401).json("Already Favorite")
}

export const removeFavorites = (req,res) =>{
    const {teaId} = req.body
        const userIndex = users.findIndex(user=>user.userName === req.userName)

        if(!users[userIndex].favorites.includes(teaId))
            res.status(401).json("Bad request")

        else{
            const favIndex = users[userIndex].favorites.indexOf(teaId);
            users[userIndex].favorites.splice(favIndex,1)
            res.json("successfully unfavoritted")
        }
    }

