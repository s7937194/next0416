export const n6 = new Intl.NumberFormat("en-us", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
});
export const n4 = new Intl.NumberFormat("en-us", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
});

export const c2 = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
    if (str) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};

export const tokenValue = (value, decimals) => (decimals ? value / Math.pow(10, decimals) : value);

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (value, decimals, symbol) => `${n4.format(tokenValue(value, decimals))} ${symbol}`;

export const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
};

export const attributesRarityPrice = (rarityPriceJson, attributes) => {
    let rarity = 0;
    for (let i = 0; i < attributes.length; i++){
        let val = attributes[i].value;
        rarity += rarityPriceJson[val]
    }
    return rarity;
};

export const getRarityTag = (price) => {
    if (price < 5) {
        return "Common";
    } else if (price >=5 && price < 7) {
        return "Uncommon";
    } else if (price >= 7 && price < 9) {
        return "Rare";
    } else if (price >= 9 && price < 11) {
        return "Mystic"
    }
    return "Legendary";
}