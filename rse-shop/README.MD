# Refactor Speaking English: Book Shop

## `Planning for backend`

1. product (book listing) (crud)
   - ds:
   - img: str, title: str, description: str, price: num, authorName: str,
     paperType: hard cover | paperback, filter: str, banner: str
   - filter: - ds: title: [{id:id, title:str}] (crud)
   - banner: -ds: title: [{id:id, title:str}] (crud)
2. admin sign up /in (!cr)
   - ds: email: str, password: str
   - change pass: oldPass: str, newPass: str
3. customer (crud)
   - ds: name: str, img: str, email: str, password: str, isOnline: bool
4. invoice (crud)
   - userName: str, userEmail: str, productTitle: str, productPrice: num, productImg:str,
     productPaperType: str
5. dashboard: (r)
   - get from user and invoice model (filter: mostPurchased, activeUser)
