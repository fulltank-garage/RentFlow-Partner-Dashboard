import {
  requestPartner,
  resolvePartnerAssetUrl,
} from "../core/api-client.service";
import type { PartnerTenant } from "./tenant.types";

function normalizeTenant(tenant: PartnerTenant): PartnerTenant {
  return {
    ...tenant,
    logoUrl: resolvePartnerAssetUrl(tenant.logoUrl),
    promoImageUrl: resolvePartnerAssetUrl(tenant.promoImageUrl),
  };
}

export const tenantService = {
  async getMyTenant() {
    const tenant = await requestPartner<PartnerTenant>("/tenants/me");
    return normalizeTenant(tenant);
  },

  async saveMyTenant(input: {
    shopName: string;
    domainSlug: string;
    logoUrl?: string | null;
    promoImageUrl?: string | null;
  }) {
    const tenant = await requestPartner<PartnerTenant>("/tenants/me", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return normalizeTenant(tenant);
  },
};
