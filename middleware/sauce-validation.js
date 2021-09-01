
module.exports = (req, res, next) => {
    const validInput = /^[a-zA-Z0-9_ ]*$/;

    if (JSON.parse(req.body.sauce !== undefined)) {
        let sauce = JSON.parse(req.body.sauce);
        
        let sauceInputs = { name: sauce.name, manufacturer: sauce.manufacturer, description: sauce.description, mainPepper: sauce.mainPepper };
        console.log(sauce);
        if (validInput.test(sauceInputs.value) == true) {
            next();
        } else {
            throw "Les champs doivent contenir uniquement des lettres et des chiffres post";
        }
    } else {
        let sauce = req.body;
        console.log(sauce);
        let sauceInputs = { name: sauce.name, manufacturer: sauce.manufacturer, description: sauce.description, mainPepper: sauce.mainPepper };
        if (validInput.test(sauceInputs.value) == true) {
            next();
            
        } else {
            throw "Les champs doivent contenir uniquement des lettres et des chiffres put";
        }
    }
};