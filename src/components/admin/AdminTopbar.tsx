"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Toolbar,
  Chip,
  Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import {
  readStoreProfile,
  type PartnerStoreProfile,
} from "@/src/lib/partner-store";
import { authService } from "@/src/services/auth/auth.service";

const TOKEN_COOKIE = "rentflow_session";

type Props = {
  onOpenMobile: () => void;
  drawerWidth?: number;
};

export default function AdminTopbar({
  onOpenMobile,
  drawerWidth = 280,
}: Props) {
  const router = useRouter();
  const [openProfile, setOpenProfile] = React.useState(false);
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

  async function logout() {
    await authService.logout().catch(() => null);
    document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
    router.replace("/login");
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.68)",
          color: "rgb(15 23 42)",
          backdropFilter: "blur(26px) saturate(1.35)",
          WebkitBackdropFilter: "blur(26px) saturate(1.35)",
          borderBottom: "1px solid rgba(148,163,184,0.22)",
          boxShadow: "0 16px 50px rgba(15,23,42,0.06)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ minHeight: 68 }}>
          <IconButton
            onClick={onOpenMobile}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              bgcolor: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(148,163,184,0.22)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
            }}
          >
            <MenuRoundedIcon fontSize="large" />
          </IconButton>

          <Box sx={{ ml: "auto" }}>
            {storeProfile ? (
              <Button
                onClick={() => router.push("/admin/store-setup")}
                startIcon={<StorefrontRoundedIcon />}
                className="ios-chip mr-3 hidden text-slate-900! md:inline-flex"
                variant="outlined"
                sx={{ textTransform: "none", px: 2, py: 0.75 }}
              >
                <Stack spacing={0} alignItems="flex-start">
                  <Typography className="text-xs font-bold leading-4 text-slate-900">
                    {storeProfile.shopName}
                  </Typography>
                  <Typography className="text-[11px] leading-4 text-slate-500">
                    {storeProfile.storefrontDomain}
                  </Typography>
                </Stack>
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/admin/store-setup")}
                startIcon={<StorefrontRoundedIcon />}
                className="mr-3 hidden text-amber-950! md:inline-flex"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  px: 2,
                  bgcolor: "rgba(255, 248, 235, 0.76)",
                  borderColor: "rgba(251, 191, 36, 0.36)",
                  boxShadow: "0 10px 28px rgba(251,191,36,0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 248, 235, 0.94)",
                    borderColor: "rgba(251, 191, 36, 0.5)",
                  },
                }}
              >
                ตั้งค่าร้าน
              </Button>
            )}

            <IconButton
              onClick={() => setOpenProfile(true)}
              sx={{
                p: 0,
                borderRadius: "999px",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 42,
                  height: 42,
                }}
              >
                <Avatar
                  src="/images/admin-avatar.jpg"
                  alt="Admin User"
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: "transparent",
                    background:
                      "linear-gradient(135deg, var(--rf-ios-blue), var(--rf-ios-green))",
                    border: "2px solid rgba(255,255,255,0.82)",
                    boxShadow: "0 10px 28px rgba(0,122,255,0.2)",
                  }}
                >
                  A
                </Avatar>

                <Box
                  sx={{
                    position: "absolute",
                    right: -1,
                    bottom: -1,
                    width: 18,
                    height: 18,
                    borderRadius: "999px",
                    bgcolor: "rgba(15,23,42,0.86)",
                    border: "2px solid white",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <KeyboardArrowDownRoundedIcon
                    sx={{ fontSize: 14, color: "white" }}
                  />
                </Box>
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        PaperProps={{
          sx: {
            width: { xs: "65vw", sm: 300 },
            bgcolor: "rgba(255,255,255,0.74)",
            borderLeft: "1px solid rgba(148,163,184,0.22)",
            boxShadow: "-18px 0 56px rgba(15,23,42,0.1)",
            backdropFilter: "blur(28px) saturate(1.35)",
            WebkitBackdropFilter: "blur(28px) saturate(1.35)",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            m: { xs: 0, md: 0.5 },
            position: "relative",
            height: 56,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: 500,
              fontSize: 20,
              color: "rgb(15 23 42)",
            }}
          >
            โปรไฟล์
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(148,163,184,0.22)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
              }}
              onClick={() => setOpenProfile(false)}
            >
              <CloseRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Divider className="border-white/60!" />

        <Box sx={{ px: 1.5, py: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src="/images/admin-avatar.jpg"
              alt="Admin User"
              sx={{
                width: 44,
                height: 44,
                bgcolor: "transparent",
                background:
                  "linear-gradient(135deg, var(--rf-ios-blue), var(--rf-ios-green))",
                border: "2px solid rgba(255,255,255,0.82)",
                boxShadow: "0 10px 28px rgba(0,122,255,0.2)",
              }}
            >
              A
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "rgb(15 23 42)",
                }}
              >
                Admin User
              </Box>

              <Box
                sx={{
                  fontSize: 12,
                  color: "rgb(100 116 139)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 220,
                }}
              >
                admin@example.com
              </Box>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{ mt: 1 }}
                useFlexGap
              flexWrap="wrap"
            >
                <Chip
                  size="small"
                  label="เจ้าของร้าน"
                  className="ios-chip"
                  sx={{
                    height: 24,
                    fontSize: 12,
                  }}
                />
                <Chip
                  size="small"
                  label="ออนไลน์"
                  sx={{
                    height: 24,
                    fontSize: 12,
                    bgcolor: "rgba(236,253,245,0.78)",
                    border: "1px solid rgba(52,199,89,0.26)",
                    color: "rgb(6 95 70)",
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Divider className="border-white/60!" />

        <List disablePadding sx={{ px: 1.5, py: 1.5 }}>
          <ListItemButton
            onClick={() => {
              router.push("/admin/settings?tab=general");
              setOpenProfile(false);
            }}
            sx={{
              borderRadius: 3,
              border: "1px solid transparent",
              minHeight: 48,
              px: 1.5,
              py: 1.5,
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.72)",
                borderColor: "rgba(255,255,255,0.82)",
                boxShadow: "0 12px 30px rgba(15,23,42,0.07)",
              },
              transition:
                "background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(148,163,184,0.22)",
                boxShadow: "0 10px 28px rgba(15,23,42,0.05)",
                mr: 1.5,
                flex: "0 0 auto",
              }}
            >
              <ManageAccountsRoundedIcon
                sx={{ fontSize: 22, color: "rgb(30 41 59)" }}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  fontWeight: 600,
                  color: "rgb(15 23 42)",
                  lineHeight: 1.2,
                }}
              >
                ตั้งค่าโปรไฟล์
              </Box>
              <Box sx={{ fontSize: 12, color: "rgb(100 116 139)", mt: 0.25 }}>
                แก้ไขข้อมูลส่วนตัวและรหัสผ่าน
              </Box>
            </Box>

            <ChevronRightRoundedIcon sx={{ color: "rgb(148 163 184)" }} />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              router.push("/admin/settings?tab=security");
              setOpenProfile(false);
            }}
            sx={{
              borderRadius: 3,
              border: "1px solid transparent",
              minHeight: 48,
              px: 1.5,
              py: 1.5,
              mt: 1,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.72)",
                borderColor: "rgba(255,255,255,0.82)",
                boxShadow: "0 12px 30px rgba(15,23,42,0.07)",
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(148,163,184,0.22)",
                boxShadow: "0 10px 28px rgba(15,23,42,0.05)",
                mr: 1.5,
              }}
            >
              <LockRoundedIcon sx={{ fontSize: 22, color: "rgb(30 41 59)" }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: 600, color: "rgb(15 23 42)" }}>
                เปลี่ยนรหัสผ่าน
              </Box>
              <Box sx={{ fontSize: 12, color: "rgb(100 116 139)" }}>
                อัปเดตรหัสผ่านบัญชีของคุณ
              </Box>
            </Box>

            <ChevronRightRoundedIcon sx={{ color: "rgb(148 163 184)" }} />
          </ListItemButton>
        </List>

        <Box sx={{ flex: 1 }} />

        <Divider className="border-white/60!" />

        <Box sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<LogoutRoundedIcon />}
            sx={{
              p: 1.5,
              textTransform: "none",
              borderRadius: 3,
              bgcolor: "rgb(220 38 38)",
              boxShadow: "0 14px 34px rgba(220,38,38,0.2)",
              "&:hover": {
                bgcolor: "rgb(185 28 28)",
              },
            }}
            onClick={() => {
              logout();
              setOpenProfile(false);
            }}
          >
            ออกจากระบบ
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
