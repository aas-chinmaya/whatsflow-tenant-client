// 'use client'
// import DashboardLayout from '@/components/layout/DashboardLayout'
// // components/Tabs.js
// import { Tabs } from '@mantine/core';  // Import Tabs only
// import { Tab } from '@mantine/core';  // Remove this import
// import BuyerTab from '@/components/testing/BuyerTab';
// import SellerTab from '@/components/testing/SellerTab';
// import React from 'react';

// const page = () => {
//   return (
   
//       <Tabs defaultValue="buyer">
//         <Tabs.List>
//           <Tabs.Tab value="buyer">Buyer</Tabs.Tab> {/* Use Tabs.Tab */}
//           <Tabs.Tab value="seller">Seller</Tabs.Tab> {/* Use Tabs.Tab */}
//         </Tabs.List>

//         <Tabs.Panel value="buyer">
//           <BuyerTab />
//         </Tabs.Panel>

//         <Tabs.Panel value="seller">
//           <SellerTab />
//         </Tabs.Panel>
//       </Tabs>
    
//   )
// }

// export default page;
'use client'
import { useState } from 'react';

import BuyerTab from '@/components/testing/BuyerTab';
import SellerTab from '@/components/testing/SellerTab';

const Page = () => {
  const [activeTab, setActiveTab] = useState('buyer');

  return (
    <div className="w-full  mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('buyer')}
          className={`py-2 px-6 text-sm font-semibold rounded-t-lg transition-all ${
            activeTab === 'buyer' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Buyer
        </button>
        <button
          onClick={() => setActiveTab('seller')}
          className={`py-2 px-6 text-sm font-semibold rounded-t-lg transition-all ${
            activeTab === 'seller' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Seller
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4 bg-gray-800 rounded-b-lg">
        {activeTab === 'buyer' && <BuyerTab />}
        {activeTab === 'seller' && <SellerTab />}
      </div>
    </div>
  );
};

export default Page;
