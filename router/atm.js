const router = require('express').Router();
const {postAtm, deleteAtm, getAtms, transactionsAtm} = require('../controller/atm')

router.post('/', postAtm);
router.get('/', getAtms);
router.get('/transactions', transactionsAtm)
router.delete('/:atmId', deleteAtm);

module.exports = router;