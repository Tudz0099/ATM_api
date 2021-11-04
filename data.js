const {uuid} = require('uuidv4')

const newId = uuid()
const atm1 = {
    "id": 'f7b35edf-4da7-4a7d-a37f-edc4ecd85f11',
    'status': 'Free'
}

const atm2 = {
    "id": '1aef91f4-f92b-43b0-b338-f60d1fdb1fdb',
    'status': 'Free'
}

const atm3 = {
    "id": '334b841e-cdad-496d-a651-49417b69351d',
    'status': 'Free'
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

    getAtms() {
        return this.atms
    },

    getQueues() {
        return this.queues
    },

    create() {
        
        const atm = {
            id: newId,
            status: 'Free' 
        }
        this.atms.push(atm)
    },
    removeAtm(id) {
        const atm = this.atms.find(e => e.id === id)

        const waitForAtm = (i) => {  
            if(this.atms[i].status !== 'Free'){
                setTimeout(() => {
                    waitForAtm(i)
                }, 10);
            }else{
                this.atms.splice(i, 1)
                return 
            }
        }

        for(i=0; i < this.atms.length; i++){
            if(this.atms[i] === atm){
                waitForAtm(i)
            }
        }
    },
    transactions(randomPerson){ 

        const doSetTimeout = (atmHandle) => { 
            setTimeout(function() { 
                atmHandle.status = 'Free'
                atmHandle.client = ''
                atmHandle.transaction = ''
             }, atmHandle.transaction*1000);
        }

        const intervalTime = (atmHandle, randomPerson) => {
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
            // setInterval(() => {
            //     if(atmHandle.transaction > 0){
            //         atmHandle.transaction = atmHandle.transaction - 1
            //     }     
            // }, 1000)
        }

        if(this.queues.length > 0) {
            for(i=0; i < this.atms.length; i++){
                if(this.atms[i].status === 'Free'){
                    const atmHandle = this.atms[i]
                    atmHandle.status = 'Busy'
                    atmHandle.client = this.queues[0].name

                    intervalTime(atmHandle, this.queues[0])
                    doSetTimeout(atmHandle);
                    this.queues.splice(0, 1)
                    break;
                }
            }
        }

        for(i=0; i < this.atms.length; i++){
            if(this.atms[i].status === 'Free'){
                const atmHandle = this.atms[i]
                atmHandle.status = 'Busy'
                atmHandle.client = randomPerson.name

                intervalTime(atmHandle, randomPerson) 
                doSetTimeout(atmHandle);
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