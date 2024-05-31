const { Router } = require('express')
const router = Router()
const Jimp = require('jimp')

router.get('/', (req,res) => {
    res.render('index')
})

router.post('/', async (req,res) => {
    try {
        let imgRaw = './public/raw/ramadan.png'
        let imgActive = './public/active/ramadan.png'
        let imgExported = './public/exported/ramadan.png'
        
        let textData = {
            text: `${req.body.name}`.toUpperCase(),
            maxWidth: 606,
            maxHeight: 600,
            placementX: -120,
            placementY: 300,
        }
        
        const clone = await Jimp.read(imgRaw)
        await clone.clone().write(imgActive)
        
        const active = await Jimp.read(imgRaw)
        
        const font = await Jimp.loadFont('./public/fonts/arabicFont.fnt')
        
        const image = await active.print(font, textData.placementX, textData.placementY, {
            text: textData.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        }, textData.maxWidth)
        
        await image.quality(100).write(imgExported)
        
        res.redirect('/success')
    } catch (error) {
        console.log(error);
    }
})


router.get('/success', (req,res) => {
    res.render('success')
})


module.exports = router