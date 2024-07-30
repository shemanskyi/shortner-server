const router = require('express').Router();

const {
    getLinks,
    getLinksByDevice,
    getOriginalLink,
    createLink,
    updateLink,
    deleteLink
} = require('../controller/LinksController');

const { authenticate } = require('../middleware/auth');

router.get('/links', getLinks);
router.get('/links/:deviceId', getLinksByDevice);
router.get('/:shortUrl', getOriginalLink);
router.post('/', createLink);
router.put('/:id', authenticate, updateLink);
router.delete('/:id', deleteLink);

module.exports = router;
