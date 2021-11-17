import constants from '../scripts/constants';
import Profile from './Profile';

export default class User {
    /**
     * @type string
     */
    code;
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
    sex;
    /**
     * @type string
     */
    phone;
    /**
     * @type string
     */
    fax;
    /**
     * @type string
     */
    email;
    /**
     * @type [Profile]
     */
    profiles;
    /**
     * @type Date
     */
    date;
    /**
     * @type string
     */
    status;

    constructor(
        code = undefined,
        name = undefined,
        first_name = undefined,
        sex = undefined,
        phone = undefined,
        fax = undefined,
        email = undefined,
        profiles = [],
        status = undefined,
        date = new Date()
    ) {
        this.code = code;
        this.name = name;
        this.first_name = first_name;
        this.sex = sex;
        this.phone = phone;
        this.fax = fax;
        this.email = email;
        this.profiles = profiles;
        this.status = status;
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
                        let user = new User(
                            i + 'lLKJDFOZF',
                            'name' + i,
                            'first_name' + i,
                            i % 3 === 0 ? constants.CIVILITY.male : constants.CIVILITY.female,
                            Math.floor(Math.random() * 100000),
                            Math.floor(Math.random() * 100000),
                            `email${i}@gmail.com`,
                            [new Profile(i + 'lLKJDFOJNLZFUZLKZF', 'Profile' + i)],
                            i % 2 === 0 ? 'En ligne' : i % 3 === 0 ? 'Hors ligne' : 'Supprimé'
                        );
                        content.push(user);
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
