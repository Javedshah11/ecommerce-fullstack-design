import categories from '../data/categories'

const brands = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo']
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-slate-200 py-4">
      <h3 className="mb-3 font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  )
}

function FilterSidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="rounded-md border border-slate-200 bg-white px-4">
        <FilterGroup title="Category">
          <div className="space-y-2 text-sm text-slate-600">
            {categories.slice(0, 6).map((category) => (
              <label className="flex items-center gap-2" key={category}>
                <input className="h-4 w-4 rounded border-slate-300 text-blue-600" type="checkbox" />
                {category}
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Brands">
          <div className="space-y-2 text-sm text-slate-600">
            {brands.map((brand) => (
              <label className="flex items-center gap-2" key={brand}>
                <input className="h-4 w-4 rounded border-slate-300 text-blue-600" type="checkbox" />
                {brand}
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Features">
          <div className="space-y-2 text-sm text-slate-600">
            {features.map((feature) => (
              <label className="flex items-center gap-2" key={feature}>
                <input className="h-4 w-4 rounded border-slate-300 text-blue-600" type="checkbox" />
                {feature}
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Price range">
          <div className="grid grid-cols-2 gap-2">
            <input className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="Min" />
            <input className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="Max" />
          </div>
          <button className="mt-3 w-full rounded-md border border-blue-200 bg-white py-2 text-sm font-semibold text-blue-600" type="button">
            Apply
          </button>
        </FilterGroup>

        <FilterGroup title="Condition">
          <div className="space-y-2 text-sm text-slate-600">
            {['Any', 'Refurbished', 'Brand new', 'Old items'].map((item) => (
              <label className="flex items-center gap-2" key={item}>
                <input name="condition" type="radio" />
                {item}
              </label>
            ))}
          </div>
        </FilterGroup>

        <div className="py-4">
          <h3 className="mb-3 font-semibold text-slate-900">Ratings</h3>
          <div className="space-y-2 text-sm text-slate-600">
            {[5, 4, 3].map((rating) => (
              <label className="flex items-center gap-2" key={rating}>
                <input className="h-4 w-4 rounded border-slate-300 text-blue-600" type="checkbox" />
                <span className="text-orange-400">{'★'.repeat(rating)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
