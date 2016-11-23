const productById = id => window.products.find(p => p.id === id);

productById(1).name;
