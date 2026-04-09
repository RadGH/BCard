import { useState } from 'react';
import type { BusinessCardData } from '../../types/card';
import { SOCIAL_NETWORK_IDS, getSocialNetwork } from '../../constants/social-networks';

interface Props {
  data: BusinessCardData;
  updateField: <K extends keyof BusinessCardData>(field: K, value: BusinessCardData[K]) => void;
  updateSocial: (field: string, value: string) => void;
  updateAddress: (field: string, value: string) => void;
}

function FieldLabel({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
      <i className={`${icon} w-3 opacity-60`} />
      {children}
    </span>
  );
}

function Input({ label, icon, value, onChange, placeholder, type = 'text' }: {
  label: string;
  icon?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      {icon ? <FieldLabel icon={icon}>{label}</FieldLabel> : (
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </label>
  );
}

export default function FieldsPanel({ data, updateField, updateSocial, updateAddress }: Props) {
  const [showNetworkPicker, setShowNetworkPicker] = useState(false);

  const addedNetworkIds = Object.keys(data.social ?? {});
  const availableNetworks = SOCIAL_NETWORK_IDS.filter(id => !addedNetworkIds.includes(id));

  const handleAddNetwork = (networkId: string) => {
    if (!networkId) return;
    updateSocial(networkId, '');
    setShowNetworkPicker(false);
  };

  const handleRemoveNetwork = (networkId: string) => {
    updateField('social', Object.fromEntries(
      Object.entries(data.social ?? {}).filter(([k]) => k !== networkId)
    ));
  };

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Personal</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" value={data.firstName} onChange={v => updateField('firstName', v)} placeholder="Sarah" />
            <Input label="Last Name" value={data.lastName} onChange={v => updateField('lastName', v)} placeholder="Chen" />
          </div>
          <Input label="Title" value={data.title} onChange={v => updateField('title', v)} placeholder="CEO" />
          <Input label="Company" value={data.company} onChange={v => updateField('company', v)} placeholder="Nexus Dynamics" />
          <Input label="Credentials" value={data.credentials ?? ''} onChange={v => updateField('credentials', v || undefined)} placeholder="MD, CPA, etc." />
          <Input label="Tagline" value={data.tagline ?? ''} onChange={v => updateField('tagline', v || undefined)} placeholder="Innovation through collaboration" />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Contact</h3>
        <div className="space-y-3">
          <Input label="Email" icon="fa-solid fa-envelope" value={data.email} onChange={v => updateField('email', v)} placeholder="sarah@nexusdyn.com" />
          <Input label="Phone" icon="fa-solid fa-phone" value={data.phone} onChange={v => updateField('phone', v)} placeholder="(415) 555-0142" />
          <Input label="Fax" icon="fa-solid fa-fax" value={data.fax ?? ''} onChange={v => updateField('fax', v || undefined)} placeholder="(415) 555-0143" />
          <Input label="Website" icon="fa-solid fa-globe" value={data.website ?? ''} onChange={v => updateField('website', v || undefined)} placeholder="www.nexusdyn.com" />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Address</h3>
        <div className="space-y-3">
          <Input label="Line 1" value={data.address?.line1 ?? ''} onChange={v => updateAddress('line1', v)} placeholder="123 Main St" />
          <Input label="Line 2" value={data.address?.line2 ?? ''} onChange={v => updateAddress('line2', v)} placeholder="Suite 400" />
          <div className="grid grid-cols-3 gap-2">
            <Input label="City" value={data.address?.city ?? ''} onChange={v => updateAddress('city', v)} placeholder="City" />
            <Input label="State" value={data.address?.state ?? ''} onChange={v => updateAddress('state', v)} placeholder="CA" />
            <Input label="Zip" value={data.address?.zip ?? ''} onChange={v => updateAddress('zip', v)} placeholder="94102" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Social</h3>
        <div className="space-y-2">
          {addedNetworkIds.map(networkId => {
            const network = getSocialNetwork(networkId);
            return (
              <div key={networkId} className="flex items-center gap-2">
                <span className="w-6 flex items-center justify-center shrink-0">
                  {network ? (
                    <i className={`${network.faClass} text-slate-400`} />
                  ) : (
                    <i className="fa-solid fa-link text-slate-400" />
                  )}
                </span>
                <span className="text-xs font-medium text-slate-500 w-20 shrink-0">
                  {network?.name ?? networkId}
                </span>
                <input
                  type="text"
                  value={data.social?.[networkId] ?? ''}
                  onChange={e => updateSocial(networkId, e.target.value)}
                  placeholder={network?.placeholder ?? 'handle'}
                  className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleRemoveNetwork(networkId)}
                  className="shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove network"
                >
                  <i className="fa-solid fa-trash text-xs" />
                </button>
              </div>
            );
          })}

          {showNetworkPicker ? (
            <div className="flex items-center gap-2 mt-2">
              <select
                autoFocus
                onChange={e => handleAddNetwork(e.target.value)}
                defaultValue=""
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select a network...</option>
                {availableNetworks.map(id => {
                  const net = getSocialNetwork(id);
                  return <option key={id} value={id}>{net?.name ?? id}</option>;
                })}
              </select>
              <button
                onClick={() => setShowNetworkPicker(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          ) : availableNetworks.length > 0 ? (
            <button
              onClick={() => setShowNetworkPicker(true)}
              className="mt-1 flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-blue-300 w-full"
            >
              <i className="fa-solid fa-plus text-xs" />
              Add Network
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
