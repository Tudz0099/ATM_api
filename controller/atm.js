const data = require('../data')



// post atm
const postAtm = async(req, res)=>{
    try{
        data.create()
        res.json(data.getAtms())
    }catch(err){
        res.json(err.message)
    }
    
}

// get atm  

const getAtms = (req, res) => {
    try{
        res.json({
            atm: data.getAtms(),
            queue: data.getQueues()
        })
    }catch(err){
        res.json(err.message)
    }
   
}

// delete atm
const deleteAtm = async(req, res, next) => {
    const {atmId} = req.params
    try{
        data.removeAtm(atmId)
        return res.json({
            remove: true,
            atms: data.getAtms()
        })
    }catch(err){
        res.json(err.message)
    }
}

// transactions
const transactionsAtm = async(req, res, next) => {
    try{
        
        return res.json({
            atms: data.atms
        })
    }catch(err){
        return res.json(err.message)
    }
}



setInterval(() => {
    const person = data.persons
const randomPerson = person[Math.floor(Math.random() *person.length)];
data.transactions(randomPerson)
}, 1000);


module.exports = {
    postAtm,
    deleteAtm,
    getAtms,
    transactionsAtm
}