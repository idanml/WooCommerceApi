const pipe = (val, ...funcs) => funcs.reduce((res, func) => func(res), val);

const mirrorMap = map =>  Object.keys(map).reduce((acc, val) => ({ ...acc, [map[val]]: val }), {});

const mapWooToShu = (obj, map) => 
    Object.keys(map).reduce((acc, val) => ({ ...acc, [val]: obj[map[val]] }), {});



const mapShuToWoo = (obj, map) => pipe(
    map,
    mirrorMap,
    newMap => mapWooToShu(obj)
);

module.exports = { 
    mapShuToWoo,
    mapWooToShu
};

