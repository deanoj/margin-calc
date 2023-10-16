import {useState} from "react";

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

    return (
        <div className="margin-calc">
            <div>
                <label htmlFor="costPrice">Cost price</label>
                <input id="costPrice" type="number" onChange={handleOnChange} value={numbers.costPrice}/>
            </div>
            <div>
                <label htmlFor="sellPrice">Sell price</label>
                <input id="sellPrice" type="number"  onChange={handleOnChange} value={numbers.sellPrice}/>
            </div>
            <div>
                <label htmlFor="marginPercent">Margin (%)</label>
                <input id="marginPercent" type="number" onChange={handleOnChange} value={numbers.marginPercent}/>
            </div>
            <div>
                <label htmlFor="marginAmount">Margin (£)</label>
                <input id="marginAmount" type="number" onChange={handleOnChange} value={numbers.marginAmount}/>
            </div>
        </div>
    );
}

export default MarginCalc;