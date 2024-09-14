import * as components from "./components/index.js"

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
            <h1>AnivalVet</h1>
            <patients-board></patients-board>
        `
    }
}
customElements.define('app-container', AppContainer);