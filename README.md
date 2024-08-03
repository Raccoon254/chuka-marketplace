# Chuka Marketplace

Chuka Marketplace is a web application that allows users to buy and sell second-hand items. The platform is designed to showcase a wide variety of items, making it easy for buyers to find what they need and for sellers to reach a broader audience.

## Features

- **User Authentication**: Secure login and registration for users.
- **Item Listings**: Sellers can list their second-hand items for sale, including details like title, description, price, location, and contact information.
- **Image Uploads**: Sellers can upload images of their items to give buyers a better view of the products.
- **Responsive Design**: The application is designed to be fully responsive, providing a seamless experience on both desktop and mobile devices.
- **User Actions**: Track user actions such as listing an item or updating profile details.

## Technologies Used

### Frontend
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Prisma**: An ORM (Object-Relational Mapping) tool for database management.
- **MongoDB**: A NoSQL database for storing application data.

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id               String    @id @default(auto()) @map("_id") @db.ObjectId
  email            String    @unique
  password         String
  name             String
  image            String?
  resetToken       String?
  resetTokenExpiry DateTime?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  items            Item[]
}

model Item {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  price       Float
  location    String
  contact     String
  images      String[]
  sellerId    String   @db.ObjectId
  seller      User     @relation(fields: [sellerId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model UserAction {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  userId      String   @db.ObjectId
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/chuka-marketplace.git
   ```

2. **Install dependencies**:
   ```
   cd chuka-marketplace
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project and add your environment variables, including the `DATABASE_URL` for MongoDB.

4. **Generate Prisma Client**:
   ```
   npx prisma generate
   ```

5. **Run the development server**:
   ```
   npm run dev
   ```

6. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- **Register**: Create an account to start listing items or browsing available products.
- **Login**: Log in to manage your listings and view detailed item information.
- **Create Listing**: Fill in the item details, upload images, and submit to list your item on the marketplace.
- **Browse Items**: View items available for purchase, filter by categories, and contact sellers.

## Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or support, please contact [support@chukamarketplace.com](mailto:tomsteve187@gmail.com).