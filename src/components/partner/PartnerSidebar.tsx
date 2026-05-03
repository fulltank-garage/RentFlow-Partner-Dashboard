"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { readStoreProfile, type PartnerStoreProfile } from "@/src/lib/partner-store";
import { PARTNER_NAV } from "./partnerNav";
import type { PartnerNavGroup } from "./partnerNav";

type Props = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  drawerWidth?: number;
};

const GROUP_LABEL: Record<PartnerNavGroup, string> = {
  Operations: "จัดการร้าน",
  Sales: "การขายและลูกค้า",
  Finance: "การเงิน",
  Analytics: "วิเคราะห์และการตลาด",
  Settings: "ระบบและช่วยเหลือ",
};

const GROUPS: PartnerNavGroup[] = [
  "Operations",
  "Sales",
  "Finance",
  "Analytics",
  "Settings",
];

export default function PartnerSidebar({
  mobileOpen,
  onMobileClose,
  drawerWidth = 296,
}: Props) {
  const pathname = usePathname();
  const [storeProfile, setStoreProfile] =
    React.useState<PartnerStoreProfile | null>(null);

  React.useEffect(() => {
    const syncStoreProfile = () => setStoreProfile(readStoreProfile());

    syncStoreProfile();
    window.addEventListener("storage", syncStoreProfile);
    window.addEventListener("rentflow-store-profile-updated", syncStoreProfile);

    return () => {
      window.removeEventListener("storage", syncStoreProfile);
      window.removeEventListener(
        "rentflow-store-profile-updated",
        syncStoreProfile
      );
    };
  }, []);

  const content = (
    <Box
      className="h-full bg-white"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="px-5 pb-4 pt-5 md:px-5 md:pt-6" sx={{ flex: "0 0 auto" }}>
        <Stack direction="row" spacing={1.4} alignItems="center">
          <Box className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[20px] bg-[var(--rf-partner-blue-deep)] text-sm font-black tracking-[-0.05em] text-white shadow-[0_16px_34px_rgba(15,23,42,0.16)]">
            {storeProfile?.logoUrl ? (
              <Box
                component="img"
                src={storeProfile.logoUrl}
                alt={storeProfile.shopName}
                className="h-full w-full object-cover"
              />
            ) : (
              "RF"
            )}
          </Box>
          <Box className="min-w-0">
            <Typography className="truncate text-[1.02rem] font-extrabold leading-tight tracking-[-0.035em] text-slate-950">
              {storeProfile?.shopName || "ศูนย์จัดการร้าน"}
            </Typography>
            <Typography className="mt-1 text-[0.78rem] font-medium leading-tight tracking-[-0.01em] text-slate-500">
              Partner Dashboard
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        className="partner-scrollbar px-3 pb-5 pt-1"
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        {GROUPS.map((group, index) => {
          const items = PARTNER_NAV.filter((x) => x.group === group);
          if (!items.length) return null;

          return (
            <Box
              key={group}
              sx={{
                mb: 1.55,
                ...(index !== 0 && { pt: 0.15 }),
              }}
            >
              <Typography
                className="px-3 pb-2 pt-2 text-[0.78rem] uppercase tracking-[0.08em] text-slate-500"
                sx={{ fontWeight: "850 !important" }}
              >
                {GROUP_LABEL[group]}
              </Typography>

              <List
                dense={false}
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.35,
                }}
              >
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");

                  return (
                    <ListItemButton
                      key={item.href}
                      component={Link}
                      href={item.href}
                      onClick={onMobileClose}
                      className="mx-0.5 rounded-[22px]"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        borderRadius: "22px",
                        minHeight: { xs: 50, md: 46 },
                        px: 2,
                        py: 1.1,
                        bgcolor: active ? "#eef1f5" : "transparent",
                        border: 0,
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#eef1f5",
                          border: 0,
                          boxShadow: "none",
                        },
                        transition:
                          "background-color 180ms ease, box-shadow 180ms ease",
                      }}
                      selected={active}
                    >
                      <ListItemText
                        sx={{ my: 0 }}
                        primary={
                          <Typography
                            sx={{
                              fontSize: { xs: 16, md: 15 },
                              fontWeight: "400 !important",
                              lineHeight: 1.3,
                              letterSpacing: "-0.02em",
                              color: active ? "rgb(15 23 42)" : "rgb(71 85 105)",
                            }}
                          >
                            {item.label}
                          </Typography>
                        }
                      />
                      {item.badge ? (
                        <Box className="rounded-full bg-[var(--rf-partner-blue-deep)] px-2 py-0.5 text-[0.68rem] font-bold leading-tight text-white">
                          {item.badge}
                        </Box>
                      ) : null}
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  const paperSx = {
    width: drawerWidth,
    borderRight: 0,
    bgcolor: "#ffffff",
    boxShadow: "none",
  } as const;

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            ...paperSx,
          },
        }}
      >
        {content}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            ...paperSx,
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
}
