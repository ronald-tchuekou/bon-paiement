const objects = require('./objects');

/**
 * Pour les constantes tableaux
 */
module.exports = {
    social_reason: [
        { value: objects.SOCIAL_REASON.particular, label: { fr: 'Particulier', en: 'Particular' } },
        { value: objects.SOCIAL_REASON.company, label: { fr: 'Entreprise', en: 'Company' } },
    ],
    civilities: [
        { value: objects.CIVILITY.male, label: { fr: 'Homme', en: 'Man' } },
        { value: objects.CIVILITY.female, label: { fr: 'Femme', en: 'Wouman' } },
    ],
    pay_modes: [
        { value: objects.PAY_MODE.banck, label: { fr: 'Banque', en: 'Banck' } },
        { value: objects.PAY_MODE.check, label: { fr: 'Cheque', en: 'check' } },
    ],
};
