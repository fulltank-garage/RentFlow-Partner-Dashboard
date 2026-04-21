type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type AuthUser = {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
};

export type PartnerTenant = {
  id: string;
  ownerEmail?: string;
  shopName: string;
  domainSlug: string;
  publicDomain: string;
  status: string;
  plan: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PartnerCarStatus = "available" | "rented" | "maintenance" | "hidden";

export type PartnerCar = {
  id: string;
  tenantId?: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  pricePerDay: number;
  description?: string;
  locationId?: string;
  status: PartnerCarStatus;
  isAvailable: boolean;
  image?: string;
  imageUrl?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type PartnerCarPayload = {
  name: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  pricePerDay: number;
  description?: string;
  locationId?: string;
  status: PartnerCarStatus;
};

export type PartnerBranch = {
  id: string;
  tenantId?: string;
  name: string;
  address: string;
  phone?: string;
  locationId?: string;
  type?: "airport" | "storefront" | "meeting_point";
  displayOrder: number;
  lat?: number;
  lng?: number;
  openTime?: string;
  closeTime?: string;
  pickupAvailable: boolean;
  returnAvailable: boolean;
  extraFee: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PartnerBranchPayload = {
  name: string;
  address: string;
  phone?: string;
  locationId?: string;
  type: "airport" | "storefront" | "meeting_point";
  displayOrder: number;
  lat?: number;
  lng?: number;
  openTime?: string;
  closeTime?: string;
  pickupAvailable: boolean;
  returnAvailable: boolean;
  extraFee: number;
  isActive: boolean;
};

export type PartnerDashboard = {
  tenant: PartnerTenant;
  summary: {
    totalCars: number;
    availableCars: number;
    totalBranches: number;
    activeBranches: number;
    totalBookings: number;
    todayPickups: number;
    todayReturns: number;
    totalRevenue: number;
    totalReviews: number;
  };
  bookingStatus: Record<string, number>;
  fleetStatus: Record<PartnerCarStatus, number>;
  weeklySales: Array<{ day: string; key: string; bookings: number; revenue: number }>;
  topCars: Array<{ id: string; name: string; bookings: number; revenue: number }>;
  recentBookings: Array<{
    id: string;
    bookingCode: string;
    carId: string;
    carName: string;
    customerName: string;
    pickupDate: string;
    returnDate: string;
    status: string;
    totalAmount: number;
    revenue: number;
    createdAt: string;
  }>;
  recentReviews: Array<{
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
    comment?: string;
    createdAt?: string;
  }>;
};

export type PartnerBooking = {
  id: string;
  bookingCode: string;
  carId: string;
  carName?: string;
  status: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  totalDays: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PartnerPayment = {
  id: string;
  bookingId: string;
  bookingCode?: string;
  customerName?: string;
  method: string;
  status: string;
  amount: number;
  transactionId?: string;
  slipUrl?: string;
  verifiedAt?: string;
  refundStatus?: string;
  refundAmount?: number;
  payoutStatus?: string;
  settledAt?: string;
  createdAt?: string;
};

export type PartnerCustomer = {
  name: string;
  email?: string;
  phone?: string;
  bookings: number;
  totalAmount: number;
  lastBookingAt?: string;
};

export type PartnerAvailabilityBlock = {
  id: string;
  carId?: string;
  branchId?: string;
  startDate: string;
  endDate: string;
  reason: string;
  note?: string;
};

export type PartnerPromotion = {
  id: string;
  code: string;
  name: string;
  description?: string;
  discountType: "percent" | "amount";
  discountValue: number;
  isActive: boolean;
  createdAt?: string;
};

export type PartnerAddon = {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  isActive: boolean;
  createdAt?: string;
};

export type PartnerLead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  status: string;
  interestedCar?: string;
  note?: string;
  createdAt?: string;
};

export type PartnerMember = {
  id: string;
  email: string;
  name?: string;
  role: "owner" | "finance" | "staff";
  status: string;
};

export type PartnerDomain = {
  id: string;
  domain: string;
  status: string;
  verificationTxt?: string;
  verifiedAt?: string;
};

export type PartnerAuditLog = {
  id: string;
  actorEmail?: string;
  action: string;
  entity?: string;
  entityId?: string;
  detail?: string;
  createdAt: string;
};

export type PartnerLineRecentEvent = {
  id: string;
  recipient: string;
  subject: string;
  body?: string;
  status: string;
  providerRef?: string;
  createdAt: string;
};

export type PartnerLineConnection = {
  tenantId?: string;
  shopName?: string;
  domainSlug?: string;
  webhookUrl: string;
  status: string;
  isConnected: boolean;
  channelId?: string;
  hasChannelSecret: boolean;
  hasAccessToken: boolean;
  displayName?: string;
  basicId?: string;
  botUserId?: string;
  pictureUrl?: string;
  lastVerifiedAt?: string;
  lastWebhookTestAt?: string;
  lastWebhookTestStatus?: string;
  lastError?: string;
  recentEvents?: PartnerLineRecentEvent[];
};

export type PartnerLineWebhookTest = {
  success: boolean;
  reason?: string;
  endpoint?: string;
};

export type PartnerSupportMessage = {
  id: string;
  at: string;
  from: "customer" | "agent" | "system";
  text: string;
  status?: string;
  isInternal?: boolean;
};

export type PartnerSupportOwner = {
  email: string;
  name?: string;
};

export type PartnerSupportTicket = {
  id: string;
  subject: string;
  customerName?: string;
  email?: string;
  phone?: string;
  channel: string;
  status: "new" | "open" | "waiting" | "resolved" | "closed";
  priority: "low" | "normal" | "high" | "urgent";
  ownerEmail?: string;
  bookingId?: string;
  bookingCode?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  createdAt: string;
  updatedAt: string;
  messages: PartnerSupportMessage[];
  internalNotes: PartnerSupportMessage[];
  externalThreadId?: string;
};

export class RentFlowApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RentFlowApiError";
    this.status = status;
  }
}

function apiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(
    /\/$/,
    ""
  );
}

function resolveApiAssetUrl(value?: string) {
  const rawValue = value?.trim() || "";
  if (!rawValue || rawValue.startsWith("data:") || rawValue.startsWith("blob:")) {
    return rawValue;
  }
  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }
  if (rawValue.startsWith("/")) {
    return new URL(rawValue, apiBaseUrl()).toString();
  }
  return rawValue;
}

function normalizePartnerCar(car: PartnerCar): PartnerCar {
  const imageUrl = resolveApiAssetUrl(car.imageUrl || car.image);
  const images = car.images?.map(resolveApiAssetUrl).filter(Boolean);

  return {
    ...car,
    image: imageUrl,
    imageUrl,
    images: images?.length ? images : imageUrl ? [imageUrl] : [],
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | null;

  if (!response.ok) {
    throw new RentFlowApiError(
      payload?.message || "ไม่สามารถเชื่อมต่อ API ได้",
      response.status
    );
  }

  if (payload && "data" in payload) {
    return payload.data;
  }

  return payload as T;
}

export const rentFlowPartnerApi = {
  async login(input: { username: string; password: string }) {
    return request<{ user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async logout() {
    return request<null>("/auth/logout", {
      method: "POST",
    });
  },

  async getMyTenant() {
    return request<PartnerTenant>("/tenants/me");
  },

  async saveMyTenant(input: { shopName: string; domainSlug: string }) {
    return request<PartnerTenant>("/tenants/me", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async getDashboard() {
    return request<PartnerDashboard>("/partner/dashboard");
  },

  async getReports() {
    return request<PartnerDashboard>("/partner/reports");
  },

  async getCars() {
    const response = await request<{ items: PartnerCar[]; total: number }>(
      "/partner/cars"
    );
    return {
      ...response,
      items: response.items.map(normalizePartnerCar),
    };
  },

  async createCar(input: PartnerCarPayload) {
    const car = await request<PartnerCar>("/partner/cars", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return normalizePartnerCar(car);
  },

  async updateCar(carId: string, input: PartnerCarPayload) {
    const car = await request<PartnerCar>(
      `/partner/cars/${encodeURIComponent(carId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      }
    );
    return normalizePartnerCar(car);
  },

  async deleteCar(carId: string) {
    return request<null>(`/partner/cars/${encodeURIComponent(carId)}`, {
      method: "DELETE",
    });
  },

  async uploadCarImages(
    carId: string,
    files: File[],
    options?: { replace?: boolean }
  ) {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return request<{ items: Array<{ imageUrl: string }>; total: number }>(
      `/partner/cars/${encodeURIComponent(carId)}/images${
        options?.replace ? "?replace=true" : ""
      }`,
      {
        method: "POST",
        body: formData,
      }
    );
  },

  async deleteCarImage(carId: string, imageId: string) {
    return request<null>(
      `/partner/cars/${encodeURIComponent(carId)}/images/${encodeURIComponent(
        imageId
      )}`,
      {
        method: "DELETE",
      }
    );
  },

  async reorderCarImages(carId: string, imageIds: string[]) {
    return request<null>(
      `/partner/cars/${encodeURIComponent(carId)}/images/reorder`,
      {
        method: "PATCH",
        body: JSON.stringify({ imageIds }),
      }
    );
  },

  async getBranches() {
    return request<{ items: PartnerBranch[]; total: number }>("/partner/branches");
  },

  async createBranch(input: PartnerBranchPayload) {
    return request<PartnerBranch>("/partner/branches", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async updateBranch(branchId: string, input: PartnerBranchPayload) {
    return request<PartnerBranch>(
      `/partner/branches/${encodeURIComponent(branchId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      }
    );
  },

  async deleteBranch(branchId: string) {
    return request<null>(`/partner/branches/${encodeURIComponent(branchId)}`, {
      method: "DELETE",
    });
  },

  async getBookings(status?: string) {
    return request<{ items: PartnerBooking[]; total: number }>(
      `/partner/bookings${status && status !== "all" ? `?status=${encodeURIComponent(status)}` : ""}`
    );
  },

  async updateBookingStatus(bookingId: string, status: string, note?: string) {
    return request<PartnerBooking>(
      `/partner/bookings/${encodeURIComponent(bookingId)}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status, note }),
      }
    );
  },

  async getPayments(status?: string) {
    return request<{ items: PartnerPayment[]; total: number }>(
      `/partner/payments${status && status !== "all" ? `?status=${encodeURIComponent(status)}` : ""}`
    );
  },

  async verifyPayment(paymentId: string, slipUrl?: string) {
    return request<null>(`/partner/payments/${encodeURIComponent(paymentId)}/verify`, {
      method: "PATCH",
      body: JSON.stringify({ slipUrl }),
    });
  },

  async refundPayment(paymentId: string, refundAmount?: number) {
    return request<null>(`/partner/payments/${encodeURIComponent(paymentId)}/refund`, {
      method: "PATCH",
      body: JSON.stringify({ refundAmount }),
    });
  },

  async settlePayment(paymentId: string) {
    return request<null>(`/partner/payments/${encodeURIComponent(paymentId)}/settle`, {
      method: "PATCH",
      body: JSON.stringify({}),
    });
  },

  async getCustomers() {
    return request<{ items: PartnerCustomer[]; total: number }>("/partner/customers");
  },

  async getCalendar() {
    return request<{ bookings: PartnerBooking[]; blocks: PartnerAvailabilityBlock[] }>("/partner/calendar");
  },

  async createAvailabilityBlock(input: Omit<PartnerAvailabilityBlock, "id">) {
    return request<PartnerAvailabilityBlock>("/partner/availability-blocks", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async deleteAvailabilityBlock(blockId: string) {
    return request<null>(`/partner/availability-blocks/${encodeURIComponent(blockId)}`, {
      method: "DELETE",
    });
  },

  async listPromotions() {
    return request<{ items: PartnerPromotion[]; total: number }>("/partner/promotions");
  },

  async createPromotion(input: Omit<PartnerPromotion, "id" | "createdAt">) {
    return request<PartnerPromotion>("/partner/promotions", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async updatePromotion(id: string, input: Omit<PartnerPromotion, "id" | "createdAt">) {
    return request<PartnerPromotion>(`/partner/promotions/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },

  async deletePromotion(id: string) {
    return request<null>(`/partner/promotions/${encodeURIComponent(id)}`, { method: "DELETE" });
  },

  async listAddons() {
    return request<{ items: PartnerAddon[]; total: number }>("/partner/addons");
  },

  async createAddon(input: Omit<PartnerAddon, "id" | "createdAt">) {
    return request<PartnerAddon>("/partner/addons", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async updateAddon(id: string, input: Omit<PartnerAddon, "id" | "createdAt">) {
    return request<PartnerAddon>(`/partner/addons/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },

  async deleteAddon(id: string) {
    return request<null>(`/partner/addons/${encodeURIComponent(id)}`, { method: "DELETE" });
  },

  async listLeads() {
    return request<{ items: PartnerLead[]; total: number }>("/partner/leads");
  },

  async createLead(input: Omit<PartnerLead, "id" | "createdAt">) {
    return request<PartnerLead>("/partner/leads", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async updateLead(id: string, input: Omit<PartnerLead, "id" | "createdAt">) {
    return request<PartnerLead>(`/partner/leads/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },

  async deleteLead(id: string) {
    return request<null>(`/partner/leads/${encodeURIComponent(id)}`, { method: "DELETE" });
  },

  async listMembers() {
    return request<{ items: PartnerMember[]; total: number }>("/partner/members");
  },

  async createMember(input: Omit<PartnerMember, "id" | "status">) {
    return request<PartnerMember>("/partner/members", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async updateMember(id: string, input: Omit<PartnerMember, "id">) {
    return request<null>(`/partner/members/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },

  async deleteMember(id: string) {
    return request<null>(`/partner/members/${encodeURIComponent(id)}`, { method: "DELETE" });
  },

  async listDomains() {
    return request<{ items: PartnerDomain[]; total: number }>("/partner/domains");
  },

  async createDomain(domain: string) {
    return request<PartnerDomain>("/partner/domains", {
      method: "POST",
      body: JSON.stringify({ domain }),
    });
  },

  async verifyDomain(id: string) {
    return request<null>(`/partner/domains/${encodeURIComponent(id)}/verify`, { method: "PATCH", body: JSON.stringify({}) });
  },

  async deleteDomain(id: string) {
    return request<null>(`/partner/domains/${encodeURIComponent(id)}`, { method: "DELETE" });
  },

  async listAuditLogs() {
    return request<{ items: PartnerAuditLog[]; total: number }>("/partner/audit-logs");
  },

  async getLineMessaging() {
    return request<PartnerLineConnection>("/partner/messaging/line");
  },

  async saveLineMessaging(input: {
    channelId: string;
    channelSecret: string;
    accessToken: string;
  }) {
    return request<PartnerLineConnection>("/partner/messaging/line", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async testLineMessaging(input?: {
    channelId?: string;
    channelSecret?: string;
    accessToken?: string;
  }) {
    return request<{ connection: PartnerLineConnection }>("/partner/messaging/line/test", {
      method: "POST",
      body: JSON.stringify(input || {}),
    });
  },

  async testLineWebhook(input?: {
    channelId?: string;
    channelSecret?: string;
    accessToken?: string;
    endpoint?: string;
  }) {
    return request<{
      connection: PartnerLineConnection;
      webhookTest: PartnerLineWebhookTest;
    }>("/partner/messaging/line/webhook/test", {
      method: "POST",
      body: JSON.stringify(input || {}),
    });
  },

  async deleteLineMessaging() {
    return request<null>("/partner/messaging/line", {
      method: "DELETE",
    });
  },

  async getSupportTickets() {
    return request<{
      items: PartnerSupportTicket[];
      owners: PartnerSupportOwner[];
      total: number;
    }>("/partner/support");
  },

  async updateSupportTicket(
    ticketId: string,
    input: {
      status?: PartnerSupportTicket["status"];
      priority?: PartnerSupportTicket["priority"];
      ownerEmail?: string;
    }
  ) {
    return request<null>(
      `/partner/support/tickets/${encodeURIComponent(ticketId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      }
    );
  },

  async createSupportMessage(
    ticketId: string,
    input: {
      message: string;
      isInternal?: boolean;
    }
  ) {
    return request<PartnerSupportMessage>(
      `/partner/support/tickets/${encodeURIComponent(ticketId)}/messages`,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );
  },
};
