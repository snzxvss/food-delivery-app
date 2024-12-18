export default function Card({ product }) {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="inline-block px-2 py-1 bg-[#FF4500] text-white text-sm rounded-md mb-2">
          {product.discount}
        </div>
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#FF4500] font-bold">
              ${product.discountedPrice.toLocaleString()}
            </p>
            <p className="text-gray-400 text-sm line-through">
              ${product.originalPrice.toLocaleString()}
            </p>
          </div>
          <button className="w-8 h-8 bg-[#FF4500] text-white rounded-full flex items-center justify-center">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
