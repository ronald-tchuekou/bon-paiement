import { Lang } from '../lang';

/**
 * Fichier qui permet gérer les composants js de l'application.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 * @copyright 2021 13:45
 */
class InjectLoader {
    /**
     * Loader injection.
     * @param {HTMLElement} element Element that loader would be injected.
     */
    constructor(element) {
        this.element = element;

        this.root = this.createDivWithClass('loader_injection__root text-primary');

        // Injections.
        this.injectCircularLoaderIndeterminate();

        // Style
        this.setRootStyle();

        this.element.style.position = 'relative';
    }

    /**
     * show loader method
     */
    show() {
        let contains = this.element.contains(this.root);
        if (!contains) this.element.appendChild(this.root);
    }

    /**
     * dismissing loader method.
     */
    dismiss() {
        this.root.remove();
    }

    /**
     * @param {String} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    /**
     * Inject circular indeterminate loader method.
     */
    injectCircularLoaderIndeterminate() {
        this.root.innerHTML = `
        <svg class="text-primary loader_icon" width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_147:1408)">
                <path
                    d="M0.00561523 46.1437V46.161C0.0171152 46.5117 0.0573652 46.851 0.126365 47.1787L0.189615 47.6962L0.252865 48.2425L0.362115 48.9785L0.620865 50.6805L1.01187 52.555C1.07512 52.8885 1.17287 53.2277 1.26487 53.5785L1.54662 54.6595C1.59837 54.8435 1.63862 55.0332 1.70187 55.2172L1.88012 55.7807L2.25387 56.948L2.35162 57.247L2.46087 57.546L2.68512 58.1497L3.15087 59.386L3.69137 60.6395L3.96737 61.2777C4.05937 61.4905 4.16862 61.6975 4.27212 61.916L4.90462 63.204C5.12887 63.6352 5.37037 64.0607 5.61187 64.492L5.97412 65.1417C6.09487 65.3602 6.23286 65.5672 6.36511 65.7857L7.17011 67.0737C8.30861 68.77 9.56786 70.449 10.9651 72.0417C12.3739 73.623 13.9034 75.118 15.5191 76.498C17.1521 77.855 18.8656 79.097 20.6136 80.1895C22.3731 81.2705 24.1729 82.1962 25.9496 82.9897L27.2836 83.536C27.5021 83.6222 27.7206 83.72 27.9449 83.8005L28.6061 84.0362C28.8246 84.1167 29.4744 84.3467 29.9056 84.4847L31.1936 84.8642C31.4064 84.9275 31.6134 84.9907 31.8204 85.0425L32.4471 85.1977L33.6719 85.4967L34.8621 85.7267L35.4429 85.836L35.7246 85.8877L36.0064 85.928L37.1104 86.0832L37.6451 86.158L38.1684 86.2097L39.1689 86.296C39.4909 86.3247 39.8071 86.3592 40.1119 86.365H40.1751C40.2022 87.872 40.82 89.3081 41.8954 90.3641C42.9708 91.4202 44.4179 92.0117 45.9251 92.0115L46.0689 92.0057H46.0919C46.434 91.9953 46.7745 91.9549 47.1096 91.885L47.6271 91.8217L48.1734 91.7585L48.9094 91.6492L50.6114 91.3905L52.4859 90.9995C52.8194 90.9362 53.1586 90.8385 53.5094 90.7465L54.5904 90.4647C54.7744 90.413 54.9641 90.3727 55.1481 90.3095L55.7116 90.1312L56.8789 89.7575L57.1779 89.6597L57.4769 89.5505L58.0806 89.3262L59.3169 88.8605L60.5704 88.32L61.2086 88.044C61.4214 87.952 61.6284 87.8427 61.8469 87.7392L63.1349 87.1067C63.5661 86.8825 63.9916 86.641 64.4229 86.3995L65.0726 86.0372C65.2911 85.9165 65.4981 85.7785 65.7166 85.6462L67.0046 84.8412C68.7009 83.7085 70.3799 82.4435 71.9726 81.0462C73.5539 79.6375 75.0489 78.108 76.4289 76.4922C77.7859 74.8592 79.0279 73.1457 80.1204 71.3977C81.2014 69.6382 82.1271 67.8385 82.9206 66.0617L83.4669 64.7277C83.5531 64.5092 83.6509 64.2907 83.7314 64.0665L83.9614 63.4052C84.0361 63.1867 84.2719 62.537 84.4099 62.1057L84.7894 60.8177C84.8526 60.605 84.9159 60.398 84.9676 60.191L85.1229 59.5642L85.4219 58.3395L85.6519 57.1492L85.7611 56.5685L85.8129 56.2867C85.8295 56.1914 85.8429 56.0955 85.8531 55.9992L86.0084 54.8952L86.0831 54.3605L86.1349 53.8372L86.2211 52.8367C86.2499 52.5147 86.2844 52.1985 86.2901 51.888L86.2959 51.7442C87.8169 51.7382 89.2735 51.1297 90.3469 50.052C91.4202 48.9743 92.0229 47.5153 92.0229 45.9942L92.0171 45.8505V45.8332C92.0066 45.4911 91.9662 45.1506 91.8964 44.8155L91.8331 44.298L91.7699 43.7517L91.6606 43.0157L91.4019 41.3137L91.0109 39.4392C90.9476 39.1057 90.8499 38.7665 90.7579 38.4157L90.4761 37.3347C90.4244 37.1507 90.3841 36.961 90.3209 36.777L90.1426 36.2135L89.7689 35.0462L89.6711 34.7472L89.5619 34.4482L89.3376 33.8445L88.8719 32.6082L88.3314 31.3547L88.0554 30.7165C87.9634 30.5037 87.8541 30.2967 87.7506 30.0782L87.1181 28.7902C86.8939 28.359 86.6524 27.9335 86.4109 27.5022L86.0486 26.8525C85.9279 26.634 85.7899 26.427 85.6576 26.2085L84.8526 24.9205C83.6975 23.1834 82.4297 21.5238 81.0576 19.9525C79.6423 18.3657 78.1208 16.8768 76.5036 15.4962C74.89 14.1531 73.188 12.9198 71.4091 11.8047C69.6934 10.756 67.9109 9.82063 66.0731 9.00449L64.7391 8.45824C64.5206 8.37199 64.3021 8.27424 64.0779 8.19374L63.4166 7.96374C63.1981 7.88899 62.5484 7.65324 62.1171 7.51524L60.8291 7.13575C60.6164 7.07825 60.4094 7.00924 60.2024 6.95749L59.5756 6.80224C59.1676 6.70175 58.7593 6.60208 58.3509 6.50324L57.1606 6.27324L56.5799 6.16399L56.2981 6.11224L56.0164 6.07199L54.9124 5.91674L54.3776 5.84199L53.8544 5.79024L52.8539 5.70399C52.5319 5.67524 52.2156 5.64074 51.9109 5.63499L51.6866 5.62924C51.658 4.12426 51.0404 2.69049 49.9664 1.63584C48.8924 0.581177 47.4476 -0.0102716 45.9424 -0.0115051L45.7986 -0.00575513H45.7814C45.4392 0.0047196 45.0987 0.0451238 44.7636 0.114995L44.2461 0.178245L43.6999 0.241495L42.9639 0.350745L41.2619 0.609495L39.3874 1.00049C39.0539 1.06374 38.7146 1.16149 38.3639 1.25349L37.2829 1.53524C37.0989 1.58699 36.9091 1.62724 36.7251 1.69049L36.1616 1.86874L34.9944 2.24249L34.6954 2.34024L34.3964 2.44949L33.7926 2.67374L32.5564 3.13949L31.3029 3.67999L30.6646 3.95599C30.4519 4.04799 30.2449 4.15724 30.0264 4.26074L28.7384 4.89324C28.3071 5.11749 27.8816 5.35899 27.4504 5.60049L26.8006 5.96274C26.5821 6.08349 26.3751 6.22149 26.1566 6.35374L24.8686 7.15874C23.1328 8.31576 21.4734 9.58338 19.9006 10.9537C18.3138 12.3691 16.8249 13.8906 15.4444 15.5077C14.1012 17.1214 12.8679 18.8234 11.7529 20.6022C10.7042 22.318 9.76875 24.1005 8.95262 25.9382L8.40637 27.2722C8.32012 27.4907 8.22237 27.7092 8.14187 27.9335L7.91187 28.5947C7.83712 28.8132 7.60136 29.463 7.46336 29.8942L7.08386 31.1822L6.89987 31.809C6.84237 32.016 6.79636 32.2287 6.74461 32.4357L6.44562 33.6605L6.21561 34.8507L6.10637 35.4315L6.05461 35.7132C6.03799 35.8086 6.02456 35.9045 6.01436 36.0007L5.85912 37.1047L5.78437 37.6395L5.73262 38.1627L5.64637 39.1632C5.61762 39.4852 5.58312 39.8015 5.57737 40.112L5.57162 40.2557C4.08074 40.305 2.66734 40.9316 1.62987 42.0035C0.592393 43.0753 0.0120445 44.5083 0.0113652 46L0.0171152 46.1437H0.00561523ZM6.60662 40.3132L6.61812 40.2615C6.67562 39.9682 6.76761 39.675 6.84811 39.3702L7.10686 38.433L7.24486 37.95L7.40586 37.4555L7.73936 36.4435L7.82561 36.1847L7.92337 35.926L8.12461 35.4027L8.54436 34.3332L9.02737 33.2465L9.27462 32.6945L9.55062 32.1425L10.1141 31.027C10.3096 30.6532 10.5339 30.291 10.7409 29.9115L11.0629 29.348C11.1721 29.1582 11.2929 28.98 11.4136 28.796L12.1266 27.6805C13.1515 26.1843 14.2712 24.7554 15.4789 23.4025C16.7266 22.0455 18.0721 20.7632 19.4866 19.5787C20.9241 18.4172 22.4249 17.365 23.9486 16.4335C25.4896 15.5192 27.0594 14.743 28.5946 14.076L29.7561 13.6217C29.9459 13.547 30.1356 13.4665 30.3254 13.4032L30.9004 13.2135C31.0901 13.1502 31.6536 12.9547 32.0274 12.8397L33.1429 12.5292C33.3269 12.4775 33.5051 12.42 33.6891 12.3797L34.2296 12.259L35.2876 12.0175L36.3169 11.8335L36.8171 11.7472L37.0644 11.7012C37.1449 11.684 37.2311 11.684 37.3116 11.6725L38.2661 11.5575L38.7261 11.5L39.1746 11.4655L40.0371 11.4022C40.3189 11.385 40.5834 11.3562 40.8536 11.3562L42.3256 11.3217L43.4756 11.362L43.9644 11.3735C44.6167 11.4096 45.2684 11.4556 45.9194 11.5115L46.0459 11.5057H46.0689C47.4094 11.472 48.696 10.9708 49.7061 10.0888C50.7162 9.20679 51.3862 7.9995 51.6004 6.67574L51.7441 6.71025C52.0374 6.76775 52.3306 6.85974 52.6354 6.94024L53.5726 7.19899L54.0556 7.33699L54.5501 7.49799L55.5621 7.83149L55.8209 7.91774L56.0796 8.0155L56.6029 8.21674L57.6724 8.63649L58.7591 9.11949L59.3111 9.36674L59.8631 9.64274L60.9786 10.2062C61.3524 10.4017 61.7204 10.626 62.0941 10.833L62.6576 11.155C62.8474 11.2642 63.0256 11.385 63.2096 11.5057L64.3251 12.2187C65.7914 13.2307 67.2346 14.3405 68.6031 15.571C69.9601 16.8187 71.2424 18.1642 72.4269 19.5787C73.5884 21.0162 74.6406 22.517 75.5721 24.0407C76.4864 25.5817 77.2626 27.1515 77.9296 28.6867L78.3839 29.8482C78.4586 30.038 78.5391 30.2277 78.6024 30.4175L78.7921 30.9925C78.8554 31.1822 79.0509 31.7457 79.1659 32.1195L79.4764 33.235C79.5281 33.419 79.5856 33.5972 79.6259 33.7812L79.7466 34.3217L79.9881 35.3797L80.1721 36.409L80.2584 36.9092L80.3044 37.1565C80.3216 37.237 80.3216 37.3232 80.3331 37.4037L80.4481 38.3582L80.5056 38.8182L80.5401 39.2667L80.6034 40.1292C80.6206 40.411 80.6494 40.6755 80.6494 40.9457L80.6839 42.4177L80.6436 43.5677L80.6321 44.0565C80.596 44.7088 80.55 45.3606 80.4941 46.0115L80.4999 46.138V46.161C80.5333 47.4844 81.0224 48.7558 81.8846 49.7604C82.7467 50.765 83.9291 51.4413 85.2321 51.6752L85.2149 51.7557C85.1574 52.049 85.0711 52.3422 84.9849 52.647L84.7261 53.5842L84.5881 54.0672L84.4271 54.5617L84.0936 55.5737L84.0074 55.8325L83.9096 56.0912L83.7084 56.6145L83.2886 57.684L82.8056 58.7707L82.5584 59.3227L82.2824 59.8747L81.7189 60.9902C81.5234 61.364 81.2991 61.732 81.0921 62.1057L80.7701 62.6692C80.6609 62.859 80.5401 63.0372 80.4194 63.2212L79.7064 64.3367C78.6815 65.8329 77.5618 67.2618 76.3541 68.6147C75.1024 69.9748 73.7637 71.252 72.3464 72.4385C70.9089 73.6 69.4081 74.6522 67.8844 75.5837C66.3865 76.466 64.8348 77.2534 63.2384 77.9412L62.0769 78.3955C61.8871 78.4702 61.6974 78.5507 61.5076 78.614L60.9326 78.8037C60.7429 78.867 60.1794 79.0625 59.8056 79.1775L58.6901 79.488C58.5061 79.5397 58.3279 79.5972 58.1439 79.6375L57.6034 79.7582L56.5454 79.9997L55.5161 80.1837L55.0159 80.27L54.7686 80.316C54.6824 80.3332 54.6019 80.3332 54.5214 80.3447L53.5669 80.4597L53.1069 80.5172L52.6584 80.5517L51.7959 80.615C51.5141 80.6322 51.2496 80.661 50.9794 80.661C50.4887 80.6717 49.998 80.6832 49.5074 80.6955L48.3574 80.6552L47.8686 80.6437C47.2163 80.6076 46.5645 80.5616 45.9136 80.5057L45.7871 80.5115H45.7699C44.4357 80.5462 43.155 81.0435 42.147 81.9183C41.139 82.7931 40.4663 83.991 40.2441 85.307C39.9566 85.2495 39.6634 85.1632 39.3644 85.0827L38.4271 84.824L37.9441 84.686L37.4496 84.525L36.4376 84.1915L36.1789 84.1052L35.9201 84.0075L35.3969 83.8062C35.0399 83.6674 34.6834 83.5275 34.3274 83.3865C33.9661 83.2234 33.6038 83.0624 33.2406 82.9035L32.6886 82.6562L32.1366 82.3802L31.0211 81.8167C30.6474 81.6212 30.2794 81.397 29.9056 81.19L29.3421 80.868C29.1524 80.7587 28.9741 80.638 28.7901 80.5172L27.6746 79.8042C26.1771 78.7812 24.7481 77.6614 23.3966 76.452C22.0366 75.2003 20.7593 73.8616 19.5729 72.4442C18.4284 71.027 17.3778 69.5365 16.4276 67.9822C15.5454 66.4844 14.758 64.9327 14.0701 63.3362L13.6159 62.1747C13.5411 61.985 13.4606 61.7952 13.3974 61.6055L13.2076 61.0305C13.1444 60.8407 12.9489 60.2772 12.8339 59.9035L12.5234 58.788C12.4716 58.604 12.4141 58.4257 12.3739 58.2417L12.2531 57.7012C12.173 57.3485 12.0925 56.9958 12.0116 56.6432L11.8276 55.614L11.7414 55.1137L11.6954 54.8665C11.6781 54.7802 11.6781 54.6997 11.6666 54.6192C11.6261 54.3013 11.5878 53.9832 11.5516 53.6647L11.4941 53.2047L11.4596 52.7562L11.3964 51.8937C11.3791 51.612 11.3504 51.3475 11.3504 51.0772C11.3397 50.5866 11.3282 50.0959 11.3159 49.6052L11.3561 48.4552L11.3676 47.9665C11.4037 47.3142 11.4497 46.6624 11.5056 46.0115L11.4999 45.885V45.8677C11.4662 44.5159 10.9572 43.2192 10.0623 42.2055C9.16739 41.1917 7.94382 40.5258 6.60662 40.3247V40.3132Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_147:1408">
                    <rect width="92" height="92" fill="white" />
                </clipPath>
            </defs>
        </svg>
        `;
    }

    /**
     * Root style method.
     */
    setRootStyle() {
        this.root.style.position = 'absolute';
        this.root.style.background = 'rgba(255,255,255,0.50)';
        this.root.style.top = '0';
        this.root.style.left = '0';
        this.root.style.height = '100%';
        this.root.style.width = '100%';
        this.root.style.display = 'flex';
        this.root.style.justifyContent = 'center';
        this.root.style.alignItems = 'center';
        this.root.style.cursor = 'wait';
    }
}

/**
 * @param {HTMLElement} element
 * @returns InjectLoader
 */
export const AddLoader = (element) => {
    return new InjectLoader(element);
};

/**
 * Function to listen when clicking outside of the element if the calback is not set, the element will be remove.
 * @param {HTMLElement} elt Element to target.
 * @param {any} [callback=undefined] Function to execute when click outside of element.
 */
export const OnOutsideClickListener = (elt, callback) => {
    if (elt === null || elt === undefined) return;
    const done = (e) => {
        let is_inside = false;
        if (e.target === elt) is_inside = true;
        else {
            let children = elt.querySelectorAll('*');
            let target = e.target;
            let index = 0;
            while (!is_inside && index < children.length) {
                is_inside = children[index] === target;
                index++;
            }
        }
        if (!is_inside) {
            if (callback !== undefined) callback();
            else elt.remove();
        }
    };
    window.addEventListener('mouseup', done);
    return {
        remove: () => window.removeEventListener('mouseup', done),
    };
};

/**
 * Fonction qui retoune la date courante en string.
 * @param {String} lang
 * @returns {String}
 */
export const GetDateToString = (lang) => {
    let date = new Date();
    return `${getStringDay(date, lang)} ${date.getDate()}, ${getStringMonth(date, lang)} ${date.getFullYear()}`;
};

/**
 * @param {Date} date
 * @param {String} lang
 * @returns {String}
 */
export const getStringDay = (date, lang) => {
    switch (date.getDay()) {
        case 1:
            return Lang.monday[lang];
        case 2:
            return Lang.tuesday[lang];
        case 3:
            return Lang.wednesday[lang];
        case 4:
            return Lang.thursday[lang];
        case 5:
            return Lang.friday[lang];
        case 6:
            return Lang.saturday[lang];
        case 7:
            return Lang.sunday[lang];
    }
};

/**
 * @param {Date} date
 * @param {String} lang
 * @returns {String}
 */
export const getStringMonth = (date, lang) => {
    let month = date.getMonth() + 1;
    switch (month) {
        case 1:
            return Lang.january[lang];
        case 2:
            return Lang.febuary[lang];
        case 3:
            return Lang.march[lang];
        case 4:
            return Lang.april[lang];
        case 5:
            return Lang.may[lang];
        case 6:
            return Lang.june[lang];
        case 7:
            return Lang.july[lang];
        case 8:
            return Lang.august[lang];
        case 9:
            return Lang.semptember[lang];
        case 10:
            return Lang.october[lang];
        case 11:
            return Lang.november[lang];
        case 12:
            return Lang.december[lang];
    }
};
