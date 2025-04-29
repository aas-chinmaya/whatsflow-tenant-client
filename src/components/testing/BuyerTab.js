
// import { useState } from "react";
// import {
//   Button,
//   TextInput,
//   Select,
//   Group,
//   Box,
//   Grid,
//   Card,
//   Text,
//   Modal,
//   Rating,
//   Image,
//   NumberInput,
// } from "@mantine/core";
// import axios from "axios";
// // Sample products with categories, images, and other details
// const products = [
//   {
//     id: 1,
//     name: "Red Dress",
//     category: "Dress",
//     imageUrl:
//       "https://www.libas.in/cdn/shop/files/red-printed-silk-blend-jumpsuit-with-belt-libas-2-27675237220502.jpg?v=1739181667&width=1080",
//     price: 150,
//     discount: 10,
//     sizeOptions: ["S", "M", "L"],
//     description: "Stylish red dress for parties",
//     rating: 4.5,
//     estimatedDeliveryDate: "2025-03-25",
//   },
//   {
//     id: 2,
//     name: "Leather Shoes",
//     category: "Shoes",
//     imageUrl:
//       "https://teakwoodleathers.com/cdn/shop/files/T_SH_CL_103_BR.jpg?v=1719400771",
//     price: 75,
//     discount: 15,
//     sizeOptions: ["38", "40", "42"],
//     description: "Premium leather shoes for men",
//     rating: 4.7,
//     estimatedDeliveryDate: "2025-03-22",
//   },
//   {
//     id: 3,
//     name: "Smartphone",
//     category: "Mobile",
//     imageUrl:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTvEq0snsh4N29MPdJ4Am5BcLzGKD8yFbLiq9Q-D4efFRUZ6jsuzs1Qc_NyKybis7Km6f6Ep27Hl6q1120Z12PT8IRSjNCTvppuInYk1qA",
//     price: 500,
//     discount: 5,
//     sizeOptions: ["64GB", "128GB"],
//     description: "Latest smartphone with amazing features",
//     rating: 4.3,
//     estimatedDeliveryDate: "2025-03-30",
//   },
//   {
//     id: 4,
//     name: "Laptop",
//     category: "Laptop",
//     imageUrl:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTlZnuT1FvuKtQcDQCyiZCLB0rqEZw7GUi_adYFH_TxMJqkki9udaLcSOe9G96J3uHg57ByQ2OOWFpepcq85DrawZC5q4ZnfQpqX8WTh7a0cwNwAwP38S56",
//     price: 1000,
//     discount: 10,
//     sizeOptions: ["13-inch", "15-inch"],
//     description: "High-performance laptop for work and gaming",
//     rating: 4.6,
//     estimatedDeliveryDate: "2025-04-02",
//   },
//   {
//     id: 5,
//     name: "Notebook",
//     category: "Stationary",
//     imageUrl:
//       "https://scholarstationery.com/wp-content/uploads/2022/09/TRIDENT-SUBJECT-NOTEBOOK-WEBSITE-9-900x1200.jpg",
//     price: 10,
//     discount: 20,
//     sizeOptions: ["A4", "A5"],
//     description: "High-quality paper notebook for notes",
//     rating: 4.0,
//     estimatedDeliveryDate: "2025-03-20",
//   },
//   {
//     id: 6,
//     name: "Best Book",
//     category: "Book",
//     imageUrl: "https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY466_.jpg",
//     price: 25,
//     discount: 10,
//     sizeOptions: ["Paperback", "Hardcover"],
//     description: "A best-seller book for readers",
//     rating: 4.8,
//     estimatedDeliveryDate: "2025-03-18",
//   },
// ];

// export default function BuyerTab() {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [orderDetails, setOrderDetails] = useState({
//     orderId: "", // New field to store the order ID
//     mobile: "6370073215",
//     address: "Bbsr,odisha",
//     size: "",
//     productName: "",
//     productPrice: 0,
//     quantity: 1,
//     discount: 0,
//     deliveryCharge: 10, // Static delivery charge
//     orderStatus: "Pending",
//     estimatedDeliveryDate: "",
//     paymentMode: "Cash on Delivery",
//     deliveryDate: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // To store separate quantities for each product
//   const [quantities, setQuantities] = useState(
//     products.reduce((acc, product) => {
//       acc[product.id] = 1;
//       return acc;
//     }, {})
//   );



// const generateOrderId = (productName, mobile) => {
//   // Get the first 3 letters of the product name
//   const productPrefix = productName.slice(0, 3).toUpperCase();
  
//   // Get the first 3 digits of the mobile number
//   const mobilePrefix = mobile.slice(0, 3);
  
//   // Get the current date and time with seconds and milliseconds
//   const currentDate = new Date();
//   const datePrefix = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format: YYYYMMDD
//   const timePrefix = `${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`;

//   // Combine them to generate the order ID
//   return `${productPrefix}${mobilePrefix}${datePrefix}${timePrefix}`;
// };
  
//   // const handlePlaceOrder = () => {
//   //   const orderId = generateOrderId(selectedProduct.name, orderDetails.mobile);

//   //   const order = {
//   //     ...orderDetails,
//   //     orderId, // Add orderId to the order details
//   //     productName: selectedProduct.name,
//   //     productPrice: selectedProduct.price * quantities[selectedProduct.id],
//   //     discount: selectedProduct.discount,
//   //     estimatedDeliveryDate: selectedProduct.estimatedDeliveryDate,
//   //     deliveryDate: new Date().toLocaleDateString(),
//   //   };

//   //   // Store the order in localStorage
//   //   const storedOrders = JSON.parse(localStorage.getItem("orderList")) || [];
//   //   storedOrders.push(order);
//   //   localStorage.setItem("orderList", JSON.stringify(storedOrders));

//   //   alert("Order placed successfully!");
//   //   setIsModalOpen(false); // Close the modal after placing the order
//   // };

//   const handlePlaceOrder = async () => {
//     const orderId = generateOrderId(selectedProduct.name, orderDetails.mobile);
  
//     const orderPayload = {
//       phoneNumber: `+91${orderDetails.mobile}`,
//       productName: selectedProduct.name,
//       productSize: orderDetails.size,
//       productPrice: `${selectedProduct.price * quantities[selectedProduct.id]}`,
//       discount: `${selectedProduct.discount}`,
//       deliveryCharge: `${orderDetails.deliveryCharge}`,
//       orderStatus: "order-placed",
//       estimatedDeliveryDate: selectedProduct.estimatedDeliveryDate,
//       paymentMode: orderDetails.paymentMode,
//       address: orderDetails.address,
//       quantity: quantities[selectedProduct.id],
//       category: selectedProduct.category,
//     };
  
//     try {
//       const response = await axios.post(
//         "http://192.168.0.101:3001/api/send-order-message",
//         orderPayload
//       );
  
//       console.log("Order response:", response.data);
//       alert("Order placed successfully!");
  
//       // Store order locally
//       const storedOrders = JSON.parse(localStorage.getItem("orderList")) || [];
//       storedOrders.push({
//         ...orderDetails,
//         orderId,
//         productName: selectedProduct.name,
//         productPrice: selectedProduct.price * quantities[selectedProduct.id],
//         discount: selectedProduct.discount,
//         estimatedDeliveryDate: selectedProduct.estimatedDeliveryDate,
//         category: selectedProduct.category,
//         deliveryDate: new Date().toLocaleDateString(),

//       });
//       localStorage.setItem("orderList", JSON.stringify(storedOrders));
  
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };
//   return (
//     <Box>
//       <Grid gutter="lg" columns={12}>
//         {products.map((product) => (
//           <Grid.Col span={4} sm={6} md={4} lg={3} key={product.id}>
//             <Card
//               shadow="sm"
//               padding="lg"
//               style={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 <Image
//                   src={product.imageUrl}
//                   alt={product.name}
//                   style={{
//                     height: "500px", // Fixed height for the image
//                     width: "100%", // Ensure the image spans the width of the card
//                     objectFit: "cover", // Ensure the image covers the space without distortion
//                     borderRadius: "8px",
//                   }}
//                 />
//               </div>
//               <Text mt="sm" weight={500} style={{ flexShrink: 0 }}>
//                 {product.name}
//               </Text>
//               <Text size="sm" color="gray" style={{ flexShrink: 0 }}>
//                 {product.category}
//               </Text>
//               <Rating value={product.rating} readOnly />
//               <Text size="sm" mt="xs" style={{ flexShrink: 0 }}>
//                 {product.description}
//               </Text>
//               <Text size="lg" weight={500} style={{ flexShrink: 0 }}>
//                 ${product.price}
//               </Text>
//               <Text size="sm" color="green" style={{ flexShrink: 0 }}>
//                 {product.discount}% OFF
//               </Text>
//               <NumberInput
//                 label="Quantity"
//                 min={1}
//                 value={quantities[product.id]}
//                 onChange={(value) =>
//                   setQuantities({ ...quantities, [product.id]: value })
//                 }
//                 style={{ marginTop: "10px" }}
//               />
//               <Button
//                 fullWidth
//                 mt="md"
//                 onClick={() => {
//                   setSelectedProduct(product);
//                   setIsModalOpen(true);
//                 }}
//               >
//                 Select
//               </Button>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>

//       {/* Modal for placing an order */}
//       <Modal
//         opened={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={`Place Order for ${selectedProduct?.name}`}
//       >
//         {selectedProduct && (
//           <Box>
//             <TextInput
//               label="Mobile Number"
//               placeholder="Enter your mobile number"
//               value={orderDetails.mobile}
//               onChange={(e) =>
//                 setOrderDetails({ ...orderDetails, mobile: e.target.value })
//               }
//             />
//             <TextInput
//               label="Address"
//               placeholder="Enter your address"
//               value={orderDetails.address}
//               onChange={(e) =>
//                 setOrderDetails({ ...orderDetails, address: e.target.value })
//               }
//             />
//             <Select
//               label="Size"
//               placeholder="Select size"
//               data={selectedProduct.sizeOptions}
//               value={orderDetails.size}
//               onChange={(value) =>
//                 setOrderDetails({ ...orderDetails, size: value })
//               }
//             />
//             <Select
//               label="Payment Mode"
//               placeholder="Select payment mode"
//               data={["Cash on Delivery", "Credit/Debit Card", "UPI"]}
//               value={orderDetails.paymentMode}
//               onChange={(value) =>
//                 setOrderDetails({ ...orderDetails, paymentMode: value })
//               }
//             />
//             <Text size="md" mt="md">
//               <strong>Order Summary:</strong>
//             </Text>
//             <Text>Product: {selectedProduct.name}</Text>
//             <Text>Quantity: {quantities[selectedProduct.id]}</Text>
//             <Text>
//               Price: ${selectedProduct.price * quantities[selectedProduct.id]}
//             </Text>
//             <Text>Discount: {selectedProduct.discount}%</Text>
//             <Text>
//               Estimated Delivery: {selectedProduct.estimatedDeliveryDate}
//             </Text>
//             <Group position="right" mt="md">
//               <Button onClick={handlePlaceOrder}>Place Order</Button>
//             </Group>
//           </Box>
//         )}
//       </Modal>
//     </Box>
//   );
// }
import { useState } from "react";
import { Phone, MapPin, Package, CreditCard, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import axios from "axios";

// Sample products with categories, images, and other details
const products = [
  {
    id: 1,
    name: "Red Dress",
    category: "Dress",
    imageUrl: "https://images.meesho.com/images/products/284218772/exmqu_512.webp",
    price: 150,
    discount: 10,
    sizeOptions: ["S", "M", "L"],
    description: "Stylish red dress for parties",
    rating: 4.5,
    estimatedDeliveryDate: "2025-03-25",
  },
  {
    id: 2,
    name: "Leather Shoes",
    category: "Shoes",
    imageUrl: "https://banjaaran.in/cdn/shop/files/06724_Banjaaran-07_04.jpg?v=1720687080&width=823",
    price: 75,
    discount: 15,
    sizeOptions: ["38", "40", "42"],
    description: "Premium leather shoes for men",
    rating: 4.7,
    estimatedDeliveryDate: "2025-03-22",
  },
  {
    id: 3,
    name: "Smartphone",
    category: "Mobile",
    imageUrl: "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-a55/buy/A55_720X720_1.jpg?imwidth=480",
    price: 500,
    discount: 5,
    sizeOptions: ["64GB", "128GB"],
    description: "Latest smartphone with amazing features",
    rating: 4.3,
    estimatedDeliveryDate: "2025-03-30",
  },
  {
    id: 4,
    name: "Laptop",
    category: "Laptop",
    imageUrl: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c08192495_33.png",
    price: 1000,
    discount: 10,
    sizeOptions: ["13-inch", "15-inch"],
    description: "High-performance laptop for work and gaming",
    rating: 4.6,
    estimatedDeliveryDate: "2025-04-02",
  }

];

export default function BuyerTab() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    mobile: "6370073215",
    address: "Bbsr,odisha",
    size: "",
    productName: "",
    productPrice: 0,
    quantity: 1,
    discount: 0,
    deliveryCharge: 10,
    orderStatus: "Pending",
    estimatedDeliveryDate: "",
    paymentMode: "Cash on Delivery",
    deliveryDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // To store separate quantities for each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const generateOrderId = (productName, mobile) => {
    // Get the first 3 letters of the product name
    const productPrefix = productName.slice(0, 3).toUpperCase();
    
    // Get the first 3 digits of the mobile number
    const mobilePrefix = mobile.slice(0, 3);
    
    // Get the current date and time with seconds and milliseconds
    const currentDate = new Date();
    const datePrefix = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format: YYYYMMDD
    const timePrefix = `${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`;

    // Combine them to generate the order ID
    return `${productPrefix}${mobilePrefix}${datePrefix}${timePrefix}`;
  };
  
  const handlePlaceOrder = async () => {
    const orderId = generateOrderId(selectedProduct.name, orderDetails.mobile);
  
    const orderPayload = {
      phoneNumber: `+91${orderDetails.mobile}`,
      productName: selectedProduct.name,
      productSize: orderDetails.size,
      productPrice: `${selectedProduct.price * quantities[selectedProduct.id]}`,
      discount: `${selectedProduct.discount}`,
      deliveryCharge: `${orderDetails.deliveryCharge}`,
      orderStatus: "order-placed",
      estimatedDeliveryDate: selectedProduct.estimatedDeliveryDate,
      paymentMode: orderDetails.paymentMode,
      address: orderDetails.address,
      quantity: quantities[selectedProduct.id],
      category: selectedProduct.category,
    };
  
    try {
      const response = await axios.post(
        "http://192.168.0.123:8000/api/send-order-message",
        orderPayload
      );
  
      console.log("Order response:", response.data);
      alert("Order placed successfully!");
  
      // Store order locally
      const storedOrders = JSON.parse(localStorage.getItem("orderList")) || [];
      storedOrders.push({
        ...orderDetails,
        orderId,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price * quantities[selectedProduct.id],
        discount: selectedProduct.discount,
        estimatedDeliveryDate: selectedProduct.estimatedDeliveryDate,
        category: selectedProduct.category,
        deliveryDate: new Date().toLocaleDateString(),
        mobile: orderDetails.mobile,
      });
      localStorage.setItem("orderList", JSON.stringify(storedOrders));
  
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // Function to render stars for product rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center space-x-1">
        {stars}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-64">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              {renderRating(product.rating)}
              <p className="text-sm text-gray-600 mt-2 mb-2">{product.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-green-600 font-medium">{product.discount}% OFF</span>
              </div>
              
              <div className="mt-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-l-md"
                    onClick={() => quantities[product.id] > 1 && setQuantities({ 
                      ...quantities, 
                      [product.id]: quantities[product.id] - 1 
                    })}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1">{quantities[product.id]}</span>
                  <button 
                    className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-r-md"
                    onClick={() => setQuantities({ 
                      ...quantities, 
                      [product.id]: quantities[product.id] + 1 
                    })}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <button
                className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <ShoppingCart size={18} className="mr-2" />
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for placing an order */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">Place Order for {selectedProduct.name}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <span className="pl-3 text-gray-500"><Phone size={18} /></span>
                  <input
                    type="text"
                    className="block w-full py-2 pl-2 pr-3 border-0 outline-none focus:ring-0"
                    placeholder="Enter your mobile number"
                    value={orderDetails.mobile}
                    onChange={(e) => setOrderDetails({ ...orderDetails, mobile: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <span className="pl-3 text-gray-500"><MapPin size={18} /></span>
                  <input
                    type="text"
                    className="block w-full py-2 pl-2 pr-3 border-0 outline-none focus:ring-0"
                    placeholder="Enter your address"
                    value={orderDetails.address}
                    onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <div className="relative border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <div className="flex items-center">
                    <span className="pl-3 text-gray-500"><Package size={18} /></span>
                    <select
                      className="block w-full py-2 pl-2 pr-10 border-0 outline-none focus:ring-0 bg-transparent"
                      value={orderDetails.size}
                      onChange={(e) => setOrderDetails({ ...orderDetails, size: e.target.value })}
                    >
                      <option value="">Select size</option>
                      {selectedProduct.sizeOptions.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                <div className="relative border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <div className="flex items-center">
                    <span className="pl-3 text-gray-500"><CreditCard size={18} /></span>
                    <select
                      className="block w-full py-2 pl-2 pr-10 border-0 outline-none focus:ring-0 bg-transparent"
                      value={orderDetails.paymentMode}
                      onChange={(e) => setOrderDetails({ ...orderDetails, paymentMode: e.target.value })}
                    >
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="Credit/Debit Card">Credit/Debit Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Order Summary:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product:</span>
                    <span>{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span>{quantities[selectedProduct.id]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span>${selectedProduct.price * quantities[selectedProduct.id]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span>{selectedProduct.discount}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span>{selectedProduct.estimatedDeliveryDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}