const data = require('../data')
const {uuid} = require('uuidv4')
const newId = uuid()


// post atm
const postAtm = async(req, res)=>{
    try{
        const atm = {
            id: newId,
            status: 'Free' 
        }
        data.atms.push(atm)
        return res.json(data.atms)
    }catch(err){
        res.json(err.message)
    }
    
}

// get atm  

const getAtms = (req, res) => {
    try{
        return res.json({
            atm: data.atms,
            queue: data.queues
        })
    }catch(err){
        res.json(err.message)
    }
   
}

// delete atm
const deleteAtm = async(req, res, next) => {
    const {atmId} = req.params
    try{
        const atm = data.atms.find(e => e.id === atmId)

        const waitForAtm = (i) => {  
            if(data.atms[i].status !== 'Free'){
                setTimeout(() => {
                    waitForAtm(i)
                }, 20); 
            }else{
                data.atms.splice(i, 1)
                return res.json({
                    remove: true
                })
            }
        }

        for(i=0; i < data.atms.length; i++){
            if(data.atms[i] === atm){
                waitForAtm(i)
            }
        }
    }catch(err){
        res.json(err.message)
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
    getAtms
}