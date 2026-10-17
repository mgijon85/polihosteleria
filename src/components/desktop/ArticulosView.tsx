import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, Product } from '../../types';
import { formatMoney } from '../../utils/formatters';
import { 
  Package, 
  Search, 
  Plus, 
  ChevronRight, 
  Layers, 
  Warehouse,
  CheckCircle2
} from 'lucide-react';
import { FichaArticuloModal } from './FichaArticuloModal';

export const ArticulosView: React.FC = () => {
  const { products, selectedProductId, setSelectedProductId, role } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: { key: string; label: string }[] = [
    { key: 'todos', label: 'Todas las familias' },
    { key: 'celulosa', label: 'Celulosa' },
    { key: 'limpieza', label: 'Limpieza e higiene' },
    { key: 'cristaleria', label: 'Cristalería' },
    { key: 'menaje', label: 'Menaje y vajilla' },
    { key: 'cuberteria', label: 'Cubertería' },
    { key: 'desechables', label: 'Desechables' },
    { key: 'maquinaria', label: 'Maquinaria' },
    { key: 'uniformes', label: 'Uniformes' },
    { key: 'terraza', label: 'Mobiliario terraza' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'todos' && p.category !== selectedCategory) return false;
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesSku = p.sku.toLowerCase().includes(term);
        if (!matchesName && !matchesSku) return false;
      }
      return true;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-bold text-[var(--text)]">
              Catálogo de Artículos
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-brand-soft text-brand tabular-nums">
              {products.length} artículos
            </span>
          </div>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            9 familias con formatos profesionales para hostelería de Huelva
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSelectedProductId(products[0].id)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-control bg-brand text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo artículo</span>
        </button>
      </div>

      {/* Filter Chips & Search */}
      <div className="bg-[var(--surface)] p-4 rounded-card border border-[var(--line)] shadow-resting space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Categories scrollable chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-brand text-white font-semibold'
                    : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-control border border-[var(--line)] bg-[var(--surface-2)] text-[13px] text-[var(--text)] placeholder-[var(--muted)] focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Ref / SKU</th>
                <th className="py-3 px-4">Artículo</th>
                <th className="py-3 px-4">Familia</th>
                <th className="py-3 px-4">Formato venta</th>
                <th className="py-3 px-4 text-right">Precio Tarifa</th>
                {role === 'direccion' && (
                  <th className="py-3 px-4 text-right text-brand">Coste (Dir.)</th>
                )}
                <th className="py-3 px-4 text-center">Disponible</th>
                <th className="py-3 px-4 text-center">Ubicación</th>
                <th className="py-3 px-4 text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredProducts.slice(0, 100).map((prod) => (
                <tr
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className="hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold tabular-nums text-[var(--muted)]">
                    {prod.sku}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[var(--text)]">
                    {prod.name}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] font-medium">
                      {prod.categoryName}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[var(--muted)] whitespace-nowrap">
                    {prod.format}
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold tabular-nums text-[var(--text)] whitespace-nowrap">
                    {formatMoney(prod.generalPrice)}
                  </td>

                  {role === 'direccion' && (
                    <td className="py-3.5 px-4 text-right tabular-nums text-brand font-semibold whitespace-nowrap">
                      {formatMoney(prod.costPrice)}
                    </td>
                  )}

                  <td className="py-3.5 px-4 text-center tabular-nums whitespace-nowrap">
                    <span className={`font-bold ${prod.availableStock <= prod.minStock ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {prod.availableStock} {prod.unit}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center tabular-nums whitespace-nowrap">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-[var(--muted)]">
                      {prod.aisle}-{prod.shelf}-{prod.bin}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <ChevronRight className="w-4 h-4 text-[var(--muted)] inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail Modal */}
      <FichaArticuloModal />
    </div>
  );
};
