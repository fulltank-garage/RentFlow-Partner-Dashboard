"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import { ADMIN_NAV } from "./adminNav";
import type { AdminNavGroup } from "./adminNav";

type Props = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  drawerWidth?: number;
};

const GROUP_LABEL: Record<AdminNavGroup, string> = {
  Operations: "งานปฏิบัติการ",
  Sales: "งานขาย / ลูกค้า",
  Finance: "การเงิน",
  Analytics: "รายงานและวิเคราะห์",
  Administration: "ผู้ดูแลระบบ",
};

const GROUPS: AdminNavGroup[] = [
  "Operations",
  "Sales",
  "Finance",
  "Analytics",
  "Administration",
];

export default function AdminSidebar({
  mobileOpen,
  onMobileClose,
  drawerWidth = 280,
}: Props) {
  const pathname = usePathname();

  const content = (
    <Box
      className="ios-glass h-full border-0"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box className="p-2 sm:p-2.5 md:p-3 lg:p-3" sx={{ flex: "0 0 auto" }}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box className="grid h-10 w-10 place-items-center rounded-[17px] bg-linear-to-br from-sky-500 via-blue-500 to-emerald-400 text-white shadow-[0_14px_34px_rgba(59,130,246,0.24)]">
            <DirectionsCarRoundedIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography className="text-sm font-extrabold text-slate-900">
              RentFlow Partner
            </Typography>
            <Typography className="text-[11px] font-semibold text-slate-500">
              ศูนย์จัดการร้าน
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider className="border-white/60!" />

      <Box
        className="ios-scrollbar px-2 py-3"
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        {GROUPS.map((group, index) => {
          const items = ADMIN_NAV.filter((x) => x.group === group);
          if (!items.length) return null;

          return (
            <Box
              key={group}
              sx={{
                mb: 1,
                ...(index !== 0 && {
                  borderTop: "1px solid rgba(255,255,255,0.62)",
                }),
              }}
            >
              <Typography className="px-2 pb-2 pt-3 text-[11px] font-bold tracking-wide text-slate-500">
                {GROUP_LABEL[group]}
              </Typography>

              <List
                dense={false}
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");

                  const iconColor = item.color ?? "#64748B";

                  return (
                    <ListItemButton
                      key={item.href}
                      component={Link}
                      href={item.href}
                      onClick={onMobileClose}
                      className="mx-1 rounded-xl"
                      sx={{
                        borderRadius: 3,
                        minHeight: { xs: 54, sm: 50, md: 46 },
                        px: { xs: 2.5, md: 2 },
                        py: { xs: 1.4, md: 1.1 },
                        bgcolor: active
                          ? "rgba(255,255,255,0.82)"
                          : "transparent",
                        border: active
                          ? "1px solid rgba(255,255,255,0.78)"
                          : "1px solid transparent",
                        boxShadow: active
                          ? "0 12px 34px rgba(15,23,42,0.08)"
                          : "none",
                        backdropFilter: active ? "blur(18px)" : "none",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.68)",
                          border: "1px solid rgba(255,255,255,0.78)",
                          boxShadow: "0 12px 30px rgba(15,23,42,0.07)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "rgba(255,255,255,0.82)",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "rgba(255,255,255,0.78)",
                        },
                        transition:
                          "background-color 150ms ease, border 150ms ease, box-shadow 150ms ease",
                      }}
                      selected={active}
                    >
                      <ListItemIcon
                        sx={{ minWidth: { xs: 48, md: 44 }, color: "inherit" }}
                      >
                        <Icon
                          sx={{
                            fontSize: { xs: 24, md: 22 },
                            color: active ? "var(--rf-ios-blue)" : iconColor,
                            opacity: active ? 1 : 0.7,

                            transition: "opacity 150ms ease",
                            ".MuiListItemButton-root:hover &": { opacity: 1 },
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: { xs: 17, md: 15.5 },
                              fontWeight: active ? 800 : 650,
                              lineHeight: 1.3,
                              letterSpacing: 0.2,
                              color: "rgb(30 41 59)",
                            }}
                          >
                            {item.label}
                          </Typography>
                        }
                      />
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
    borderRight: "1px solid rgba(148,163,184,0.22)",
    bgcolor: "rgba(255,255,255,0.58)",
    boxShadow: "18px 0 56px rgba(15,23,42,0.08)",
    backdropFilter: "blur(28px) saturate(1.35)",
    WebkitBackdropFilter: "blur(28px) saturate(1.35)",
  } as const;

  return (
    <>
      {/* Mobile Drawer */}
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

      {/* Desktop Sidebar */}
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
