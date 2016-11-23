class Product {
  constructor(id, name, packing) {
    this.id = id;
    this.name = name;
    this.packing = packing;
    this.price = 0;
    this.quantity = 0;
  }
}

class Supplier {
  constructor(name) {
    this.name = name;
    this.catalogue = [];
  }

  addProduct(product, price, quantity) {
    product.price = price;
    product.quantity = quantity;
    this.catalogue.push(product);
  }

  productsQuantity() {
    let sum = 0;
    for (let i = 0; i < this.catalogue.length; i++) {
      const product = this.catalogue[i];
      sum += product.quantity;
    }
    return sum;
  }
}

const supplierObject = new Supplier(window.suppliers[0].name);

for (let i = 0; i < window.suppliers[0].catalogue.length; i++) {
  const product = window.suppliers[0].catalogue[i];
  const productInfo = window.products[product.id];
  const productObject = new Product(product.id,
                                    productInfo.name,
                                    productInfo.packing);
  supplierObject.addProduct(productObject, product.price, product.quantity);
}

supplierObject.productsQuantity();
//supplierObject.catalogue[0].name;
