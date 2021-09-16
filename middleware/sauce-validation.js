
module.exports = (req, res, next) => {
    const validInput = /^[a-zA-ZÀ-ÿ0-9_ ]*$/;
    const validHeat = /^([1-9]|10)$/;
    let sauce;
    try {
        if (req.body.sauce) {
            sauce = JSON.parse(req.body.sauce);
        } else {
            sauce = { ...req.body };
        }
        let sauceData = { name: sauce.name, manufacturer: sauce.manufacturer, description: sauce.description, mainPepper: sauce.mainPepper };
        let heat = sauce.heat;
        for (let key in sauceData) {
            if (validInput.test(sauceData[key]) !== true) {
                throw new Error("Champs ne pouvant contenir que des lettres et des chiffres !");
            }
        }
        if (validHeat.test(heat) !== true) {
            throw new Error("Heat doit être compris entre 1 et 10 !");
        }
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


