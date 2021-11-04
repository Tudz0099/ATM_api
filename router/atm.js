const router = require('express').Router();
const {postAtm, deleteAtm, getAtms} = require('../controller/atm')

router.post('/', postAtm);
router.get('/', getAtms);
router.delete('/:atmId', deleteAtm);

module.exports = router;