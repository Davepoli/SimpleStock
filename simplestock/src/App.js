import React from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import styles from './Index.module.css';
import { connect } from "react-redux";
import { fetchStocks } from "./actions/stocksActions";
import StockTable from './components/StockTable'
import { connectFirestore } from 'react-firestore-connect'
import firebase from 'firebase'
import CompanySearch from './components/CompanySearch';

const techStocks = ['AAPL', 'MSFT', 'FB', 'GOOG', 'TSLA', 'ACN']
const pharmaStocks = ['NVS', 'PFE', 'MRK', 'ABT', 'GSK']
const oilStocks = ['XOM', 'EOG', 'CVX', 'CHK', 'BP', 'COP']
const foodStocks = ['MCD', 'SBUX', 'WMT', 'KO', 'PG', 'YUM']
const stocks = [...techStocks, ...pharmaStocks, ...oilStocks, ...foodStocks]

const auth = firebase.auth
const provider = new firebase.auth.FacebookAuthProvider()

class App extends React.Component {
    state = {
        user: null,
    }

    // componentWillMount() {
    //     auth.onAuthStateChanged().then(user => {
    //       if (user) {
    //         this.setState({ user })
    //       }
    //     })
    //   }

    componentDidMount(){
        if (this.props.stocks.length < 23) {
            this.props.dispatch(fetchStocks(stocks))
        }
    }
      
    render() {
        const { loading, error, stocks } = this.props
        const { user } = this.state
        
        if (loading) {
            return <BeatLoader />
        }

        if (error) {
            return <div>{error.message}</div>
        }

        return(
            <div>
                <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p>
                <button onClick={this.login}>
                    Login with Facebook
                </button>

                <button onClick={this.logout}>
                    Logout
                </button>
                    <br />
                    <CompanySearch />
                <div>
                    <div className={styles.containerStockTable}>
                        <div className={styles.containerLeft}>
                            <StockTable stocks={stocks.slice(0,5)} />
                        </div>
                        <div className={styles.containerRight}>
                            <StockTable stocks={stocks.slice(6,11)} />
                        </div>
                    </div>
                    <div className={styles.containerStockTable}>
                        <div className={styles.containerLeft}>
                            <StockTable stocks={stocks.slice(12,17)} />
                        </div>
                        <div className={styles.containerRight}>
                            <StockTable stocks={stocks.slice(18,23)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

    login = () => {
        auth().signInWithPopup(provider)
            .then(({ user }) => this.setState({ user }))
            .catch(err => console.error(err))
    }

    logout = () => {
        auth().signOut().then(() => {
          this.setState({user: null}) 
        }).catch(err => console.error(err))
      }
}

const mapStateToProps = state => ({
    stocks: state.stocks.stocks,
    loading: state.stocks.loading,
    error: state.stocks.error
  });

export default 
    connect(mapStateToProps)(
    connectFirestore(
        (db, props, uid) => ({
            collection: db.collection('collection'),
            uid: uid
        }),
      )(App))