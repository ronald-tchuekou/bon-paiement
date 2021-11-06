import constants from '../scripts/constants';

export default class Beneficier {
    /**
     * @type string
     */
    code;
    /**
     * @type string
     */
    title;
    /**
     * @type string
     */
    name;
    /**
     * @type string
     */
    first_name;
    /**
     * @type string
     */
    social_reason;
    /**
     * @type string
     */
    civility;
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
    location;
    /**
     * @type string
     */
    code_parent;
    /**
     * @type string
     */
    user_id;

    constructor(
        code = undefined,
        title = undefined,
        name = undefined,
        first_name = undefined,
        social_reason = undefined,
        civility = undefined,
        phone = undefined,
        email = undefined,
        fax = undefined,
        location = undefined,
        code_parent = undefined,
        user_id = undefined
    ) {
        this.code = code;
        this.title = title;
        this.name = name;
        this.first_name = first_name;
        this.social_reason = social_reason;
        this.civility = civility;
        this.phone = phone;
        this.email = email;
        this.fax = fax;
        this.location = location;
        this.code_parent = code_parent;
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
                        let beneficier = new Beneficier(
                            'code' + i,
                            i % 2 ? '' : i % 3 ? 'Mr' : 'Mme',
                            'John' + i,
                            'Doe' + i,
                            i % 2 ? constants.SOCIAL_REASON.company : constants.SOCIAL_REASON.particular,
                            i % 2 ? '' : i % 3 ? constants.CIVILITY.male : constants.CIVILITY.female,
                            '0854904773' + i,
                            `john${i}doe${i}@gmail.com`,
                            '08504773' + i,
                            'District,City,Country',
                            '',
                            ''
                        );
                        content.push(beneficier);
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
                    resolve({ code: this.name + ' is saved' });
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
                    resolve({ code: this.name + ' is updated' });
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
                    resolve({ code: this.name + ' is deleted' });
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
