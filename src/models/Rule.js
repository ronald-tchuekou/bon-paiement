import { Component } from 'react';
import Composant from './Composant';

export default class Rule {
    /**
     * @type string
     */
    code;
    /**
     * @type string
     */
    libelle;
    /**
     * @type boolean
     */
    read;
    /**
     * @type boolean
     */
    write;
    /**
     * @type boolean
     */
    delete;
    /**
     * @type Composant
     */
    composant;
    /**
     * @type Date
     */
    date;

    constructor(
        code = undefined,
        libelle = undefined,
        read = undefined,
        write = undefined,
        _delete = undefined,
        composant = new Component(),
        date = new Date()
    ) {
        this.code = code;
        this.libelle = libelle;
        this.read = read;
        this.write = write;
        this.delete = _delete;
        this.composant = composant;
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
                    for (let i = 1; i <= 10; i++) {
                        let composant = new Rule(
                            i + 'lLKJDFOJZF',
                            'Rule' + i,
                            i % 3 === 0,
                            i % 2 === 0,
                            i % 5 === 0,
                            new Composant('ComponentCode' + i, 'Component' + i)
                        );
                        content.push(composant);
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
