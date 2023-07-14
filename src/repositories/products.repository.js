import ProductsDao from '../dao/dbManagers/products.js';

export default class ProductRepository{
    constructor(){
        this.dao = new ProductsDao();
    }
    getProducts = async (limit, page, sort, query)=>{
        const result = await this.dao.getAll(limit, page, sort, query);
        return result;
    }
    createProduct = async (product)=>{
        const result = await this.dao.save(product);
        return result;
    }

    getProductById = async (id)=>{
        
        const result = await this.dao.getById(id);
        return result;
    }
    updateProduct = async (id,product)=>{
        const result = await this.dao.update(id,product);
        return result;
    }
   
}