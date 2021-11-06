import constants from '../scripts/constants';
import Banck from './Banck';
import Beneficier from './Beneficier';
import Dotation from './Dotation';
import Movement from './Movement';
import SlipType from './SlipType';

export default class DetailMovement {
    /**
     * @type string
     */
    code;
    /**
     * @type Movement
     */
    movement;
    /**
     * @type Beneficier
     */
    beneficier;
    /**
     * @type number
     */
    charge_amount;
    /**
     * @type number
     */
    pay_amount;
    /**
     * @type Banck
     */
    banck;
    /**
     * @type string
     */
    check_ref;
    /**
     * @type string
     */
    ref1;
    /**
     * @type string
     */
    ref2;
    /**
     * @type string
     */
    ref3;
    /**
     * @type string
     */
    ref4;
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
        movement = undefined,
        beneficier = undefined,
        charge_amount = undefined,
        pay_amount = undefined,
        banck = undefined,
        check_ref = undefined,
        ref1 = undefined,
        ref2 = undefined,
        ref3 = undefined,
        ref4 = undefined,
        code_parent = undefined,
        user_id = undefined
    ) {
        this.code = code;
        this.movement = movement;
        this.beneficier = beneficier;
        this.charge_amount = charge_amount;
        this.pay_amount = pay_amount;
        this.banck = banck;
        this.check_ref = check_ref;
        this.ref1 = ref1;
        this.ref2 = ref2;
        this.ref3 = ref3;
        this.ref4 = ref4;
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
                        let detailMovement = new DetailMovement(
                            'code' + i,
                            new Movement(
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
                                )
                            ),
                            new Beneficier(
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
                            ),
                            5000,
                            5000,
                            new Banck(
                                'code' + i,
                                'B' + i,
                                'Banck' + i,
                                '0854904773' + i,
                                `banck${i}@banck${i}.com`,
                                '08504773' + i,
                                ''
                            ),
                            'check_ref',
                            'ref1',
                            'ref2',
                            'ref3',
                            'ref4',
                            '',
                            ''
                        );
                        content.push(detailMovement);
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
                    resolve({ code: this.code + ' is saved' });
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
