import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  label = 'Verified Educator',
  size = 'md',
  className = ''
}) => {
  return (
    <span
      id="verified-educator-badge"
      className={`inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs'
      } ${className}`}
      title="Verified through identity and academic credentials check"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
};
