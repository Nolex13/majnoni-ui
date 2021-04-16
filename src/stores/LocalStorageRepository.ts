import {Product} from './CartStore';

const CART_ITEM = 'cart';

export class LocalStorageRepository{

    get = (): Product[] => {
        const storage = localStorage.getItem(CART_ITEM);
        if(storage){
            return JSON.parse(storage) as Product[] ;
        } else {
            return [];
        }
    }

    set = (products: Product[]) => {
        localStorage.setItem(CART_ITEM, JSON.stringify(products))
    }
}
