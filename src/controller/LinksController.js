const {tryCatch} = require("../utils/tryCatch");

const Link = require("../models/Link");

exports.getLinks = tryCatch(async (req, res) => {
    const links = await Link.find();
    res.status(200).json({ links });
});

exports.getLinksByDevice = tryCatch(async (req, res) => {
    const deviceId = req.params.deviceId;
    const links = await Link.find({ deviceId });
    res.status(200).json({ links });
});

exports.getOriginalLink = tryCatch(async (req, res) => {
    const shortUrl = req.params.shortUrl
    const link = await Link.findOne({ shortUrl });
    if (!link) return res.sendStatus(404);

    link.clicks++;
    link.save();

    await res.redirect(link.originalUrl);
});

exports.createLink = tryCatch(async (req, res) => {
    const user = req.user._id || null;
    const { originalUrl, shortUrl, deviceId } = req.body;
    const post = await Link.create({ originalUrl, shortUrl, deviceId, user });

    res.status(201).json({
        success: true,
        data: post
    });
});

exports.updateLink = tryCatch(async (req, res) => {
    let link = await Link.findById(req.params.id);
    if (!link) {
        return next({
            message: 'Link not found'
        });
    }

    if (link.user.toString() !== req.user._id) {
        return next({
            message: 'Not authorized to update this post'
        });
    }

    link = await Link.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: link
    });
});

exports.deleteLink = tryCatch(async (req, res) => {
    let link = await Link.findById(req.params.id);
    if (!link) {
        return next({
            message: 'Link not found'
        });
    }

    await link.remove();
    res.status(200).json({
        success: true,
        data: {}
    });
});
