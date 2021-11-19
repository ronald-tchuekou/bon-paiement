class FilesChooser extends window.HTMLInputElement {
    /**
     * @type FileList
     */
    fileList = null;

    /**
     * @type HTMLDivElement
     */
    container;

    ingoreCallbacks = false;

    static get observeAttributes() {
        return ['label', 'description', 'multiple', 'onChange'];
    }

    connectedCallback() {
        if (this.ingoreCallbacks) return;
        this.ingoreCallbacks = true;
        let div = this.renderContent();

        // Added events on container.

        div.addEventListener('dragover', () => {
            div.classList.add('is-hovered');
            console.log('dragover');
        });
        div.addEventListener('dragleave', () => {
            div.classList.remove('is-hovered');
            console.log('dragleave');
        });
        div.addEventListener('drop', () => {
            div.classList.remove('is-hovered');
            console.log('drop');
        });

        this.insertAdjacentElement('afterend', div);
        this.style.transform = 'scale(0)';
        this.style.position = 'absolute';
        this.container = div;
    }

    disconnectedCallback() {
        console.log('Element is disconnected to the dom');
    }

    attributesChangeCallback(name, oldValue, newValue) {
        console.log('attribute', name, 'oldValue', oldValue, 'newValue  ', newValue);
    }

    /**
     * Fonction qui permet de créer le contenu principale du custom element.
     */
    renderContent() {
        const attr = this.getAttributes();
        let container = this.createElementWithClassName('div', 'files-chooser__wrapper');

        // Label of the custom element.
        this.label = this.createElementWithClassName('div', 'image-chooser__label');
        this.label.innerHTML = `<div class="title">${attr.label}</div>
            <div class="description">${attr.description}</div>`;
        // Add helper text to the container;
        container.appendChild(this.label);

        // Input that will holder files.
        this.input = this.createInpurtContent();
        container.appendChild(this.input);
        return container;
    }

    /**
     * Fonction that return label and description attributes.
     * @returns {label: string, description: string}
     */
    getAttributes() {
        return {
            label: this.hasAttribute('label') ? this.getAttribute('label') : 'Drop files or Click to choose files',
            description: this.hasAttribute('description')
                ? this.getAttribute('description')
                : 'Upload files to description your content explanations',
        };
    }

    /**
     * To get input tha will content the choosed images.
     */
    createInpurtContent() {
        let input = this.createElementWithClassName('input');
        input.setAttribute('type', 'file');
        input.setAttribute('name', this.getAttribute('name'));
        input.setAttribute('multiple', this.getAttribute('multiple'));
        input.addEventListener('change', this.onContentChange.bind(this));
        return input;
    }

    /**
     * @param {ChangeEvent} e
     */
    onContentChange(e) {
        let fileList = this.mergeFileListe(this.fileList || {}, e.target.files);
        this.updateContent(this.fileList, fileList);
        this.fileList = fileList;
        this.files = this.fileList;
        e.target.files = this.arrayToFileList([]);
        this.dispatchEvent(new Event('change'));
    }

    updateContent(oldFiles, newFiles) {
        const [added, removed] = this.getDifferences(oldFiles, newFiles);
        this.container.classList.add('has-files');
        added.forEach((item) => {
            this.container.appendChild(this.createFileItem(item));
        });
    }

    onValueChange() {
        this.input.files = this.fileList;
        this.input.dispatchEvent(new Event('change'));
        if (this.fileList.length <= 0) {
            this.container.classList.remove('has-files');
        }
    }

    /**
     * Function to render file item to the container.
     * @param {File} file_content
     */
    createFileItem(file_content) {
        let item = this.createElementWithClassName('div', 'drop-file_item');

        let label = this.createElementWithClassName('div', 'drop-item-label');
        label.innerText = file_content.name;
        label.style.display = 'none';
        item.appendChild(label);

        // Image.
        let img = this.createElementWithClassName('img');
        img.setAttribute('src', window.URL.createObjectURL(file_content));
        item.appendChild(img);
        // Remove button.
        let remove_btn = this.createElementWithClassName('button', 'drop-file-remove-btn');
        remove_btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>`;
        item.appendChild(remove_btn);

        // Events
        remove_btn.addEventListener('click', () => {
            this.removeItem(file_content);
            item.remove();
        });

        item.addEventListener('mouseover', (e) => {
            let rect = e.target.getBoundingClientRect();
            let label = item.querySelector('.drop-item-label');
            label.style.display = 'block';
            label.style.top = `${rect.top + rect.height + 10}px`;
            label.style.left = `${rect.left + rect.width / 2 - label.offsetWidth / 2}px`;
        });
        item.addEventListener('mouseleave', () => {
            label.style.display = 'none';
        });

        return item;
    }

    /**
     * @param {File} item
     */
    removeItem(item) {
        this.fileList = this.arrayToFileList(Array.from(this.fileList).filter((_file) => _file !== item));
        this.onValueChange();
    }

    /**
     * Fonction that return diff between to file list.
     * @param {FileList} oldFiles
     * @param {FileList} newFiles
     */
    getDifferences(oldFiles, newFiles) {
        if (oldFiles === null) {
            return [Array.from(newFiles), []];
        }
        const added = Array.from(newFiles).filter((item) => !Array.from(oldFiles).includes(item));
        const removed = Array.from(oldFiles).filter((item) => !Array.from(newFiles).includes(item));
        return [added, removed];
    }

    /**
     * Fonction that return merge list of files.
     * @param {File[]} files1
     * @param {File[]} files2
     * @returns {File[]}
     */
    mergeFiles(files1, files2) {
        let files = [...files1];
        files2.forEach((item) => {
            if (files1.find((file) => file.size === item.size && file.name === item.name) === undefined) {
                files.push(item);
            }
        });
        return files;
    }

    /**
     * Fonction that return merge list of filesList.
     * @param {FileList} fileList1
     * @param {FileList} fileList2
     * @returns {FileList}
     */
    mergeFileListe(fileList1, fileList2) {
        return this.arrayToFileList(this.mergeFiles(Array.from(fileList1), Array.from(fileList2)));
    }

    /**
     * Fonction that return filelist of files.
     * @param {File[]} files1
     * @return {FileList}
     */
    arrayToFileList(files) {
        const data = new ClipboardEvent('').clipboardData || new DataTransfer();
        files.forEach((item) => data.items.add(item));
        return data.files;
    }

    /**
     *Create element with className.
     * @param {keyof HTMLElementTagNameMap} tag_name
     * @param {string} className
     * @returns {HTMLElement}
     */
    createElementWithClassName(tag_name, className) {
        let element = document.createElement(tag_name);
        element.className = className || '';
        return element;
    }
}

customElements.define('files-chooser', FilesChooser, { extends: 'input' });

export default FilesChooser;
