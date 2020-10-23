class Products {
    async getProducts() {
        try {
            let result = await fetch('../products.json');
            let data = await result.json();
            this.products = data.map((product) => {
                return product;
            });
            return this.products;
        } catch (error) {
            console.log(error);
        }
    }
}

const product = new Products();
const data = product.getProducts();

localStorage.setItem(1, 2);
localStorage.setItem(3, 5);

const getCart = () => {
    const lsLength = localStorage.length;

    for (let i = 0; i < lsLength; i++) {
        let key = localStorage.key(i);
    }
};
