import React, { useState } from 'react';
import {
    LayoutDashboard,
    Bus,
    Mail,
    Clock,
    ShieldCheck,
    Users,
    Ticket,
    DollarSign,
    TrendingUp,
    Calendar,
    Settings,
    LogOut,
    Search,
    Filter,
    MoreVertical,
    Eye,
    User,
    Edit,
    Trash2,
    UserCircle
} from 'lucide-react';
import { useSignOutMutation } from '../app/userSlice/userApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [signOut, { isError, isLoading, isSuccess }] = useSignOutMutation();
    const navigate = useNavigate();
    const { role, user } = useSelector(state => state.user);
    console.log()
    const email = 'arpon@gmail.com'

    const stats = [
        {
            title: 'Total Bookings',
            value: '1,234',
            change: '+12%',
            icon: <Ticket className="w-8 h-8" />,
            color: 'blue'
        },
        {
            title: 'Revenue',
            value: '$45,678',
            change: '+8%',
            icon: <DollarSign className="w-8 h-8" />,
            color: 'green'
        },
        {
            title: 'Active Buses',
            value: '48',
            change: '+2',
            icon: <Bus className="w-8 h-8" />,
            color: 'purple'
        },
        {
            title: 'Total Users',
            value: '3,456',
            change: '+15%',
            icon: <Users className="w-8 h-8" />,
            color: 'orange'
        }
    ];

    const recentBookings = [
        { id: 'BKG001', customer: 'John Doe', route: 'NY - Boston', seats: '12, 13', amount: '$90', status: 'Confirmed' },
        { id: 'BKG002', customer: 'Jane Smith', route: 'LA - SF', seats: '5', amount: '$55', status: 'Pending' },
        { id: 'BKG003', customer: 'Mike Johnson', route: 'Chicago - Detroit', seats: '20, 21', amount: '$70', status: 'Confirmed' },
        { id: 'BKG004', customer: 'Sarah Williams', route: 'NY - Boston', seats: '8', amount: '$45', status: 'Cancelled' }
    ];

    const buses = [
        { id: 'BUS001', name: 'Express Deluxe', type: 'AC Sleeper', capacity: 40, status: 'Active', driver: 'Robert Brown' },
        { id: 'BUS002', name: 'Swift Cruiser', type: 'AC Seater', capacity: 45, status: 'Active', driver: 'David Wilson' },
        { id: 'BUS003', name: 'Comfort Plus', type: 'Non-AC', capacity: 50, status: 'Maintenance', driver: 'James Taylor' }
    ];

    const handleSignout = async () => {
        try {
            const response = signOut().unwrap();
            toast.promise(response, {
                pending: "Sign In...",
                success: {
                    render({ data }) {
                        return data?.message || 'Successfully SignIn.'
                    }
                },
                error: {
                    render({ data }) {
                        return data?.message || "Failed To SignIn."
                    }
                }
            });
            await response;
            navigate('/');
        } catch (error) {
            console.log(error)
        }

    }

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'bookings', name: 'Bookings', icon: <Ticket size={20} /> },
        { id: 'buses', name: 'Buses', icon: <Bus size={20} /> },
        { id: 'users', name: 'Users', icon: <Users size={20} /> },
        { id: 'settings', name: 'Settings', icon: <Settings size={20} /> }
    ];

    const userMenuItems = [
        { id: 'profile', name: 'Profile', icon: <UserCircle size={20} /> },
        { id: 'bookings', name: 'Bookings', icon: <Ticket size={20} /> },
        { id: 'settings', name: 'Settings', icon: <Settings size={20} /> }

    ];

    const userProfile = {
        name: email?.split('@')[0] || "Guest User",
        email: email || "user@example.com",
        phone: "+1 234 567 890",
        memberSince: "January 2024",
        totalTrips: 12,
        loyaltyPoints: 450
    };

    const userBookings = [
        { id: 'TKT-7721', date: '2024-05-15', route: 'NY -> Boston', status: 'Upcoming', price: '$45' },
        { id: 'TKT-6540', date: '2024-04-10', route: 'Philly -> DC', status: 'Completed', price: '$32' },
    ];

    return (
        <div className="bg-gray-50 w-full">
            <div className="sm:grid grid-cols-[256px_auto]">
                {/* Sidebar */}
                <aside className="sm:w-64 bg-gray-900 text-white h-auto sm-min-h-full sm:static fixed sm:top-0 bottom-0 w-full ">
                    <div className="sm:flex hidden items-center justify-center mb-4 py-2">
                        <Bus size={32} className="text-blue-400 shrink-0" />
                        {
                            role === 'admin' ? <span className="text-xl shrink-0 font-bold">Admin Panel</span> :
                                <span className="text-xl shrink-0 font-bold">Profile</span>
                        }
                    </div>

                    <nav className="flex justify-between sm:block">
                        {role === 'admin' ? menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center sm:justify-start sm:px-4 justify-center space-x-3 min-h-11 min-w-11 rounded-lg transition ${activeTab === item.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                            >
                                {item.icon}
                                <span className='sm:block hidden'>{item.name}</span>
                            </button>
                        )) : userMenuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center sm:justify-start sm:px-4 justify-center space-x-3 min-h-11 min-w-11 rounded-lg transition ${activeTab === item.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                            >
                                {item.icon}
                                <span className='sm:block hidden'>{item.name}</span>
                            </button>
                        ))}
                        <button onClick={handleSignout} className="w-full flex items-center sm:justify-start sm:px-4 justify-center space-x-3 min-h-11 min-w-11 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition">
                            <LogOut size={20} />
                            <span className='sm:block hidden'>Sign Out</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="sm:p-8 p-4 flex flex-col min-w-0">
                    {
                        role === 'admin' ?
                            <>
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative flex-1 min-w-0">
                                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                            <input autoComplete='on'
                                                type="text"
                                                placeholder="Search..."
                                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <button className="bg-blue-600 text-white px-4 flex-shrink-0 py-2 rounded-lg hover:bg-blue-700 transition">
                                            <Filter size={20} className="inline mr-2" />
                                            Filter
                                        </button>
                                    </div>
                                </div>

                                {activeTab === 'dashboard' && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                            {stats.map((stat, index) => (
                                                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                                                            <div className={`text-${stat.color}-600`}>
                                                                {stat.icon}
                                                            </div>
                                                        </div>
                                                        <span className="text-green-600 text-sm font-semibold flex items-center">
                                                            <TrendingUp size={16} className="mr-1" />
                                                            {stat.change}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                                                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                            <div className="bg-white rounded-lg shadow-md p-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                                                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                                                    <p className="text-gray-500">Chart would be integrated here</p>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg shadow-md p-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Trends</h3>
                                                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                                                    <p className="text-gray-500">Chart would be integrated here</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {recentBookings.map((booking) => (
                                                            <tr key={booking.id} className="hover:bg-gray-50">
                                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">{booking.customer}</td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">{booking.route}</td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">{booking.seats}</td>
                                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                                                                <td className="px-6 py-4 text-sm">
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-red-100 text-red-800'
                                                                        }`}>
                                                                        {booking.status}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-sm">
                                                                    <button className="text-gray-600 hover:text-blue-600">
                                                                        <MoreVertical size={20} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'buses' && (
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800">Bus Fleet Management</h3>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition sm:shrink-0 ">
                                                Add New Bus
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {buses.map((bus) => (
                                                <div key={bus.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <Bus className="text-blue-600" size={32} />
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {bus.status}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{bus.name}</h4>
                                                    <div className="space-y-2 mb-4">
                                                        <p className="text-sm text-gray-600"><strong>ID:</strong> {bus.id}</p>
                                                        <p className="text-sm text-gray-600"><strong>Type:</strong> {bus.type}</p>
                                                        <p className="text-sm text-gray-600"><strong>Capacity:</strong> {bus.capacity} seats</p>
                                                        <p className="text-sm text-gray-600"><strong>Driver:</strong> {bus.driver}</p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200 transition text-sm">
                                                            <Eye size={16} className="inline mr-1" />
                                                            View
                                                        </button>
                                                        <button className="flex-1 bg-green-100 text-green-600 py-2 rounded hover:bg-green-200 transition text-sm">
                                                            <Edit size={16} className="inline mr-1" />
                                                            Edit
                                                        </button>
                                                        <button className="bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'bookings' && (
                                    <div className="bg-white rounded-lg shadow-md p-6 w-full">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-6">All Bookings</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {recentBookings.map((booking) => (
                                                        <tr key={booking.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.customer}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.route}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.seats}</td>
                                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                                                            <td className="px-6 py-4 text-sm">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {booking.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm flex space-x-2">
                                                                <button className="text-blue-600 hover:text-blue-800">
                                                                    <Eye size={18} />
                                                                </button>
                                                                <button className="text-green-600 hover:text-green-800">
                                                                    <Edit size={18} />
                                                                </button>
                                                                <button className="text-red-600 hover:text-red-800">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                            :
                            <div className="w-full min-w-0 mx-auto space-y-6">

                                {/* Header Section */}
                                <div className="flex justify-between min-w-0 items-end border-b pb-6">
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-gray-900">My Profile</h1>
                                        <p className="text-gray-500">Welcome back, {userProfile.name}!</p>
                                    </div>
                                    <div className="hidden sm:flex space-x-3">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold">Loyalty Points</p>
                                            <p className="text-xl font-bold text-blue-600">{userProfile.loyaltyPoints}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* User Info Card */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                <User size={32} />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-lg">{userProfile.name}</h2>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Verified {role}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4">
                                            <div className="flex items-center text-gray-600">
                                                <Mail size={18} className="mr-3 text-gray-400" />
                                                <span className="text-sm">{userProfile.email}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock size={18} className="mr-3 text-gray-400" />
                                                <span className="text-sm">Joined {userProfile.memberSince}</span>
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                                            Edit Profile
                                        </button>
                                    </div>

                                    {/* User Stats / Quick Actions */}
                                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-600 rounded-2xl p-6 text-white flex flex-col justify-between">
                                            <Ticket size={28} className="opacity-80" />
                                            <div>
                                                <p className="text-4xl font-bold">{userProfile.totalTrips}</p>
                                                <p className="opacity-80">Total Trips Taken</p>
                                            </div>
                                        </div>
                                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                                            <ShieldCheck size={28} className="text-green-500" />
                                            <div>
                                                <p className="text-lg font-bold text-gray-800 italic">"Safe Traveler"</p>
                                                <p className="text-sm text-gray-500">Account Security Status: High</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Personal Bookings */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                                        <h3 className="font-bold text-gray-800">My Recent Bookings</h3>
                                        <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Ticket ID</th>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Route</th>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {userBookings.map((b) => (
                                                    <tr key={b.id} className="hover:bg-gray-50 transition">
                                                        <td className="px-6 py-4 text-sm font-mono font-medium text-gray-900">{b.id}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">{b.route}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">{b.date}</td>
                                                        <td className="px-6 py-4 text-sm">
                                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${b.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                {b.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-right font-bold text-gray-900">{b.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    }
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;