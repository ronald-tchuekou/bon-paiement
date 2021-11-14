export default class SlipType {
    /**
     * @type string
     */
    code;
    /**
     * @type string
     */
    abreviation;
    /**
     * @type string
     */
    libelle;
    /**
     * @type string
     */
    code_parent;
    /**
     * @type string
     */
    user_id;
    /**
     * @type Date
     */
    date;

    constructor(
        code = undefined,
        libelle = undefined,
        abreviation = undefined,
        code_parent = undefined,
        user_id = undefined,
        date = new Date()
    ) {
        this.code = code;
        this.libelle = libelle;
        this.abreviation = abreviation;
        this.code_parent = code_parent;
        this.user_id = user_id;
        this.date = date;
    }

    /**
     * @param {object} object
     * @param {callback} object.success
     * @param {callback} [object.error=() => {}]
     * @param {callback} [object.final=() =>{}]
     */
    getAll(object) {
        new Promise((resolve, except) => {
            try {
                setTimeout(() => {
                    let content = [];
                    for (let i = 1; i <= 20; i++) {
                        let slipType = new SlipType(i + '', 'Mandragora Mansion', 'MM', '', '');
                        content.push(slipType);
                    }
                    resolve(content);
                }, 1000);
            } catch (e) {
                except(e);
            }
        })
            .then((response) => object.success(response))
            .catch((e) => object.error(e))
            .finally(() => object.final());
    }

    /**
     * @param {object} object
     * @param {callback} object.success
     * @param {callback} [object.error=() => {}]
     * @param {callback} [object.final=() =>{}]
     */
    save(object) {
        new Promise((resolve, except) => {
            try {
                setTimeout(() => {
                    resolve({ code: this.libelle + ' is saved' });
                }, 1000);
            } catch (e) {
                except(e);
            }
        })
            .then((response) => object.success(response))
            .catch((e) => object.error(e))
            .finally(() => object.final());
    }

    /**
     * @param {object} object
     * @param {callback} object.success
     * @param {callback} [object.error=() => {}]
     * @param {callback} [object.final=() =>{}]
     */
    update(object) {
        new Promise((resolve, except) => {
            try {
                setTimeout(() => {
                    resolve({ code: this.libelle + ' is updated' });
                }, 1000);
            } catch (e) {
                except(e);
            }
        })
            .then((response) => object.success(response))
            .catch((e) => object.error(e))
            .finally(() => object.final());
    }

    /**
     * @param {object} object
     * @param {callback} object.success
     * @param {callback} [object.error=() => {}]
     * @param {callback} [object.final=() =>{}]
     */
    delete(object) {
        new Promise((resolve, except) => {
            try {
                setTimeout(() => {
                    resolve({ code: this.libelle + ' is deleted' });
                }, 1000);
            } catch (e) {
                except(e);
            }
        })
            .then((response) => object.success(response))
            .catch((e) => object.error(e))
            .finally(() => object.final());
    }
}
