
export default function Categories({ categories }) {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center space-y-2 flex-shrink-0"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}