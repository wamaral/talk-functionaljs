const findIfPropertyEquals = (obj, prop, val) => obj.find(x => x[prop] === val);

findIfPropertyEquals(window.products, "id", 5);
//findIfPropertyEquals(window.suppliers, "name", "Microsoft");
