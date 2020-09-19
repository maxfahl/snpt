const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => res.json({ "data": "Welcome", "oneMore": "test" }));

module.exports = router;
