// export default class Quote_line_items {
//     constructor(quote_item_name, quantity) {
//         this.quote_item_name = quote_item_name;
//         this.quantity = quantity;
//     }
// }

export default class Quote {
    constructor(quoteName, userID, quote_line_items) {
        this.quoteName = quoteName;
        this.userID = userID;
        this.quote_line_items = quote_line_items;
    }
}