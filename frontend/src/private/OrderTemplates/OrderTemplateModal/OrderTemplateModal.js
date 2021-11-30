import React, { useRef, useState, useEffect } from 'react';
import SelectSymbol from '../../../components/SelectSymbol/SelectSymbol';
import SymbolPrice from '../../../components/NewOrder/SymbolPrice';
import SelectSide from '../../../components/NewOrder/SelectSide';
import OrderType from '../../../components/NewOrder/OrderType';
import QuantityTemplate from './QuantityTemplate';
import { saveOrderTemplate } from '../../../services/OrderTemplatesService';
import { STOP_TYPES } from '../../../services/ExchangeService';
import PriceTemplate from './PriceTemplate';
import { getIndexes } from '../../../services/BeholderService';

export const DEFAULT_ORDER_TEMPLATE = {
    name: '',
    symbol: 'BTCUSDT',
    type: 'MARKET',
    side: 'BUY',
    limitPrice: '',
    limitPriceMultiplier: 1,
    stopPrice: '',
    stopPriceMultiplier: 1,
    quantity: '',
    quantityMultiplier: 1,
    icebergQty: '',
    icebergQtyMultiplier: 1
}

/**
 * props:
 * - onSubmit
 */
function OrderTemplateModal(props) {

    const [error, setError] = useState('');
    const [indexes, setIndexes] = useState([]);

    const [orderTemplate, setOrderTemplate] = useState(DEFAULT_ORDER_TEMPLATE);

    const btnClose = useRef('');
    const btnSave = useRef('');

    function onSubmit(event) {
        const token = localStorage.getItem('token');
        saveOrderTemplate(orderTemplate.id, orderTemplate, token)
            .then(result => {
                btnClose.current.click();
                if (props.onSubmit) props.onSubmit(result);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }

    function onInputChange(event) {
        setOrderTemplate(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    useEffect(() => {
        if (!orderTemplate || !orderTemplate.symbol) return;
        const token = localStorage.getItem('token');
        getIndexes(token)
            .then(indexes => {
                const indexesRegex = /^(BOOK|LAST_CANDLE|LAST_ORDER)/;
                const filteredIndexes = indexes.filter(k => k.symbol === orderTemplate.symbol && indexesRegex.test(k.variable));
                setIndexes(filteredIndexes);
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : err.message);
            })
    }, [orderTemplate.symbol])

    useEffect(() => {
        setError('');
        setOrderTemplate(props.data);
    }, [props.data])

    function getPriceClasses(orderType) {
        return orderType === 'MARKET' ? "col-md-6 mb-3 d-none" : "col-md-6 mb-3";
    }

    function getIcebergClasses(orderType) {
        return orderType === 'ICEBERG' ? "col-md-6 mb-3" : "col-md-6 mb-3 d-none";
    }

    function getStopPriceClasses(orderType) {
        return STOP_TYPES.indexOf(orderType) !== -1 ? "col-md-6 mb-3" : "col-md-6 mb-3 d-none";
    }

    return (
        <div className="modal fade" id="modalOrderTemplate" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">{orderTemplate.id ? 'Edit' : 'New'} Order Template</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="symbol">Symbol:</label>
                                        <SelectSymbol symbol={orderTemplate.symbol} onChange={onInputChange} onlyFavorites={false} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" placeholder="My Template name" defaultValue={orderTemplate.name} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <SelectSide side={orderTemplate.side} onChange={onInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <OrderType type={orderTemplate.type} onChange={onInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className={getPriceClasses(orderTemplate.type)}>
                                    <PriceTemplate id="limitPrice" text="Unit Price:" indexes={indexes} onChange={onInputChange} price={orderTemplate.limitPrice} multiplier={orderTemplate.limitPriceMultiplier} />
                                </div>
                                <div className={getStopPriceClasses(orderTemplate.type)}>
                                    <PriceTemplate id="stopPrice" text="Stop Price:" indexes={indexes} onChange={onInputChange} price={orderTemplate.stopPrice} multiplier={orderTemplate.stopPriceMultiplier} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <QuantityTemplate id="quantity" text="Quantity:" quantity={orderTemplate.quantity} multiplier={orderTemplate.multiplier} onChange={onInputChange} />
                                </div>
                                <div className={getIcebergClasses(orderTemplate.type)}>
                                    <QuantityTemplate id="icebergQty" text="Iceberg Qty:" quantity={orderTemplate.icebergQty} multiplier={orderTemplate.icebergQtyMultiplier} onChange={onInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {
                            error
                                ? <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
                                : <React.Fragment></React.Fragment>
                        }
                        <button ref={btnSave} type="button" className="btn btn-sm btn-primary" onClick={onSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTemplateModal;