import PatientCard from '../PatientCard/PatientCard.js';

class PatientsBoard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.patients = [];
    }

    connectedCallback(){
        this.render();

        const form = this.shadowRoot.querySelector('.task-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = this.shadowRoot.querySelector('.input-name').value;
            const species = this.shadowRoot.querySelector('.input-species').value;
            const race = this.shadowRoot.querySelector('.input-race').value;
            const date = this.shadowRoot.querySelector('.input-date').value;
            const description = this.shadowRoot.querySelector('.input-description').value;


            this.patients.push({name, species, race, date, description, state: false});

            this.addPatients({name, species, race, date, description, state: false});

            form.reset();
        });

        // const inputChecked = this.shadowRoot.querySelector(`#${this.name}`)
        // inputChecked.addEventListener("submit", (e) => {
        //     e.preventDefault

        //     const name = this.shadowRoot.querySelector('.input-name').value;
        // })
        //NOTA: Soy conciente de que debo de iterar por cada una de las ids (this.name)
        //para buscar si esta el estado del input es 'checked' para enviarlo a patient-container-pending
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h1>Add Patient</h1>
        <form class='task-form'>
        <input type='text' placeholder='Add a Name' required class='input-name' />
        <input type='text' placeholder='Add a Species' required class='input-species' />
        <input type='text' placeholder='Add a Race' required class='input-race' />
        <input type='date' placeholder='Add a Date' required class='input-date' />
        <input type='text' placeholder='Add a Description' required class='input-description' />
        <button>Add</button>
        </form>
        <h3>Pending</h3>
        <ul class="patient-container-pending"></ul>
        <h3>Served</h3>
        <ul class="patient-container-served"></ul>
        `
        this.patients.forEach(patient => this.addPatients(patient));
        console.log(this.patients)
    }
    addPatients({name, species, race, date, description, state}){
        const patientsItem = document.createElement('patient-card')
        patientsItem.setAttribute('name', name)
        patientsItem.setAttribute('species', species)
        patientsItem.setAttribute('race', race)
        patientsItem.setAttribute('date', date)
        patientsItem.setAttribute('description', description)
        patientsItem.setAttribute('state', state)

        // if(state === 'checked'){
        //     this.shadowRoot.querySelector('.patient-container-pending').appendChild(patientsItem)
        // } else {
        //     this.shadowRoot.querySelector('.patient-container-served').appendChild(patientsItem)
        // }

       if('checked'){
            this.shadowRoot.querySelector('.patient-container-pending').appendChild(patientsItem)
        } else {
            this.shadowRoot.querySelector('.patient-container-served').appendChild(patientsItem)
        }
    }
}
customElements.define('patients-board', PatientsBoard);
export default PatientsBoard;