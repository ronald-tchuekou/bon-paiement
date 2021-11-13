import SlipType from './SlipType';

export default class Dotation {
    /**
     * @type string
     */
    code;
    /**
     * @type SlipType
     */
    slipType;
    /**
     * @type number
     */
    amount;
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
        slipType = new SlipType(),
        amount = undefined,
        code_parent = undefined,
        user_id = undefined,
        date = new Date()
    ) {
        this.code = code;
        this.slipType = slipType;
        this.amount = amount;
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
                        let dotation = new Dotation(
                            i + '',
                            new SlipType(i + '', 'Mandragora Mansion', 'MM', '', ''),
                            1000000,
                            '',
                            ''
                        );
                        content.push(dotation);
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
                    resolve({ code: this.slipType.libelle + ' is saved' });
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
                    resolve({ code: this.slipType.libelle + ' is updated' });
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
                    resolve({ code: this.slipType.libelle + ' is deleted' });
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
