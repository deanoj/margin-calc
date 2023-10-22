import {useState} from "react";
import { BiCalculator } from 'react-icons/bi';

function MarginCalc() {
    const [numbers, setNumbers] = useState({
        "costPrice": '',
        "sellPrice": '',
        "marginPercent": '',
        "marginAmount": ''
    });

    function handleOnChange(e) {
        const target = e.target.id;
        const inputValue = e.target.value;

        let costPrice = numbers.costPrice;
        let sellPrice = numbers.sellPrice;
        let marginPercent = numbers.marginPercent;
        let marginAmount = numbers.marginAmount;

        // start calculating!
        switch (target) {
            case 'costPrice':
                costPrice = inputValue;
                if (sellPrice) {
                    marginPercent = getMarginPercent(costPrice, sellPrice);
                    marginAmount = getMarginAmount(costPrice, sellPrice);
                }
                break;
            case 'sellPrice':
                sellPrice = inputValue;
                if (costPrice) {
                    marginPercent = getMarginPercent(costPrice, sellPrice);
                    marginAmount = getMarginAmount(costPrice, sellPrice);
                }
                break;
            case 'marginPercent':
                marginPercent = inputValue;
                if (costPrice) {
                    sellPrice = (parseFloat(costPrice) * ((marginPercent / 100) + 1)).toFixed(2);
                    marginAmount = getMarginAmount(costPrice, sellPrice);
                }
                else if (sellPrice) {
                    costPrice = (parseFloat(sellPrice) / ((marginPercent / 100) + 1)).toFixed(2);
                    marginAmount = getMarginAmount(costPrice, sellPrice);
                }
                break;
            case 'marginAmount':
                marginAmount = inputValue
                if (costPrice) {
                    sellPrice = (parseFloat(costPrice) + parseFloat(marginAmount)).toFixed(2);
                    marginPercent = getMarginPercent(costPrice, sellPrice);
                } else if (sellPrice) {
                    costPrice = (parseFloat(sellPrice) - parseFloat(marginAmount)).toFixed(2);
                    marginPercent = getMarginPercent(costPrice, sellPrice);
                }
                break;
        }

        const num = {
            "costPrice": costPrice,
            "sellPrice": sellPrice,
            "marginPercent": marginPercent,
            "marginAmount": marginAmount
        };

        console.log(num);
        setNumbers(num);
    }

    function getMarginPercent(cost, sell) {
        const result = +(((parseFloat(sell) / parseFloat(cost)) - 1.0) * 100).toFixed(2);

        return isNaN(result) ? '' : result;
    }

    function getMarginAmount(cost, sell) {
        const result = parseFloat(sell) - parseFloat(cost);

        return isNaN(result) ? '' : result.toFixed(2);
    }

    function resetForm(e) {
        setNumbers({
            "costPrice": '',
            "sellPrice": '',
            "marginPercent": '',
            "marginAmount": ''
        })
    }

    return (
        <div className="margin-calc">
            <div className="row">
                <div className="col col-md-6 offset-md-3">
                    <h1 className="display-2 text-center mt-2"><BiCalculator /> Margin Calc</h1>
                    <hr/>
                    <form>
                        <div className="row mt-3 mb-3">
                            <label htmlFor="costPrice" className="col-4 col-md-3 offset-md-2 col-form-label col-form-label-lg text-end">Cost &pound;</label>
                            <div className="col-8 col-md-3">
                                <input id="costPrice" className="form-control form-control-lg" type="number" onChange={handleOnChange} value={numbers.costPrice}/>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <label htmlFor="sellPrice" className="col-4 col-md-3 offset-md-2 col-form-label col-form-label-lg text-end">Sell &pound;</label>
                            <div className="col-8 col-md-3">
                                <input id="sellPrice" className="form-control form-control-lg" type="number"  onChange={handleOnChange} value={numbers.sellPrice}/>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <label htmlFor="marginPercent" className="col-4 col-md-3 offset-md-2 col-form-label col-form-label-lg text-end">Margin %</label>
                            <div className="col-8 col-md-3">
                                <input id="marginPercent" className="form-control form-control-lg" type="number" onChange={handleOnChange} value={numbers.marginPercent}/>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <label htmlFor="marginAmount" className="col-4 col-md-3 offset-md-2 col-form-label col-form-label-lg text-end">Margin &pound;</label>
                            <div className="col-8 col-md-3">
                                <input id="marginAmount" className="form-control form-control-lg" type="number" onChange={handleOnChange} value={numbers.marginAmount}/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col text-center">
                                <button type="reset" className="btn btn-dark" onClick={resetForm}>Reset Form</button>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col text-center">
                                <a href="https://github.com/deanoj/margin-calc">https://github.com/deanoj/margin-calc</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MarginCalc;