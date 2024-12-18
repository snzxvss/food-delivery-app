
import Card from './Card';

export default function ProductList({ products }) {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">Come hasta por $22,500</h2>
        <p className="text-gray-500 mb-4">Platillos en súper precio</p>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <Card key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}