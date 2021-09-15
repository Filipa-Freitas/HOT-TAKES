
module.exports = (req, res, next) => {
    const validInput = /^[a-zA-ZÀ-ÿ0-9_ ]*$/;
    let sauce;
    try {
        if (req.body.sauce) {
            sauce = JSON.parse(req.body.sauce);
        } else {
            sauce = { ...req.body };
        }
        let sauceData = { name: sauce.name, manufacturer: sauce.manufacturer, description: sauce.description, mainPepper: sauce.mainPepper };
        for (let key in sauceData) {
            if (validInput.test(sauceData[key]) !== true) {
                throw new Error("Champs ne pouvant contenir que des lettres et des chiffres") ;
            } else {
                console.log("it's good");
            }
        }
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


