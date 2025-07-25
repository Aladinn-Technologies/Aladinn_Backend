const router = require('express').Router();
const projectCardController = require('../controllers/projectCardController');
const authMiddleware = require('../middleware/authMiddleware');


//Public routes
router.get('/', projectCardController.getAllProjectCards);
router.get('/:id', projectCardController.getProjectCardById);

router.post('/', authMiddleware, projectCardController.createProjectCard);
router.put('/:id', authMiddleware, projectCardController.updateProjectCard); // Use PUT for full replacement, PATCH for partial
router.delete('/:id', authMiddleware, projectCardController.deleteProjectCard);

module.exports = router;