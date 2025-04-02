
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, ChevronLeft,
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingCart, 
  Key, 
  Settings, 
  Bell, 
  Zap, 
  LifeBuoy, 
  Megaphone, 
  TabletSmartphone,
  
   
  MessageCircle, 
  Edit, 
  
  
  
  

  Code, 
  UserCheck 
} from 'lucide-react';

// Sidebar menu items
const menuItems = [
 

  // for tenats

  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Bell, label: 'Notifications & Alerts', href: '/notifications' },
  { icon: MessageCircle, label: 'Message Templates', href: '/templates' },
  { icon: Zap, label: 'Campaigns', href: '/campaigns' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: Users, label: 'Agent Management', href: '/agents' },
  { icon: ShoppingCart, label: 'Billing & Subscription', href: '/subscription' },
  { icon: Code, label: 'API Integration', href: '/integration' },
  { icon: Settings, label: 'Settings & Profile', href: '/settings' },
  { icon: Settings, label: 'Test', href: '/test' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
   

<div
  className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen shadow-xl transition-all duration-300 ${
    collapsed ? 'w-16' : 'w-64'
  }`}
>
  <div className="flex items-center justify-between p-4 border-b border-gray-700">
    {!collapsed && <h1 className="text-xl font-bold text-teal-400">Business/Agency</h1>}
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-700 transition"
    >
      {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </button>
  </div>

  <nav className="p-2">
    {menuItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center px-3 py-2 my-1 rounded-lg transition-all duration-300 ${
            isActive
              ? 'bg-teal-500/20 dark:hover:bg-teal-400/20 text-teal-400 border-l-4 border-teal-500'
              : 'hover:bg-teal-500/20 dark:hover:bg-teal-400/20 hover:text-teal-400'
          }`}
        >
          <Icon size={20} className="text-gray-300 group-hover:text-white transition" />
          {!collapsed && <span className="ml-3">{item.label}</span>}
        </Link>
      );
    })}
  </nav>
</div>

  );
}
