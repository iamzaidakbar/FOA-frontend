# API Reference

This document lists all available API endpoints for the Food Ordering App backend.

---

## Authentication

**POST** `/api/auth/signup` — Register a new user  
**POST** `/api/auth/signin` — User login  
**GET** `/api/auth/signout` — User logout  
**POST** `/api/auth/send-otp` — Send OTP for verification  
**POST** `/api/auth/verify-otp` — Verify OTP  
**POST** `/api/auth/reset-password` — Reset password  
**POST** `/api/auth/google-auth` — Google authentication  

---

## Profile

**PUT** `/api/profile/me` - Update own profile
**PUT** `/api/profile/:userId` - Update user profile ( only admin )

## Items

**POST** `/api/item/add-item` — Add a new item (auth, image upload)  
**POST** `/api/item/bulk-add-items` — Bulk add items (auth, images upload)  
**POST** `/api/item/edit-item/:itemId` — Edit item (auth, image upload)  
**GET** `/api/item/get-by-id/:itemId` — Get item by ID (auth)  
**GET** `/api/item/delete/:itemId` — Delete item (auth)  
**GET** `/api/item/get-by-city/:city` — Get items by city (auth)  
**GET** `/api/item/get-by-shop/:shopId` — Get items by shop (auth)  
**GET** `/api/item/search-items` — Search items (auth)  
**POST** `/api/item/rating` — Rate an item (auth)  

---

## Orders

**POST** `/api/order/place-order` — Place a new order (auth)  
**POST** `/api/order/verify-payment` — Verify payment (auth)  
**GET** `/api/order/my-orders` — Get my orders (auth)  
**GET** `/api/order/get-assignments` — Get delivery assignments (auth)  
**GET** `/api/order/get-current-order` — Get current order (auth)  
**POST** `/api/order/send-delivery-otp` — Send delivery OTP (auth)  
**POST** `/api/order/verify-delivery-otp` — Verify delivery OTP (auth)  
**POST** `/api/order/update-status/:orderId/:shopId` — Update order status (auth)  
**GET** `/api/order/accept-order/:assignmentId` — Accept order (auth)  
**GET** `/api/order/get-order-by-id/:orderId` — Get order by ID (auth)  
**GET** `/api/order/get-today-deliveries` — Get today's deliveries (auth)  

---

## Shops

**POST** `/api/shop/create-edit` — Create or edit shop (auth, image upload)  
**GET** `/api/shop/get-my` — Get my shop (auth)  
**GET** `/api/shop/get-by-city/:city` — Get shops by city (auth)  

---

## Users

**GET** `/api/user/current` — Get current user (auth)  
**POST** `/api/user/update-location` — Update user location (auth)  

---

**Note:** All endpoints with (auth) require authentication. Endpoints with (image upload) require multipart/form-data.
