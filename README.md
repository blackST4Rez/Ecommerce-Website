# Groove - Ecommerce Guitar Store

A full-featured ecommerce web application for purchasing guitars and amplifiers. Built with ReactJS & TailwindCSS, this application provides a seamless shopping experience with cart management, order processing, and user authentication.

### Screenshots

### Home Page
![Home Page](./Frontend/src/assets/SS1.png)

### Guitar Collection
![Product Collection](../Frontend/src/assets/SS2.png)

### AMP Collection
![Product Details](../Frontend/src/assets/SS3.png)

### Shopping Cart
![Shopping Cart](../Frontend/src/assets/SS4.png)

### Checkout Page
![Checkout Page](../Frontend/src/assets/SS5.png)

### Order Success
![Order Success](../Frontend/src/assets/SS6.png)

### Login Page
![Login Page](../Frontend/src/assets/SS7.png)

### Register Page
![Register Page](../Frontend/src/assets/SS8.png)

### Profile Page
![Profile Page](../Frontend/src/assets/SS9.png)

## Features

### Product Management
- Browse guitars and amplifiers collections
- Product detail pages with images, pricing, and specifications
- Filter and sort products by category, brand, material, and price
- Responsive product grid layout
- AMP (Amplifier) collection with dedicated page
- Product images with fallback handling

### Shopping Cart
- Add/remove items from cart
- Update quantities with +/- buttons
- Persistent cart storage using localStorage
- Cart drawer with real-time updates
- Total price calculation
- Cart counter in header

### User Authentication (In-Progress)
- Login and registration pages
- User session management with localStorage
- Protected routes (checkout requires login)
- Profile page with user information
- Logout functionality
- User name and email displayed in profile

### Order Management
- Checkout process with shipping information
- Order confirmation page with order number
- Order history in "My Orders" section
- Order status tracking (Confirmed/Pending)
- Local storage for order persistence
- Order details include:
  - Order number
  - Date and time
  - Shipping address
  - Items list
  - Total price
  - Status

### Checkout Flow
1. Add items to cart
2. Login (required for checkout)
3. Fill shipping information
4. Place order
5. View order confirmation with order number
6. Track orders in My Orders section

### UI/UX Features
- Dark theme with accent color `#CB2957`
- Responsive design for all screen sizes
- Loading states with spinners
- Toast notifications for user actions
- Smooth animations and transitions
- Mobile-friendly hamburger menu
- Hide scrollbar while maintaining scroll functionality

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **React Icons** - Icon library (Bi, Fa)

### State Management
- **Context API** - Cart and Auth state management
- **localStorage** - Persistent data storage for:
  - Cart items

### Libraries & Tools
- **Sonner** - Toast notifications
- **React Spinners** - Loading animations (FadeLoader, SyncLoader)
- **Vite** - Build tool and development server

### Routes

| Path | Component | Description | Protected |
|------|-----------|-------------|-----------|
| `/` | Home | Landing page | No |
| `/login` | Login | User login | No |
| `/register` | Register | User registration | No |
| `/profile` | Profile | User profile | Yes |
| `/my-orders` | MyOrders | Order history | Yes |
| `/collections/guitars` | CollectionPage | Guitar collection | No |
| `/collections/amp` | AMPCollectionPage | Amplifier collection | No |
| `/collections/:collection` | CollectionPage | Dynamic collection | No |
| `/product/:productId` | ProductDetailsPage | Product details | No |
| `/checkout` | CheckoutPage | Checkout process | Yes |
| `/order-success` | OrderSuccessPage | Order confirmation | Yes |

### Author

Github: @blackST4Rez ( Raka Maharjan )