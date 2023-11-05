import { useState } from "react";

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
            default:

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
        const result = +(((parseFloat(sell) - parseFloat(cost)) / parseFloat(sell)) * 100).toFixed(2)

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
            <div className="text-center">
                <h1 className="text-center">Margin Calc</h1>
            </div>
            <hr/>
            <form>
                <div className="row">
                    <label htmlFor="costPrice" className="form-label">Cost &pound;</label>
                    <div className="col">
                        <input id="costPrice" inputMode="decimal" className="form-control" type="number" onChange={handleOnChange} value={numbers.costPrice}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="sellPrice" className="form-label">Sell &pound;</label>
                    <div className="col">
                        <input id="sellPrice" inputMode="decimal" className="form-control" type="number"  onChange={handleOnChange} value={numbers.sellPrice}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="marginPercent" className="form-label">Margin %</label>
                    <div className="col">
                        <input id="marginPercent" inputMode="decimal" className="form-control" type="number" onChange={handleOnChange} value={numbers.marginPercent}/>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="marginAmount" className="form-label">Margin &pound;</label>
                    <div className="col">
                        <input id="marginAmount" inputMode="decimal" className="form-control" type="number" onChange={handleOnChange} value={numbers.marginAmount}/>
                    </div>
                </div>
                <hr/>
                <div className="text-center">
                    <button type="reset" className="btn btn-dark" onClick={resetForm}>Reset Form</button>
                </div>
                <hr/>
                <div className="text-center">
                    <a href="https://github.com/deanoj/margin-calc">https://github.com/deanoj/margin-calc</a>
                </div>
            </form>
        </div>
    );
}

export default MarginCalc;