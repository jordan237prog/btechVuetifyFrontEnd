// export default class Bill_line_items {
//     constructor(bill_item_name, quantity){
//         this.bill_item_name = bill_item_name;
//         this.quantity = quantity;
//     }
// }

export default class Bill {
    constructor(billName, userId, bill_line_items) {
        this.billName = billName;
        this.userId = userId;
        this.bill_line_items = bill_line_items;
    }
}