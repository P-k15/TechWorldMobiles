import React from 'react';

export function ConditionBadge({ condition }) {
  if (!condition) return null;
  const c = condition.toLowerCase();
  
  if (c.includes('excellent') || c.includes('mint')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#237A4B]/10 text-[#237A4B] border border-[#237A4B]/20">
        Grade A • Excellent
      </span>
    );
  }
  if (c.includes('good')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-[#20252B] border border-[#E2E5E8]">
        Grade B • Good
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30">
      Grade C • Fair
    </span>
  );
}

export function OrderStatusBadge({ status }) {
  if (!status) return null;
  const s = status.toLowerCase();

  if (s === 'delivered') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#237A4B]/10 text-[#237A4B] border border-[#237A4B]/30">
        Delivered
      </span>
    );
  }
  if (s === 'shipped') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        Shipped
      </span>
    );
  }
  if (s === 'confirmed') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        Order Confirmed
      </span>
    );
  }
  if (s === 'cancelled') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#D9383A]/10 text-[#D9383A] border border-[#D9383A]/20">
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F5F5F2] text-[#69727C] border border-[#E2E5E8]">
      {status}
    </span>
  );
}

export function RequestStatusBadge({ status }) {
  if (!status) return null;
  const s = status.toLowerCase();

  if (s.includes('completed')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#237A4B]/15 text-[#237A4B] border border-[#237A4B]/30">
        ✓ Purchase Completed
      </span>
    );
  }
  if (s.includes('accepted')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
        Offer Accepted
      </span>
    );
  }
  if (s.includes('offer')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E85D2A]/10 text-[#E85D2A] border border-[#E85D2A]/30">
        Offer Made
      </span>
    );
  }
  if (s.includes('inspection')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
        Inspection Required
      </span>
    );
  }
  if (s.includes('review')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-[#17212B] border border-[#E2E5E8]">
        Under Review
      </span>
    );
  }
  if (s.includes('rejected')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#D9383A]/10 text-[#D9383A] border border-[#D9383A]/20">
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F5F5F2] text-[#69727C] border border-[#E2E5E8]">
      Submitted — Awaiting Review
    </span>
  );
}

export function PaymentStatusBadge({ status }) {
  if (!status) return null;
  const s = status.toLowerCase();

  if (s === 'paid') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#237A4B]/10 text-[#237A4B] border border-[#237A4B]/30">
        Paid
      </span>
    );
  }
  if (s.includes('cod') || s.includes('pending')) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
        Pending (COD)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F5F5F2] text-[#69727C] border border-[#E2E5E8]">
      {status}
    </span>
  );
}
