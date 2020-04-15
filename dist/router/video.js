"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs = require('fs');
var router = express_1.Router();
router.post('/', function (req, res) {
});
router.get('/', function (req, res) {
    var path = 'assets/video.mp4';
    var stat = fs.statSync(path);
    var fileSize = stat.size;
    var range = req.headers.range;
    res.json({
        ok: 'Prueba'
    });
    // if (range) {
    //     const parts = range.replace(/bytes=/, "").split("-")
    //     const start = parseInt(parts[0], 10)
    //     const end = parts[1] ?
    //         parseInt(parts[1], 10) :
    //         fileSize - 1
    //     const chunksize = (end - start) + 1
    //     const file = fs.createReadStream(path, { start, end })
    //     const head = {
    //         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    //         'Accept-Ranges': 'bytes',
    //         'Content-Length': chunksize,
    //         'Content-Type': 'video/mp4',
    //     }
    //     res.writeHead(206, head)
    //     file.pipe(res)
    // } else {
    //     const head = {
    //         'Content-Length': fileSize,
    //         'Content-Type': 'video/mp4',
    //     }
    //     res.writeHead(200, head)
    //     fs.createReadStream(path).pipe(res)
    // }
});
exports.default = router;
//# sourceMappingURL=video.js.map