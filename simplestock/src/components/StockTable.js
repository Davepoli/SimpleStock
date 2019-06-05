import React from 'react';
import styles from './StockTableStyle.module.css'
import {withRouter} from "react-router-dom";

const StockTable = (props) => {
    const {
        stocks,
        history
        } = props
    return(
    <div className={styles.container}>
        <div className={styles.stockTitleContainer}>
            <h3>Symbol</h3>
            <h3>Last price</h3>
            <h3>Change</h3>
            <h3>% Change</h3>
        </div>
        <hr />
        {
            stocks.map(({ticker, close, change, changePercent}) => (
                <div className={styles.stockContainer} key={ticker} onClick={() => history.push(`/${ticker}`)}>
                    <p className={styles.text}>{ticker}</p>
                    <p>{close}</p>
                    <p className={change > 0 ? styles.textSuccess : styles.textDanger}>
                        {change}
                    </p>
                    <p className={change > 0 ? styles.textSuccess : styles.textDanger}>
                        {`${changePercent} %`}
                    </p>
                </div>
        ))
        }
    </div>
)
}

export default withRouter(StockTable)