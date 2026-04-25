export type PartnerNavGroup =
  | "Operations"
  | "Sales"
  | "Finance"
  | "Analytics"
  | "Settings";

export type PartnerNavItem = {
  label: string;
  href: string;
  group: PartnerNavGroup;
  badge?: string;
};

export const PARTNER_NAV: PartnerNavItem[] = [
  { label: "ภาพรวม", href: "/admin/dashboard", group: "Operations" },
  { label: "ตั้งค่าร้าน", href: "/admin/store-setup", group: "Operations" },
  { label: "จัดหน้าเว็บ", href: "/admin/store-builder", group: "Operations" },
  { label: "รถของร้าน", href: "/admin/cars", group: "Operations" },
  { label: "สาขา", href: "/admin/locations", group: "Operations" },
  { label: "การจอง", href: "/admin/bookings", group: "Sales" },
  { label: "ลูกค้า", href: "/admin/customers", group: "Sales" },
  { label: "ลูกค้าเป้าหมาย", href: "/admin/leads", group: "Sales" },
  { label: "ชำระเงิน", href: "/admin/payments", group: "Finance" },
  { label: "ยืนยันชำระเงิน", href: "/admin/payment-verification", group: "Finance" },
  { label: "ปฏิทิน", href: "/admin/calendar", group: "Analytics" },
  { label: "โปรโมชัน", href: "/admin/promotions", group: "Analytics" },
  { label: "บริการเสริม", href: "/admin/addons", group: "Analytics" },
  { label: "รายงาน", href: "/admin/reports", group: "Analytics" },
  { label: "บัญชีไลน์", href: "/admin/line", group: "Settings" },
  { label: "ผู้ช่วยอัจฉริยะ", href: "/admin/ai", group: "Settings", badge: "ใหม่" },
  { label: "ช่วยเหลือ", href: "/admin/support", group: "Settings" },
];
