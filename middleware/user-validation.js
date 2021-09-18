const passwordValidator = require('password-validator');



module.exports = (req, res, next) => {
    const passwordSchema = new passwordValidator();

    passwordSchema
    .is().min(6)                                    // Minimum length 6
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try {
        if (passwordSchema.validate(req.body.password) !== true) {
            throw new Error("Mot de passe incorrect: Min = 6 / Max = 100 / Majuscules / Minuscules / au moins 2 chiffres");
        } 
        
        if (validEmail.test(req.body.email) !== true) {
            throw new Error("Adresse mail incorrecte");
        } 
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


