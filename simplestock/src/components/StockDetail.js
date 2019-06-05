import React, {Component} from 'react';
import Axios from 'axios';
import Chart from './Chart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import { BeatLoader } from 'react-spinners';
import { timeParse } from "d3-time-format";

const parseTime = timeParse("%Y-%m-%d")

class StockDetail extends Component {
    state = {
        stockData: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        Axios.get(`https://api.iextrading.com/1.0/stock/${this.props.match.params.ticker}/chart/5y`)
            .then(response => response.data.map(data => {
                return {
                    date: parseTime(data.date),
                    close: data.close
                }
            } 
                ))
            .then(data => this.setState({ stockData: data, loading: false }))
            .catch(err => console.error(err))
    }


    render() {
        const { stockData, loading } = this.state
        const { match: { params } } = this.props

        if(!stockData.length || loading){
            return(
                <BeatLoader />
            )
        }
        return(
            <React.Fragment>
                <h2>{params.ticker}</h2>
                <TypeChooser>
                    {type => <Chart type={type} data={stockData} />}
                </TypeChooser>
            </React.Fragment>
        
        )
    }
}

export default StockDetail