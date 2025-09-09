import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch this data from Appwrite
    const mockTransactions = [
      { id: 1, description: 'Coffee', amount: -5.50, date: '2024-01-15', category: 'Food' },
      { id: 2, description: 'Salary', amount: 3000.00, date: '2024-01-14', category: 'Income' },
      { id: 3, description: 'Gas', amount: -45.20, date: '2024-01-13', category: 'Transportation' },
      { id: 4, description: 'Groceries', amount: -120.75, date: '2024-01-12', category: 'Food' },
    ];
    
    setTransactions(mockTransactions);
    
    const totalBalance = mockTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    setBalance(totalBalance);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quick Pay</h1>
              <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/add-transaction"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Transaction
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Balance Card */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Current Balance</h3>
              <div className="mt-2">
                <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your latest financial activity
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              transaction.amount >= 0 ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <span className={`text-sm font-medium ${
                                transaction.amount >= 0 ? 'text-green-800' : 'text-red-800'
                              }`}>
                                {transaction.amount >= 0 ? '+' : ''}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.category} • {formatDate(transaction.date)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 sm:px-6">
                  <div className="text-center text-gray-500">
                    No transactions yet. <Link to="/add-transaction" className="text-blue-600 hover:text-blue-500">Add your first transaction</Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
