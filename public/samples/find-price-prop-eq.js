const findIfPropertyEquals = (obj, prop, val) => obj.find(x => x[prop] === val);

const dipirona = findIfPropertyEquals(window.products, "name", "Dipirona");
const microsoft = findIfPropertyEquals(window.suppliers, "name", "Microsoft");

findIfPropertyEquals(microsoft.catalogue, "id", dipirona.id);
