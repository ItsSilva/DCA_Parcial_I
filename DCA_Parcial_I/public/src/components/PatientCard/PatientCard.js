class PatientCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    static get observedAttributes(){
        return ['name', 'species', 'race', 'date', 'description', 'state'];
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }
    toggleTask(){
        this.state = !this.state;
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
        <li class=${this.state ? 'served' : 'task'}>
            <h3>${this.name}</h3>
            <p>${this.species}</p>
            <p>${this.race}</p>
            <p>${this.date}</p>
            <p>${this.description}</p>
            <p>${!this.state ? 'pending' : 'served'}</p>
            <input type="checkbox" ${this.state ? 'checked' : ''} id='${this.name}'>
        </li>
        `
        const checkbox = this.shadowRoot.querySelector(`#${this.name}`);
        checkbox.addEventListener('click', () => this.toggleTask());
    }
}
customElements.define('patient-card', PatientCard);
export default PatientCard;