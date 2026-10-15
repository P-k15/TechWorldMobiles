import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, BatteryCharging, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/currency';
import PhoneImage from '../../components/common/PhoneImage';
import { ConditionBadge } from '../../components/common/Badge';

export default function UsedInventoryPage() {
  const { usedProducts, addUsedProduct, updateUsedProduct, deleteUsedProduct } = useAdmin();
  const { addToast } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    sku: '',
    condition: 'Good',
    batteryHealth: '88%',
    price: 35000,
    originalPrice: 69900,
    purchaseCost: 28000,
    storage: '128GB',
    stock: 1,
    isInspected: true,
    inspectionStatus: 'Certified — 42-Point Check Passed',
    warranty: '6 Months TechWorldMobiles Limited Warranty',
    knownDefects: 'Minor cosmetic signs of normal usage.',
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      brand: 'Apple',
      sku: `USED-PH-${Math.floor(100 + Math.random() * 900)}`,
      condition: 'Good',
      batteryHealth: '89%',
      price: 36000,
      originalPrice: 69900,
      purchaseCost: 29000,
      storage: '128GB',
      stock: 1,
      isInspected: true,
      inspectionStatus: 'Certified — 42-Point Check Passed',
      warranty: '6 Months TechWorldMobiles Limited Warranty',
      knownDefects: 'Clean device, screen scratch-free.',
    });
    setEditingItem(null);
    setModalMode('add');
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      brand: item.brand,
      sku: item.sku,
      condition: item.condition || 'Good',
      batteryHealth: item.batteryHealth || '88%',
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      purchaseCost: item.purchaseCost || Math.round(item.price * 0.75),
      storage: item.storage || '128GB',
      stock: item.stock,
      isInspected: Boolean(item.isInspected),
      inspectionStatus: item.inspectionStatus || 'Certified',
      warranty: item.warranty || '6 Months Warranty',
      knownDefects: item.knownDefects || '',
    });
    setModalMode('edit');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Device model is required', 'error');
      return;
    }

    if (modalMode === 'add') {
      addUsedProduct(formData);
      addToast(`Added "${formData.name}" to pre-owned inventory`, 'success');
    } else if (modalMode === 'edit' && editingItem) {
      updateUsedProduct(editingItem.id, {
        ...formData,
        price: Number(formData.price),
        purchaseCost: Number(formData.purchaseCost),
        originalPrice: Number(formData.originalPrice),
        stock: Math.max(0, Number(formData.stock)),
      });
      addToast(`Updated pre-owned device "${formData.name}"`, 'success');
    }
    setModalMode(null);
  };

  const handleDelete = (id) => {
    deleteUsedProduct(id);
    setDeleteConfirmId(null);
    addToast('Pre-owned device removed', 'info');
  };

  const filtered = usedProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCond = conditionFilter === 'all' || p.condition === conditionFilter;
    return matchesSearch && matchesCond;
  });

  return (
    <div className="space-y-5">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] font-heading">
            Second-Hand Phone Inventory
          </h1>
          <p className="text-xs text-[#69727C] mt-0.5">
            Pre-owned devices purchased from customers, refurbished, and certified for resale.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold px-3.5 py-2 rounded text-xs transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Used Device</span>
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
            placeholder="Search pre-owned by model or SKU..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F2] border border-[#E2E5E8] rounded text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#69727C] font-medium">Condition Grade:</span>
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="bg-[#F5F5F2] border border-[#E2E5E8] rounded px-2.5 py-1.5 text-xs focus:border-[#E85D2A] focus:outline-none"
          >
            <option value="all">All Conditions ({usedProducts.length})</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
      </div>

      {/* Used Inventory Table */}
      <div className="bg-white rounded-lg border border-[#E2E5E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E2E5E8] text-[#17212B] uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3 px-4">Device</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Battery</th>
                <th className="py-3 px-4">Purchase Cost (Outflow)</th>
                <th className="py-3 px-4">Resale Price (INR)</th>
                <th className="py-3 px-4">Est. Margin</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E5E8]">
              {filtered.map((item) => {
                const margin = item.purchaseCost ? item.price - item.purchaseCost : null;
                const marginPercent = margin ? Math.round((margin / item.price) * 100) : null;

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

                    <td className="py-3 px-4">
                      <ConditionBadge condition={item.condition} />
                    </td>

                    <td className="py-3 px-4 font-medium text-[#17212B]">
                      {item.batteryHealth ? (
                        <span className="flex items-center gap-1">
                          <BatteryCharging className="w-3.5 h-3.5 text-[#237A4B]" />
                          <span>{item.batteryHealth}</span>
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="py-3 px-4 font-medium text-[#69727C]">
                      {formatINR(item.purchaseCost)}
                    </td>

                    <td className="py-3 px-4 font-bold text-[#17212B] font-heading">
                      {formatINR(item.price)}
                    </td>

                    <td className="py-3 px-4">
                      {margin !== null ? (
                        <span className="text-[#237A4B] font-semibold bg-[#237A4B]/10 px-1.5 py-0.5 rounded text-[11px]">
                          +{formatINR(margin)} ({marginPercent}%)
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {item.stock > 0 ? (
                        <span className="text-[#237A4B] font-semibold">{item.stock} in stock</span>
                      ) : (
                        <span className="text-rose-600 font-semibold">Sold Out</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded text-[#69727C] hover:text-[#17212B] hover:bg-[#F5F5F2] transition"
                          title="Edit Used Device"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded text-[#69727C] hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete Device"
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

      {/* Add / Edit Used Device Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl border border-[#E2E5E8] space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#E2E5E8] pb-3">
              <h2 className="text-sm font-bold text-[#17212B] font-heading">
                {modalMode === 'add' ? 'Add Pre-Owned Device' : 'Edit Pre-Owned Details'}
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
                <label className="block font-medium text-[#17212B] mb-1">Device Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apple iPhone 13"
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
                  <label className="block font-medium text-[#17212B] mb-1">Condition Grade</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Purchase Cost</label>
                  <input
                    type="number"
                    value={formData.purchaseCost}
                    onChange={(e) => setFormData({ ...formData, purchaseCost: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Resale Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#17212B] mb-1">Battery Health</label>
                  <input
                    type="text"
                    value={formData.batteryHealth}
                    onChange={(e) => setFormData({ ...formData, batteryHealth: e.target.value })}
                    placeholder="e.g. 91%"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#17212B] mb-1">Cosmetic Notes & Defects</label>
                <input
                  type="text"
                  value={formData.knownDefects}
                  onChange={(e) => setFormData({ ...formData, knownDefects: e.target.value })}
                  placeholder="e.g. Micro scratch on bezel; screen flawless."
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                />
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
                  Save Pre-Owned Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#17212B]/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl border border-[#E2E5E8] space-y-3">
            <h3 className="text-sm font-bold text-[#17212B] font-heading">Delete Device Listing?</h3>
            <p className="text-xs text-[#69727C]">
              Are you sure you want to remove this second-hand smartphone from stock?
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
