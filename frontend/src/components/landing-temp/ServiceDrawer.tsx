import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, DollarSign, CheckCircle2, Heart, Sparkles, Shield, GitPullRequest, Layers, Activity } from 'lucide-react';
import { Service } from '../types';

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export default function ServiceDrawer({ service, onClose, onBook }: ServiceDrawerProps) {
  // Mapping string to lucide icons
  const iconMap: { [key: string]: any } = {
    Heart,
    Sparkles,
    Shield,
    GitPullRequest,
    Layers,
    Activity
  };

  const SelectedIcon = service ? iconMap[service.iconName] || Activity : Activity;

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm"
            id="drawer-backdrop"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative h-full w-full max-w-lg bg-white shadow-2xl border-l border-slate-100 flex flex-col z-10 overflow-hidden"
            id="drawer-content"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-brand-50 text-brand-500 rounded-xl p-2.5">
                  <SelectedIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-brand-500 uppercase">
                    {service.category} Specialization
                  </span>
                  <h4 className="font-display font-semibold text-slate-800 text-sm md:text-base leading-tight">
                    Clinical Blueprint
                  </h4>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                id="close-drawer-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Title & Core Summary */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">
                  {service.longDesc}
                </p>
              </div>

              {/* Technical Specifications Metas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="bg-white text-slate-500 rounded-xl p-2 shadow-sm border border-slate-200/50">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Duration</span>
                    <span className="text-sm font-semibold text-slate-800">{service.duration}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="bg-white text-brand-500 rounded-xl p-2 shadow-sm border border-slate-200/50">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Investment</span>
                    <span className="text-sm font-semibold text-slate-800">{service.priceEstimate || 'Varies'}</span>
                  </div>
                </div>
              </div>

              {/* Clinical Procedures & Inclusions */}
              <div className="space-y-4">
                <h4 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Screening Procedures & Inclusions
                </h4>
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-600 leading-relaxed font-light">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notice info */}
              <div className="rounded-2xl bg-amber-50/50 border border-amber-100/60 p-4">
                <p className="text-[11px] text-amber-800 leading-relaxed font-light">
                  * Clinical preparation protocols (such as fasting or medical record logs) will be detailed inside your confirmation digital package once booked.
                </p>
              </div>
            </div>

            {/* Sticky Action Call */}
            <div className="border-t border-slate-100 bg-slate-50 p-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  onBook(service.title);
                  onClose();
                }}
                className="w-full bg-slate-900 text-white rounded-full py-4 text-center text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                id="drawer-book-btn"
              >
                Secure This Specialty Consultation
              </button>
              <button
                onClick={onClose}
                className="w-full text-slate-500 rounded-full py-2.5 text-center text-xs font-semibold hover:text-slate-700 transition-colors"
                id="drawer-close-btn"
              >
                Return to Directory
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
