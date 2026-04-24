import type { ReactNode } from "react";
import PartnerDashboardLayout from "../../src/components/admin/PartnerDashboardLayout";

export default function PartnerLayout({ children }: { children: ReactNode }) {
    return <PartnerDashboardLayout>{children}</PartnerDashboardLayout>;
}
