import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})                        // service is used for pass any data across the components
export class CartService {

  public cartItemList: any =[]  
  public ProductList = new BehaviorSubject<any>([]);  // we can emmit and pass the value. it will act as boolean and observable and this can also be a subscribe
                                                    
  constructor() { }

  getProducts(){ // whoever call this they will get data present inside it and user can subscribe also
    return this.ProductList.asObservable();
  }

  setproduct(product : any){  // i will be push whatever coming inside init
    this.cartItemList.push(...product);  // push the product inside the carditemlist 
    this.ProductList.next(product);   
  }

  addtoCart(product:any){
    this.cartItemList.push(product);  // push the product whatever we are passing
    this.ProductList.next(this.cartItemList); // we are passing to the cardlistitem
    this.getTotalPrice();  // it will show the total price of items 
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCardItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{  // here index means which we need to remove it 
      if(product.id=== a.id){
        this.cartItemList.splice(index,1); // here we have splice the index item
      }
    })
    this.ProductList.next(this.cartItemList); // cart icon function
  }
  removeAllCart(){
    this.cartItemList =[]
    this.ProductList.next(this.cartItemList)
  }
}
