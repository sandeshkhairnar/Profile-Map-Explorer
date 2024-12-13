import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    UserGroupIcon,
    CogIcon,
    MapIcon,
    UserIcon
} from '@heroicons/react/24/solid';

const Sidebar = () => {
    const location = useLocation();

    const sidebarLinks = [
        {
            name: 'Dashboard',
            path: '/',
            icon: <HomeIcon className="h-5 w-5" />
        },
        {
            name: 'Profiles',
            path: '/profiles',
            icon: <UserGroupIcon className="h-5 w-5" />
        },
    
        {
            name: 'Admin',
            path: '/admin',
            icon: <CogIcon className="h-5 w-5" />
        }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sticky top-0 h-screen flex flex-col w-64 bg-white shadow-lg border-r">
            <div className="flex items-center justify-center h-16 border-b">
                <Link to="/" className="flex items-center text-xl font-bold text-primary">
                    <MapIcon className="h-8 w-8 mr-2" />
                    Profile Map Explorer
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`
                                flex items-center p-3 rounded-lg transition-colors duration-200
                                ${isActive(link.path)
                                    ? 'bg-primary text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }
                            `}
                        >
                            {React.cloneElement(link.icon, {
                                className: `h-5 w-5 mr-3 ${isActive(link.path) ? 'text-white' : 'text-gray-400'}`
                            })}
                            {link.name}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t">
                <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                    <UserIcon className="h-8 w-8 text-gray-500 mr-3" />
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800">Admin User</h4>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
