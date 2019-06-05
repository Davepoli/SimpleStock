import React, {Component} from 'react';
import axios from 'axios'
import {withRouter} from "react-router-dom";

class CompanySearch extends Component {
    state = {
        text: '',
    }

    render() {
        const { match: { params } } = this.props
        const { text } = this.state

        return(
            <React.Fragment>
                <input
                    type="text" 
                    name="ticker" 
                    placeholder="Search for companies"
                    value={text}
                    onChange={this.handleCompanyChange}
                />
                <button onClick={this.handleCompanySearch} >
                    Search for company stock
                </button>
            </React.Fragment>
        
        )
    }

    handleCompanyChange = (e) => this.setState({ text: e.target.value })        

    handleCompanySearch = () => {
        const { text } = this.state
        console.log('som tu a hladam')
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=O8DZV7MIR4D7PGLZ`)
            .then(response => console.log('logujem response ', response))
            .catch((error) => console.error(error))
    }
}

export default withRouter(CompanySearch)

