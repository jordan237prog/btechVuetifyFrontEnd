// export default class Quote_line_items {
//     constructor(quote_item_name, quantity) {
//         this.quote_item_name = quote_item_name;
//         this.quantity = quantity;
//     }
// }

export default class Quote {
    constructor(quoteName, userId, quote_line_items) {
        this.quoteName = quoteName; 
        this.userId = userId; 
        this.quote_line_items = quote_line_items;
    }
}