import { LightningElement, api, track } from "lwc";
const queues = [   
	 { 
		type: 'option-inline',
		text: 'John Doe',
		iconName: 'standard:queue',
    iconAlternativeText: 'Queue icon',
    value: 'a07B0000001fDrS' // ID of the contact
	 },
	 { 
		type: 'option-inline',
		text: 'Jane Dowson',
		iconName: 'standard:queue',
    iconAlternativeText: 'Queue icon',
    value: 'a07B0000001gAbCD' // ID of the contact
	 },
    { 
		type: 'option-inline',
		text: 'Bob Ross',
		iconName: 'standard:queue',
    iconAlternativeText: 'Queue icon',
    value: 'a07B0000001gAbCE' // ID of the contact
	 },
    { 
		type: 'option-inline',
		text: 'Captain America',
		iconName: 'standard:queue',
    iconAlternativeText: 'Queue icon',
    value: 'a07B0000001gAbCF' // ID of the contact
	 }
];

export default class App extends LightningElement {
  index = 1;
  @track options = queues;
  @track rows=[{index: this.index}];
  @track disableRemove;
  @track disableAdd;

  connectedCallback() {
      this.setDisableRemove();
  }

  handleAddRow() {
    this.index = this.index + 1;
    this.rows.push({index: this.index});
    this.setDisableRemove();
    this.setDisableAdd();
  }

  handleRemoveRow(event) {
    const detail = event.detail;
    // alert(JSON.stringify(detail));
    this.rows = this.rows.filter(row => parseInt(row.index) !== parseInt(detail.index));
    this.handleRemovePill(event);
    this.setDisableRemove();
    this.setDisableAdd();
  }

  setDisableRemove() {
    this.disableRemove = this.rows.length <= 1;
  }

  setDisableAdd() {
    this.disableAdd = this.rows.length >= queues.length;
  }

  handleRemovePill(event) {
    const detail = event.detail;
    // alert("handle remove pill: " + JSON.stringify(detail));
    if (detail.queueId !== null) {
      for (const q of queues) {
        if (q.value === detail.queueId) {
          this.options = [...this.options, q];
          // alert("options left: " + JSON.stringify(this.options));
          break;
        }
      }
    }
  }

  handleChange(event) {
    const value = event.detail;
    // alert("handle change: " + JSON.stringify(value));
    if (value.queueId !== null) {
      this.options = this.options.filter(option => option.value !== value.queueId);
      // alert("handle change Options left: " + JSON.stringify(this.options));
    }
  }

}
