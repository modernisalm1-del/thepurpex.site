import React from 'react';
import { 
  Globe2, 
  DollarSign, 
  ShieldAlert, 
  Headphones, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Layers,
  Cpu,
  Clock8
} from 'lucide-react';
import { CLIENT_ADVANTAGES } from '../data/companyData';

interface UsDeliveryModelProps {
  onOpenQuote: () => void;
}

export const UsDeliveryModel: React.FC<UsDeliveryModelProps> = ({ onOpenQuote }) => {
  const comparisonData = [
    {
      metric: 'Average Annual Cost per Dedicated Engineer/Agent',
      usDomestic: '$85,000 – $140,000 + benefits & payroll taxes',
      purpexModel: '$28,000 – $48,000 all-inclusive turnkey',
      savings: 'Save ~65%',
    },
    {
      metric: 'Time-to-Deploy Full Team (5-10 Seats)',
      usDomestic: '60 – 90 Days (Recruiting + Onboarding)',
      purpexModel: '7 – 14 Business Days (Pre-Vetted Bench)',
      savings: '4x Faster Ramp-Up',
    },
    {
      metric: '24/7 After-Hours & Weekend Shift Coverage',
      usDomestic: 'High overtime rates & shift differentials',
      purpexModel: 'Native round-the-clock shift model',
      savings: 'Zero Shift Multiplier',
    },
    {
      metric: 'Infrastructure, Equipment & Hardware Procurement',
      usDomestic: 'Capital expenditure ($3,000+ per seat)',
      purpexModel: 'Fully provided by The Purpex HQ',
      savings: '100% OPEX Model',
    },
  ];

  return (
    <section id="us-delivery" className="py-20 bg-indigo-950 text-white border-b border-indigo-900 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1 bg-indigo-400 mx-auto mb-4" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-indigo-900/90 border border-indigo-700/60 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            North American Delivery Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-sans">
            Strategic Advantage &amp; <span className="font-bold italic text-indigo-300">Operational Balance</span>
          </h2>
          <p className="mt-4 text-base text-indigo-200 leading-relaxed font-light">
            Eliminate operational friction and bridge high domestic talent costs while maintaining complete US time-zone synchronization (EST, CST, PST).
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CLIENT_ADVANTAGES.map((item, idx) => (
            <div 
              key={idx}
              className="bg-indigo-900/50 border border-indigo-800/80 rounded-md p-6 flex flex-col justify-between hover:border-indigo-500 transition-all backdrop-blur-xs"
            >
              <div>
                <div className="inline-block px-2.5 py-1 rounded-sm bg-indigo-950 border border-indigo-700 text-indigo-300 text-[10px] font-mono uppercase font-bold mb-4">
                  {item.metric}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-serif">
                  {item.title}
                </h3>
                <p className="text-xs text-indigo-200 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-indigo-800/60 flex items-center gap-1.5 text-[11px] text-indigo-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified Purpex SLA</span>
              </div>
            </div>
          ))}
        </div>

        {/* Geometric Comparison Table */}
        <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg overflow-hidden shadow-2xl mb-12">
          <div className="p-6 bg-indigo-950/90 border-b border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-serif">Financial &amp; Operational Efficiency Matrix</h3>
              <p className="text-xs text-indigo-300 mt-1 font-light">Direct comparison: Traditional US domestic staffing vs. The Purpex dedicated pod structure</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/80 px-3 py-1.5 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
              <TrendingDown className="w-4 h-4" />
              <span>Measurable ROI</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-indigo-950 text-indigo-300 border-b border-indigo-800 font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="py-3.5 px-6">Operational Metric</th>
                  <th className="py-3.5 px-6">US Domestic In-House</th>
                  <th className="py-3.5 px-6 text-indigo-200">The Purpex Pods</th>
                  <th className="py-3.5 px-6 text-emerald-400">Net Business Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-900/60 text-indigo-100 font-light">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-indigo-900/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">{row.metric}</td>
                    <td className="py-4 px-6 text-indigo-300">{row.usDomestic}</td>
                    <td className="py-4 px-6 text-white font-semibold">{row.purpexModel}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-sm border border-emerald-700/70 text-xs uppercase tracking-wider">
                        {row.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integration Ecosystem Banner */}
        <div className="bg-indigo-900/60 border border-indigo-700 rounded-md p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h4 className="text-lg font-bold text-white font-serif">Seamless Integration with Your Enterprise Stack</h4>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl font-light">
              Our specialists integrate natively with Slack, Teams, Jira, Asana, Zendesk, Salesforce, AWS, GitHub, and your internal VPN setups as a secure extension of your workforce.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-indigo-50 text-indigo-950 text-xs font-bold uppercase tracking-widest shadow-md transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Request Operational Consultation</span>
            <ArrowRight className="w-4 h-4 text-indigo-900" />
          </button>
        </div>

      </div>
    </section>
  );
};
