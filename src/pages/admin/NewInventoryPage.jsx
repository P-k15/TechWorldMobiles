import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../../components/common/PhoneImage';

export default function NewInventoryPage() {
  const { newProducts, addNewProduct, updateNewProduct, deleteNewProduct } = useAdmin();
  const { addToast } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state for add/edit modal
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    sku: '',
    category: 'Flagship',
    price: '',
    mrp: '',
    costPrice: '',
    stock: 5,
    storage: '128GB',
    color: 'Midnight',
    description: '',
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      brand: 'Apple',
      sku: `TWM-NEW-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Flagship',
      price: 69999,
      mrp: 74999,
      costPrice: 58000,
      stock: 5,
      storage: '128GB',
      color: 'Black',
      description: 'Brand new in box with 1 year manufacturer warranty.',
    });
    setEditingItem(null);
    setModalMode('add');
  };

  const handleOpenEdit = (product) => {
    setEditingItem(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      sku: product.sku,
      category: product.category || 'Flagship',
      price: product.price,
      mrp: product.mrp || product.price,
      costPrice: product.costPrice || Math.round(product.price * 0.8),
      stock: product.stock,
      storage: product.storage || '128GB',
      color: product.color || 'Standard',
      description: product.description || '',
    });
    setModalMode('edit');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Product name is required', 'error');
      return;
    }

    if (modalMode === 'add') {
      addNewProduct(formData);
      addToast(`Added "${formData.name}" to inventory`, 'success');
    } else if (modalMode === 'edit' && editingItem) {
      updateNewProduct(editingItem.id, {
        ...formData,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        costPrice: Number(formData.costPrice),
        stock: Math.max(0, Number(formData.stock)),
      });
      addToast(`Updated "${formData.name}"`, 'success');
    }
    setModalMode(null);
  };

  const handleDelete = (id) => {
    deleteNewProduct(id);
    setDeleteConfirmId(null);
    addToast('Product removed from catalog', 'info');
  };

  const handleStockAdjust = (id, delta) => {
    const item = newProducts.find((p) => p.id === id);
    if (!item) return;
    const newStock = Math.max(0, (item.stock || 0) + delta);
    updateNewProduct(id, { stock: newStock });
  };

  // Filtered list
  const filtered = newProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || p.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-5">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Brand New Phone Inventory
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Manage product stock, procurement cost (COGS), and consumer selling prices.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold px-3.5 py-2 rounded text-xs transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Smartphone</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-3.5 rounded-lg border border-[#E2E5E8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-[#69727C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by model name or SKU..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#69727C] font-medium">Filter Brand:</span>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs focus:border-[#E85D2A] focus:outline-none"
          >
            <option value="all">All Brands ({newProducts.length})</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Vivo">Vivo</option>
            <option value="OPPO">OPPO</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Smartphone</th>
                <th className="py-3 px-4">SKU / Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Cost Price (COGS)</th>
                <th className="py-3 px-4">Retail Price (INR)</th>
                <th className="py-3 px-4">Stock Units</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((item) => {
                const isOut = item.stock <= 0;
                return (
                  <tr key={item.id} className="hover:bg-[#F5F5F2]/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-[#F5F5F2] overflow-hidden shrink-0 border border-[#E2E5E8]">
                          <PhoneImage
                            src={item.images?.[0]}
                            alt={item.name}
                            fallbackBrand={item.brand}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-[#17212B] block">{item.name}</span>
                          <span className="text-[11px] text-[#69727C]">
                            {item.brand} • {item.storage || '128GB'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[#69727C] text-[11px]">
                      {item.sku}
                    </td>

                    <td className="py-3 px-4 text-[#69727C]">
                      {item.category || 'Flagship'}
                    </td>

                    <td className="py-3 px-4 font-medium text-[#69727C]">
                      {formatINR(item.costPrice)}
                    </td>

                    <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                      {formatINR(item.price)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStockAdjust(item.id, -1)}
                          disabled={item.stock <= 0}
                          className="w-5 h-5 rounded bg-[#F5F5F2] hover:bg-[#E2E5E8] border border-[#E2E5E8] disabled:opacity-40 flex items-center justify-center font-bold text-[#17212B]"
                        >
                          -
                        </button>
                        <span className="font-bold text-[#17212B] w-6 text-center text-xs">
                          {item.stock}
                        </span>
                        <button
                          onClick={() => handleStockAdjust(item.id, 1)}
                          className="w-5 h-5 rounded bg-[#F5F5F2] hover:bg-[#E2E5E8] border border-[#E2E5E8] flex items-center justify-center font-bold text-[#17212B]"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#237A4B]/10 text-[#237A4B] border border-[#237A4B]/20">
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded text-[#69727C] hover:text-[#17212B] hover:bg-[#F5F5F2] transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded text-[#69727C] hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl border border-[#E2E5E8] space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
              <h2 className="text-sm font-bold text-[#17212B] font-heading">
                {modalMode === 'add' ? 'Add New Smartphone' : 'Edit Smartphone Details'}
              </h2>
              <button
                onClick={() => setModalMode(null)}
                className="p-1 rounded text-[#69727C] hover:text-[#17212B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-[#17212B] mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apple iPhone 16"
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Brand</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Vivo">Vivo</option>
                    <option value="OPPO">OPPO</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">SKU / Code</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Cost Price (COGS)</label>
                  <input
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Selling Price (INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Storage</label>
                  <input
                    type="text"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    placeholder="e.g. 128GB"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Color Finish</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g. Black"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[#E2E5E8]">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-2 px-3 rounded border border-[#E2E5E8] hover:bg-[#F5F5F2] text-xs font-semibold text-[#17212B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded bg-[#E85D2A] hover:bg-[#d65120] text-white text-xs font-semibold shadow-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl border border-[#E2E5E8] space-y-3">
            <h3 className="text-sm font-bold text-[#17212B] font-heading">Confirm Catalog Deletion</h3>
            <p className="text-xs text-[#69727C]">
              Are you sure you want to remove this smartphone from the active retail inventory?
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-1.5 rounded border border-[#E2E5E8] text-xs font-semibold text-[#17212B] hover:bg-[#F5F5F2]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
