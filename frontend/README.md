# Quick Pay Frontend

A React + Vite frontend application for Quick Pay, integrated with Appwrite for authentication and data management.

## Features

- 🔐 User Authentication (Login/Register)
- 📊 Dashboard with transaction overview
- 💰 Add new transactions
- 🎨 Modern UI with Tailwind CSS
- 🔒 Protected routes
- 📱 Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Appwrite

1. Create an Appwrite project at [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Update the configuration in `src/lib/appwrite.js`:
   - Replace `'https://cloud.appwrite.io/v1'` with your Appwrite endpoint
   - Replace `'your-project-id'` with your actual project ID

### 3. Set up Appwrite Database

Create the following collections in your Appwrite project:

#### Users Collection
- **Collection ID**: `users`
- **Permissions**: Read/Write for authenticated users

#### Transactions Collection
- **Collection ID**: `transactions`
- **Permissions**: Read/Write for authenticated users
- **Attributes**:
  - `description` (String, 255 characters)
  - `amount` (Float)
  - `category` (String, 100 characters)
  - `type` (String, 20 characters) - "income" or "expense"
  - `date` (DateTime)
  - `userId` (String, 255 characters)

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx    # Route protection component
├── contexts/
│   └── AuthContext.jsx       # Authentication context
├── lib/
│   └── appwrite.js          # Appwrite configuration
├── pages/
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration page
│   ├── Dashboard.jsx        # Main dashboard
│   └── AddTransaction.jsx   # Add transaction form
├── App.jsx                  # Main app component with routing
└── main.jsx                 # App entry point
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
```

Then update `src/lib/appwrite.js` to use these variables:

```javascript
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Appwrite** - Backend-as-a-Service
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Programming language

## Next Steps

1. Set up your Appwrite project
2. Configure the environment variables
3. Test the authentication flow
4. Customize the UI to match your brand
5. Add more features like transaction categories, reports, etc.