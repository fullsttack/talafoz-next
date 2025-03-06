export default function BannerDiscount() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-lg shadow-lg my-6 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 transform rotate-45 bg-yellow-400 opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-16 w-16 rounded-full bg-blue-400 opacity-30"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between z-10 relative">
        {/* Discount message */}
        <div className="mb-4 md:mb-0 md:mr-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">تخفیف ویژه دوره‌های پرطرفدار!</h2>
          <p className="text-white text-opacity-90">تا ۷۰٪ تخفیف فقط به مدت محدود</p>
          <div className="flex gap-2 mt-3">
            <span className="bg-white text-indigo-700 text-sm px-2 py-1 rounded font-medium">۵ روز</span>
            <span className="bg-white text-indigo-700 text-sm px-2 py-1 rounded font-medium">۱۲ ساعت</span>
            <span className="bg-white text-indigo-700 text-sm px-2 py-1 rounded font-medium">۴۸ دقیقه</span>
            <span className="text-white/80">:زمان باقیمانده</span>
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex flex-col items-center">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full transform transition hover:scale-105 shadow-lg">
            مشاهده دوره‌ها
          </button>
          <p className="text-xs mt-2 text-white text-opacity-80">* تخفیف شامل تمام دوره‌ها می‌شود</p>
        </div>
      </div>
    </div>
  );
}