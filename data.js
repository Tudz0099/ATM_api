const {uuid} = require('uuidv4')

const newId = uuid()
const atm1 = {
    "id": newId,
    'status': 'Free'
}

const atm2 = {
    "id": newId,
    'status': 'Free'
}

const atm3 = {
    "id": newId,
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

        for(i=0; i < this.atms.length; i++){
            if(this.atms[i] === atm){
                this.atms.splice(i, 1)
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