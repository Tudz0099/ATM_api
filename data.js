
const atm1 = {
    "id": 'f7b35edf-4da7-4a7d-a37f-edc4ecd85f11',
    'status': 'Free',
    'remove': false,
    'name': 'Mizuko'
}
 
const atm2 = {
    "id": '1aef91f4-f92b-43b0-b338-f60d1fdb1fdb',
    'status': 'Free',
    'remove': false,
    'name': 'Nagoya'
} 

const atm3 = {
    "id": '334b841e-cdad-496d-a651-49417b69351d',
    'status': 'Free',
    'remove': false,
    'name': 'Shinhan' 
}

const data = {
    atms: [atm1, atm2, atm3],
    queues:[],
    processedClients:'',


    //set transaction interval
    setTransactionInterval(){
        for(i = 0; i < this.atms.length; i++){
            if(this.atms[i].transaction && this.atms[i].transaction > 0){
                this.atms[i].transaction = this.atms[i].transaction - 1
            }
            else if(this.atms[i].transaction == 0){
                this.atms[i].status = 'Free'
                this.atms[i].client = ''
                this.atms[i].transaction = ''
            }
        }
    },

    // transaction
    transactions(){

        if(this.queues.length > 0) {
            for(i=0; i < this.atms.length; i++){
                if(this.atms[i].status === 'Free' && this.atms[i].remove == false){
                    const atmHandle = this.atms[i]
                    atmHandle.status = 'Busy'
                    atmHandle.client = this.queues[0].name
                    atmHandle.transaction = this.queues[0].transaction
                    this.processedClients += `${this.queues[0].name}, `
                  
                    this.queues.splice(0, 1)
                    break;
                }
            }
        }
    }
}  

module.exports = data   