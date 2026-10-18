# Floralia, explained simply

This guide explains the Floralia repository in plain language. It is for anyone new to the project, including beginners.

## 1. What is Floralia?

Floralia is an online **flower and gift shop** website. A visitor can:

- browse flowers and gifts,
- "like" the ones they love,
- add items to a cart,
- sign up or log in,
- place an order (pay on delivery).

It is a **React** app (the part you see in the browser). It uses **Firebase** for the "back end", so there is no server of our own:

- **Firebase Authentication** handles sign up and login.
- **Firestore** (a cloud database) stores user profiles and orders.

## 2. Tech stack

| Tool | What it does here |
| --- | --- |
| React 18 | Builds the pages from small reusable pieces called components |
| Create React App (`react-scripts`) | Runs and builds the project |
| React Router (`react-router-dom`) | Moves between pages without reloading |
| Firebase (Auth + Firestore) | Login and database |
| Font Awesome / `react-icons` | Icons |
| Plain CSS files | Styling (in `src/Styles/` and `src/App.css`) |

## 3. How to run it

You need [Node.js](https://nodejs.org/) installed.

```bash
npm install     # download the project's libraries (only needed once)
npm start       # run the site locally at http://localhost:3000
npm run build   # make an optimised version in the "build" folder
npm test        # run tests (if any)
```

### Firebase settings (`.env` file)

`src/Components/firebase.js` reads its Firebase settings from environment variables. Create a file called `.env` in the repo root and fill in the values from your Firebase project's settings:

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=...
```

Restart `npm start` after changing `.env`. Do not share this file or commit it.

## 4. Firebase files in the root

- **`.firebaserc`**: says which Firebase project this folder is linked to (the `default` project).
- **`firebase.json`**: tells the Firebase tools which files to deploy. Right now it only points to the Firestore rules file.
- **`firestore.rules`**: the security rules for the database.
  - `users/{userId}`: a signed-in person can read and write **only their own** profile.
  - `orders/{orderId}`: a signed-in person can **create** an order for themselves and **read** only their own orders.

To publish the rules: `npx firebase-tools deploy --only firestore:rules`.

## 5. Folder map

```
Floralia/
├── public/                 Static files served as they are
│   ├── index.html          The one HTML page React fills in
│   ├── assets/             Big images and videos (hero, about video, contact...)
│   ├── cust/               Customer / review photos
│   └── flower-pots/        Product pictures
├── src/
│   ├── index.js            Starts the app
│   ├── App.js              The "brain": routes + cart, likes and user state
│   ├── App.css             Global styles
│   ├── Sections/           Pages and big page blocks
│   ├── Components/         Reusable pieces, forms, Firebase setup, product data
│   └── Styles/             One CSS file per section or page
├── firestore.rules         Database security rules
├── firebase.json           Firebase tools config
├── .firebaserc             Firebase project link
└── package.json            Project info, libraries and npm scripts
```

### `src/Sections/` (pages and page blocks)

- **Home page blocks** (stacked together by `MainContent.js`): `Home`, `Occasions`, `About`, `Products`, `Review`, `Contact`, `Icon`, `Footer`.
- **Other pages**: `AllProductsPage` (the full catalogue), `Liked`, `Cart`, `Checkout`, `ThankYou`, `Login`, `Signup`, `Profile`.
- **`Header.js`**: the top menu, shown on every page.

### `src/Components/` (reusable pieces)

- `ProductComponent.js`: one product card.
- `ProductPage.js`: the detail page for a single product.
- `UpdateProfile.js`, `UpdateAddress.js`, `UpdatePaymentMethods.js`, `UpdatePreferences.js`: the edit forms reached from the profile page.
- `Logo.js`: the logo.
- `formatPrice.js`: turns a number into a price for display.
- `firebase.js`: sets up Firebase once and shares `auth` and `db` with the rest of the app.
- `productsData.json`: **the list of products** (names, prices, images and so on).

### `src/Styles/`

Each page or section has its own CSS file, for example `Cart.css` for `Cart.js`.

## 6. The pages (routes)

These are defined in `src/App.js`.

| URL | What you see | Login needed? |
| --- | --- | --- |
| `/` (and anything not listed below) | Home page with all its blocks | No |
| `/products` | All products | No |
| `/product/:id` | One product's detail page | No |
| `/liked` | Products you liked | No |
| `/cart` | Your cart | No |
| `/checkout` | Contact, address and payment, then confirm | Yes (shows a "log in" prompt otherwise) |
| `/thank-you` | Order placed message | No |
| `/login` | Log in | No |
| `/signup` | Create an account | No |
| `/profile` | Your profile | Yes (shows login otherwise) |
| `/profile/edit` | Edit name, birthday, phone, address | Yes |
| `/profile/addresses` | Manage saved addresses | Yes |
| `/profile/payments` | Manage payment methods | Yes |
| `/profile/preferences` | Manage preferences | Yes |

## 7. How the main things work

### Browsing and liking
Products come from `productsData.json`. Clicking the heart calls `handleLike` in `App.js`, which adds or removes the product from a list. The heart count in the header comes from that list.

### The cart
"Add to cart" calls `handleAddToCart` in `App.js`. If the item is already there, its quantity goes up by one. Otherwise it is added with quantity 1. The cart page can change quantities (never below 1) and remove items.

> **Good to know:** the cart and the liked list live in **React state**, in memory only. If you refresh the page they are emptied. Only profiles and orders are saved in Firestore.

### Signing up and logging in
`Signup.js` and `Login.js` use Firebase Authentication. When the app opens, `App.js` asks Firebase "who is logged in?". If someone is, it loads their profile from the Firestore `users` collection. While it checks, a "Loading…" message appears. If someone is sent to log in from checkout, they come back to checkout afterwards.

### Editing your profile
The forms in `src/Components/Update*.js` hand their data to functions in `App.js` (`handleUpdateProfile`, `handleUpdateAddresses` and so on). Those save to Firestore and update the screen.

### Checkout and thank-you
`Checkout.js` works in three steps:

1. **Contact details**: prefilled from the profile.
2. **Delivery address**: pick a saved one or type a new one.
3. **Payment**: only Cash on Delivery works for now. Card is shown as "coming soon".

When you press **Confirm Order**, the order is saved in the Firestore `orders` collection with status `pending`. The cart is then emptied and you go to `/thank-you`.

## 8. Where do I change what?

| I want to... | Look at |
| --- | --- |
| Add, remove or edit a product | `src/Components/productsData.json` (and add its picture in `public/`) |
| Change how a product card looks | `src/Components/ProductComponent.js` and its CSS in `src/Styles/` |
| Change the menu | `src/Sections/Header.js` and `src/Styles/Header.css` |
| Edit the home page text | The matching file in `src/Sections/` (`Home.js`, `About.js`, `Contact.js`...) |
| Add a new page | Create it in `src/Sections/`, then add a `<Route>` in `src/App.js` |
| Change colours or fonts everywhere | `src/App.css` |
| Change how prices are shown | `src/Components/formatPrice.js` |
| Change what is saved in an order | `handlePlaceOrder` in `src/Sections/Checkout.js` (and check `firestore.rules`) |
| Change who can read or write data | `firestore.rules` |
| Change cart, likes or login behaviour | The handler functions in `src/App.js` |

## 9. Tips for beginners

- Start with `src/App.js`. It shows every page and how data flows into it.
- A "prop" is information passed from a parent to a child component. For example, `App.js` passes `onAddToCart` down to the product cards.
- Save a file while `npm start` is running and the browser updates by itself.
- If something looks broken, open the browser's developer tools (F12) and read the Console tab.
