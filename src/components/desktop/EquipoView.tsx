import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  User, 
  Key, 
  Check, 
  X, 
  Lock, 
  Unlock,
  Shield
} from 'lucide-react';

export const EquipoView: React.FC = () => {
  const { addToast } = useApp();

  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Juanlu García', role: 'Dirección (Dueño)', email: 'juanlu@polihosteleria.es', seeMargins: true, seeClients: true, managePurchases: true },
    { id: 'usr-2', name: 'Rocío Santos', role: 'Oficina y Facturación', email: 'rocio@polihosteleria.es', seeMargins: false, seeClients: true, managePurchases: true },
    { id: 'usr-3', name: 'Paco Vázquez', role: 'Jefe de Almacén', email: 'paco@polihosteleria.es', seeMargins: false, seeClients: false, managePurchases: false },
    { id: 'usr-4', name: 'Antonio Gómez', role: 'Comercial Calle', email: 'antonio@polihosteleria.es', seeMargins: false, seeClients: true, managePurchases: false },
    { id: 'usr-5', name: 'José Romero', role: 'Repartidor Ruta Costa', email: 'jose@polihosteleria.es', seeMargins: false, seeClients: false, managePurchases: false },
  ]);

  const toggleMarginPermission = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const next = !u.seeMargins;
        addToast({
          type: next ? 'ok' : 'warn',
          title: `Permiso actualizado para ${u.name}`,
          message: next ? 'Ahora puede visualizar costes de compra y márgenes.' : 'Visualización de márgenes y costes restringida.',
        });
        return { ...u, seeMargins: next };
      }
      return u;
    }));
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-[var(--surface)] p-6 rounded-panel border border-[var(--line)] shadow-resting">
        <h1 className="text-[20px] font-bold text-[var(--text)] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand" />
          <span>Equipo y Control de Permisos</span>
        </h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">
          Configuración granular de acceso para Dirección, Oficina, Almacén, Comerciales y Repartidores
        </p>
      </div>

      {/* Users table */}
      <div className="bg-[var(--surface)] rounded-panel border border-[var(--line)] shadow-resting overflow-hidden">
        <table className="w-full text-left border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Rol asignado</th>
              <th className="py-3 px-4">Correo</th>
              <th className="py-3 px-4 text-center">Ve márgenes y costes</th>
              <th className="py-3 px-4 text-center">Gestión clientes</th>
              <th className="py-3 px-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[var(--surface-2)] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[var(--text)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[12px]">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{u.name}</span>
                </td>

                <td className="py-3.5 px-4 font-medium text-[var(--text)]">
                  {u.role}
                </td>

                <td className="py-3.5 px-4 text-[var(--muted)]">
                  {u.email}
                </td>

                {/* Ve márgenes toggle */}
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleMarginPermission(u.id)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                        u.seeMargins ? 'bg-brand' : 'bg-[var(--line)]'
                      }`}
                      aria-label="Permiso ver márgenes"
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          u.seeMargins ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-[11px] text-[var(--muted)] w-8 text-left">
                      {u.seeMargins ? 'Sí' : 'No'}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-center">
                  {u.seeClients ? (
                    <span className="text-emerald-600 font-bold">✓ Acceso</span>
                  ) : (
                    <span className="text-[var(--muted)]">—</span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                    ACTIVO
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
