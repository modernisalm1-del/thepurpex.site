import React, { useState } from 'react';
import { 
  Headphones, 
  Server, 
  Code, 
  FileSpreadsheet, 
  Database, 
  ShieldCheck, 
  CheckCircle, 
  ArrowUpRight, 
  Sparkles,
  Clock,
  Layers,
  X
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-indigo-600" />;
      case 'Server':
        return <Server className="w-5 h-5 text-indigo-600" />;
      case 'Code':
        return <Code className="w-5 h-5 text-indigo-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-indigo-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      default:
        return <Layers className="w-5 h-5 text-indigo-600" />;
    }
  };

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Solutions' },
    { id: 'bpo', label: 'BPO & Call Center' },
    { id: 'it-solutions', label: 'IT & Software Engineering' },
    { id: 'back-office', label: 'Back-Office Operations' },
    { id: 'cloud-infra', label: 'Data & AI Management' },
  ];

  return (
    <section id="services" className="py-20 bg-[#fdfdfd] text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Enterprise Service Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 font-serif tracking-tight">
            Tailored BPO &amp; Scalable IT Solutions
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-light">
            Engineered to support US enterprise operations with rigorous SLAs, 24/7 dedicated staffing, and direct management oversight.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-indigo-900 text-white shadow-md shadow-indigo-950/20'
                  : 'bg-white text-slate-600 hover:text-indigo-950 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 hover:border-indigo-400 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-indigo-900/5 group relative overflow-hidden"
            >
              <div className="w-8 h-0.5 bg-indigo-600 mb-6 group-hover:w-16 transition-all duration-300" />

              <div>
                {/* Service Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-sm bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-slate-100 text-slate-600">
                    {service.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif group-hover:text-indigo-900 transition-colors">
                  {service.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed mb-5 font-normal">
                  {service.summary}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                  {service.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: SLA & Actions */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] text-indigo-950 font-semibold mb-4 bg-indigo-50/70 p-2 rounded-sm border border-indigo-100">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">{service.sla}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 py-2.5 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    View Scope
                  </button>
                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="py-2.5 px-4 rounded-md bg-indigo-900 hover:bg-indigo-800 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
                    title="Get a dedicated quote for this solution"
                  >
                    <span>Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Scope Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl text-slate-900 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-sm bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  {selectedService.category.replace('-', ' ')}
                </span>
                <h3 className="text-2xl font-bold text-slate-950 font-serif">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-light">
              {selectedService.description}
            </p>

            {/* Complete Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Service Capabilities &amp; Protocols</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-md border border-slate-200 text-xs text-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Standard Deliverables</h4>
              <div className="space-y-2">
                {selectedService.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100/80 px-3 py-2 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA Commitment */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 mb-6 text-xs text-indigo-950">
              <strong className="text-indigo-900 uppercase font-bold tracking-wider block mb-1">Service Level Agreement (SLA):</strong>
              {selectedService.sla}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(title);
                }}
                className="px-6 py-2.5 rounded-md bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold uppercase tracking-widest shadow-md transition-colors"
              >
                Request Proposal for This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
