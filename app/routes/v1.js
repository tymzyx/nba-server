import Acquire from '../controllers/v1/index'

const express = require('express');

const router = express.Router();

router.get('/player', Acquire.getPlayer);
router.get('/rank', Acquire.getRank);

export default router;
