import Dotation from './Dotation';
import SlipType from './SlipType';

export default class Movement {
    /**
     * @type string
     */
    code;
    /**
     * @type number
     */
    actual_dotation_amout;
    /**
     * @type number
     */
    charge_amount;
    /**
     * @type number
     */
    avance_amount;
    /**
     * @type string
     */
    joint_articles;
    /**
     * @type string
     */
    code_parent;
    /**
     * @type string
     */
    user_id;
    /**
     * @type Dotation
     */
    dotation;
    /**
     * @type Date
     */
    date;

    /**
     * @param {string} code
     * @param {number} actual_dotation_amout
     * @param {number} charge_amount
     * @param {number} avance_amount
     * @param {string} joint_articles
     * @param {string} code_parent
     * @param {string} user_id
     * @param {Dotation} dotation
     * @param {Date} date
     */
    constructor(
        code = undefined,
        actual_dotation_amout = undefined,
        charge_amount = undefined,
        avance_amount = undefined,
        joint_articles = undefined,
        code_parent = undefined,
        user_id = undefined,
        dotation = undefined,
        date = undefined
    ) {
        this.code = code;
        this.actual_dotation_amout = actual_dotation_amout;
        this.charge_amount = charge_amount;
        this.avance_amount = avance_amount;
        this.joint_articles = joint_articles;
        this.code_parent = code_parent;
        this.user_id = user_id;
        this.dotation = dotation;
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
                        let movement = new Movement(
                            'code' + i,
                            1000000,
                            10000,
                            5000,
                            '',
                            '',
                            '',
                            new Dotation(
                                'code' + i,
                                new SlipType(i + '', 'Mandragora Mansion', 'MM', '', ''),
                                100000,
                                '',
                                ''
                            ),
                            new Date()
                        );
                        content.push(movement);
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
                    resolve({ code: this.code + ' is updated' });
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
                    resolve({ code: this.code + ' is deleted' });
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
