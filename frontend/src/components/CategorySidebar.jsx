import { Link } from 'react-router-dom'
import categories from '../data/categories'

function CategorySidebar() {
  return (
    <aside className="hidden rounded-md border border-slate-200 bg-white p-2 lg:block">
      {categories.map((category, index) => (
        <Link
          className={`block rounded-md px-3 py-2 text-sm ${index === 0 ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
          key={category}
          to={`/products-grid?category=${encodeURIComponent(category)}`}
        >
          {category}
        </Link>
      ))}
    </aside>
  )
}

export default CategorySidebar
