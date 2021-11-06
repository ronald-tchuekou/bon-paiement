export default class Banck {
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
    phone;
    /**
     * @type string
     */
    email;
    /**
     * @type string
     */
    fax;
    /**
     * @type string
     */
    user_id;

    constructor(
        code = undefined,
        abreviation = undefined,
        libelle = undefined,
        phone = undefined,
        email = undefined,
        fax = undefined,
        user_id = undefined
    ) {
        this.code = code;
        this.abreviation = abreviation;
        this.libelle = libelle;
        this.phone = phone;
        this.email = email;
        this.fax = fax;
        this.user_id = user_id;
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
                        let banck = new Banck(
                            'code' + i,
                            'B' + i,
                            'Banck' + i,
                            '0854904773' + i,
                            `banck${i}@banck${i}.com`,
                            '08504773' + i,
                            ''
                        );
                        content.push(banck);
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
