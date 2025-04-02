





// import { useState, useEffect } from 'react';
// import { Button, Box, Card, Text, Group, Stepper } from '@mantine/core';
// import axios from 'axios';

// export default function SellerTab() {
//   const [orderStatus, setOrderStatus] = useState([]);

//   // Read orders from localStorage on initial render
//   useEffect(() => {
//     const storedOrders = JSON.parse(localStorage.getItem('orderList')) || [];
//     setOrderStatus(storedOrders);
//   }, []);

//   // Map numeric stepper states to order status values
//   const statusMap = ["order-placed", "order-packed", "order-in-transit", "out-for-delivery", "order-delivered"];

//   const updateStatus = async (orderId, statusIndex) => {
//     const updatedOrders = orderStatus.map(order =>
//       order.orderId === orderId ? { ...order, orderStatus: statusMap[statusIndex] } : order
//     );
//     setOrderStatus(updatedOrders);
//     localStorage.setItem('orderList', JSON.stringify(updatedOrders));

//     try {
//       const order = updatedOrders.find(order => order.orderId === orderId);
//       if (order) {
//         const updatedOrderPayload = {
//           phoneNumber:   `+91${order.mobile}`,
//           productName: order.productName,
//           productSize: order.size,
//           productPrice: order.productPrice,
//           discount: order.discount,
//           deliveryCharge: order.deliveryCharge,
//           orderStatus: statusMap[statusIndex],
//           estimatedDeliveryDate: order.estimatedDeliveryDate,
//           paymentMode: order.paymentMode,
//           address: order.address,
//           quantity: order.quantity,
//           category: order.category,
//           deliveryDate: order.deliveryDate || null
//         };

//         await axios.post(
//           "http://192.168.0.101:3001/api/send-order-message",
//           updatedOrderPayload,
//           console.log(updatedOrderPayload)
//         );
//         alert("Order status updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   return (
//     <Box>
//       <h3>Orders</h3>
//       {orderStatus.map((order) => (
//         <Card shadow="sm" padding="lg" key={order.orderId} mb="md">
//           <Text>Buyer: {order.phoneNumber}</Text>
//           <Text>Product: {order.productName}</Text>
//           <Stepper
//             active={statusMap.indexOf(order.orderStatus)} // Convert status to step index
//             onStepClick={(step) => updateStatus(order.orderId, step)}
//             color="teal"
//           >
//             <Stepper.Step label="Order Placed" description="Buyer has placed the order" />
//             <Stepper.Step label="Packed" description="Order has been packed" />
//             <Stepper.Step label="In Transit" description="Order is on the way" />
//             <Stepper.Step label="Out for Delivery" description="Order is out for delivery" />
//             <Stepper.Step label="Delivered" description="Order has been delivered" />
//           </Stepper>
//           <Group position="right" mt="md">
//           {statusMap.indexOf(order.orderStatus) < statusMap.length - 1 && (
//   <Button
//     onClick={() => {
//       const currentIndex = statusMap.indexOf(order.orderStatus);
//       if (currentIndex >= 0 && currentIndex < statusMap.length - 1) {
//         updateStatus(order.orderId, currentIndex + 1);
//       }
//     }}
//   >
//     Next Step
//   </Button>
// )}

//           </Group>
//         </Card>
//       ))}
//     </Box>
//   );
// }




import { useState, useEffect } from 'react';
import { 
  Package, 
  CheckCircle, 
  Truck, 
  ShoppingBag, 
  Home, 
  ChevronRight 
} from 'lucide-react';
import axios from 'axios';

export default function SellerTab() {
  const [orderStatus, setOrderStatus] = useState([]);
  
  // Read orders from localStorage on initial render
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderList')) || [];
    setOrderStatus(storedOrders);
  }, []);
  
  // Map numeric stepper states to order status values
  const statusMap = ["order-placed", "order-packed", "order-in-transit", "out-for-delivery", "order-delivered"];
  
  // Status icons for each step
  const statusIcons = [
    <ShoppingBag size={20} />,
    <Package size={20} />,
    <Truck size={20} />,
    <Truck size={20} />,
    <Home size={20} />
  ];
  
  // Get current step index from order status
  const getStepIndex = (status) => {
    const index = statusMap.indexOf(status);
    return index >= 0 ? index : 0;
  };
  
  const updateStatus = async (orderId, statusIndex) => {
    const updatedOrders = orderStatus.map(order =>
      order.orderId === orderId ? { ...order, orderStatus: statusMap[statusIndex] } : order
    );
    setOrderStatus(updatedOrders);
    localStorage.setItem('orderList', JSON.stringify(updatedOrders));
    
    try {
      const order = updatedOrders.find(order => order.orderId === orderId);
      if (order) {
        const updatedOrderPayload = {
          phoneNumber: `+91${order.mobile}`,
          productName: order.productName,
          productSize: order.size,
          productPrice: order.productPrice,
          discount: order.discount,
          deliveryCharge: order.deliveryCharge,
          orderStatus: statusMap[statusIndex],
          estimatedDeliveryDate: order.estimatedDeliveryDate,
          paymentMode: order.paymentMode,
          address: order.address,
          quantity: order.quantity,
          category: order.category,
          deliveryDate: order.deliveryDate || null
        };
        
        await axios.post(
          "http://192.168.0.109:3001/api/send-order-message",
          updatedOrderPayload
        );
        alert("Order status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>
      
      {orderStatus.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="space-y-6">
          {orderStatus.map((order) => {
            const currentStepIndex = getStepIndex(order.orderStatus);
            
            return (
              <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <div>
                    <h4 className="font-semibold text-lg">{order.productName}</h4>
                    <p className="text-gray-600">Order ID: {order.orderId}</p>
                    <p className="text-gray-600">Buyer: {order.mobile || order.phoneNumber}</p>
                  </div>
                  
                  {currentStepIndex < statusMap.length - 1 && (
                    <button
                      className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center"
                      onClick={() => updateStatus(order.orderId, currentStepIndex + 1)}
                    >
                      Next Step
                      <ChevronRight size={18} className="ml-1" />
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  {/* Stepper track */}
                  <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
                  
                  {/* Stepper steps */}
                  <div className="flex justify-between relative">
                    {statusMap.map((status, index) => {
                      const isActive = index <= currentStepIndex;
                      const isCurrentStep = index === currentStepIndex;
                      
                      return (
                        <div 
                          key={index} 
                          className="flex flex-col items-center cursor-pointer"
                          onClick={() => updateStatus(order.orderId, index)}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 border-2 ${
                            isCurrentStep 
                              ? 'border-teal-600 bg-teal-100 text-teal-600' 
                              : isActive 
                                ? 'border-teal-600 bg-teal-600 text-white' 
                                : 'border-gray-300 bg-gray-100 text-gray-400'
                          }`}>
                            {statusIcons[index]}
                          </div>
                          
                          <div className="mt-2 text-center">
                            <p className={`text-sm font-medium ${isActive ? 'text-teal-600' : 'text-gray-500'}`}>
                              {status === "order-placed" ? "Placed" :
                               status === "order-packed" ? "Packed" :
                               status === "order-in-transit" ? "In Transit" :
                               status === "out-for-delivery" ? "Out for Delivery" :
                               "Delivered"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 hidden md:block">
                              {status === "order-placed" ? "Order received" :
                               status === "order-packed" ? "Ready to ship" :
                               status === "order-in-transit" ? "On the way" :
                               status === "out-for-delivery" ? "Almost there" :
                               "Order complete"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Progress overlay on track */}
                  <div 
                    className="absolute top-6 left-0 h-1 bg-teal-600 rounded-full transition-all duration-300 ease-in-out"
                    style={{ 
                      width: `${currentStepIndex / (statusMap.length - 1) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}