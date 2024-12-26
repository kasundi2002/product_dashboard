// backend/routes/adminRoutes.js
const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');

const router = express.Router();

// http://localhost:8081/admin/register
router.post('/register', registerAdmin);

// http://localhost:8081/admin/login
router.post('/login', loginAdmin);

module.exports = router;