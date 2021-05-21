import { LightningElement, api, track } from "lwc";

const defaultContactItems = [{ type: 'option-inline',
                               iconName: 'utility:add',
                               text: 'New Contact',
                               value: 'actionNewContact'}];
export default class Child extends LightningElement {
  @api index;
  @api _availableOptions;
    @track _inputText = "";
    @track _pill;
    _value;
    _synchronous = false;
    _options;
    _disableRemove;
    _disableAdd;

    @api
    get options() {
        return this._options;
    }

    set options(value) {
        // alert("set options: " + JSON.stringify(value));
        this._options = [...value];
        this._availableOptions = this._options;
    }

    @api
    get disableRemove() {
        return _disableRemove;
    }

    set disableRemove(value) {
        this._disableRemove = value;
    }

    connectedCallback() {
        this._availableOptions = this.options;
    }

    handleRemoveRow(event) {
        this.dispatchEvent(new CustomEvent('remove_row', { detail: {index: parseInt(this.index), queueId: this._value}, bubbles: true}));
    }

    handleContactInput(event) {
        const enteredText = event.target.inputText.toLowerCase();
        
        if (enteredText === '') {
            this._availableOptions = this._options;
        } else {
            this._availableOptions = this._options.filter(option => {
                return option.text.toLowerCase().includes(enteredText);
            });
            // this._availableOptions.unshift({
            //     type: 'option-inline',
            //     iconName: 'utility:search',
            //     text: `"${enteredText}" in Queue`,
            //     value: '',
            // });
        }

        this._inputText = enteredText;
    }    

    handleContactSelect(event) {
        this.inputText = "";
        const id = event.detail.value;
        const newPill = { type: 'icon', iconName: 'standard:queue' };
        for (let i = 0; i < this._availableOptions.length; i++) {
            const currentOption = this._availableOptions[i];
            if (currentOption.value !== '' && currentOption.value === id) {
                newPill.Id = id;
                newPill.label = currentOption.text;
                this._pill = newPill;
                this._value = id;
                this.fireChangeEvent();
                break;
            }
        }
    }

    handlePillRemove(event) {
        this.dispatchEvent(new CustomEvent('remove_pill', { detail: {index: parseInt(this.index), queueId: this._value}, bubbles: true}));
        this._pill = null;
        this._value = null;
    }

    handleSynchronousChange(event) {
        this.fireChangeEvent();
    }

    fireChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', 
            { detail: {index: parseInt(this.index), isSynchronous: this._synchronous, queueId: this._value} }));
    }

}
