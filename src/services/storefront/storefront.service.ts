import { requestPartner } from "../core/api-client.service";
import type { StorefrontBlock, StorefrontPage } from "./storefront.types";

export const storefrontService = {
  getHomePage() {
    return requestPartner<StorefrontPage>("/partner/storefront/page?page=home");
  },

  saveHomePage(input: {
    blocks: StorefrontBlock[];
    theme?: StorefrontPage["theme"];
    isPublished?: boolean;
  }) {
    return requestPartner<StorefrontPage>("/partner/storefront/page", {
      method: "PUT",
      body: JSON.stringify({
        page: "home",
        blocks: input.blocks,
        theme: input.theme || {},
        isPublished: input.isPublished ?? true,
      }),
    });
  },
};
