const {uuid} = require('uuidv4')

const newId = uuid()
const atm1 = {
    "id": 'f7b35edf-4da7-4a7d-a37f-edc4ecd85f11',
    'status': 'Free',
    'remove': false
}

const atm2 = {
    "id": '1aef91f4-f92b-43b0-b338-f60d1fdb1fdb',
    'status': 'Free',
    'remove': false
}

const atm3 = {
    "id": '334b841e-cdad-496d-a651-49417b69351d',
    'status': 'Free',
    'remove': false
}
 
const person1 = {
    'name': 'grey',
    'transaction': 1000
}

const person2 = {
    'name': 'havin',
    'transaction': 2000
}

const person3 = {
    'name': 'john',
    'transaction': 3000
}

const person4 = {
    'name': 'jack',
    'transaction': 4000
}

const data = {
    atms: [atm1, atm2, atm3],
    persons:[person1, person2, person3, person4],
    queues:[],

    transactions(randomPerson){

        const setTransactionTime = (atmHandle) => { 
            setTimeout(function() { 
                atmHandle.status = 'Free'
                atmHandle.client = ''
                atmHandle.transaction = ''
             }, atmHandle.transaction*1000);
        }

        const countdownTime = (atmHandle, randomPerson) => {
            let time = randomPerson.transaction/1000
            atmHandle.transaction = time
            setTimeout(() => {
                if(atmHandle.transaction > 0){
                    atmHandle.transaction = atmHandle.transaction - 1
                }  
            }, 1000);
            setTimeout(() => {
                if(atmHandle.transaction > 0){
                    atmHandle.transaction = atmHandle.transaction - 1
                }  
            }, 2000);
            setTimeout(() => {
                if(atmHandle.transaction > 0){
                    atmHandle.transaction = atmHandle.transaction - 1
                }  
            }, 3000);
            // const interval = setInterval(() => {
            //     let setCountdownTime = atmHandle.transaction
            //     if(setCountdownTime > 0){
            //         atmHandle.transaction = setCountdownTime - 1
            //     }
                     
            // }, 1000)
        }

        if(this.queues.length > 0) { 
            for(i=0; i < this.atms.length; i++){
                if(this.atms[i].status === 'Free' && this.atms[i].remove == false){
                    const atmHandle = this.atms[i]
                    atmHandle.status = 'Busy' 
                    atmHandle.client = this.queues[0].name
 
                    countdownTime(atmHandle, this.queues[0])
                    setTransactionTime(atmHandle);
                    this.queues.splice(0, 1) 
                    break;
                } 
            }
        }

        for(i=0; i < this.atms.length; i++){
            if(this.atms[i].status === 'Free' && this.atms[i].remove == false){
                const atmHandle = this.atms[i]
                atmHandle.status = 'Busy'
                atmHandle.client = randomPerson.name

                countdownTime(atmHandle, randomPerson) 
                setTransactionTime(atmHandle);
                break;
            }
        }

        const findAtm = this.atms.find(e => e.status === 'Free')
        if(!findAtm){
            this.queues.push(randomPerson)
        }
    } 
}

 
module.exports = data  