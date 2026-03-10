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
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

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

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "rgb(15 23 42)",
          borderBottom: "1px solid rgb(226 232 240)",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            onClick={onOpenMobile}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              p: 0,
            }}
          >
            <MenuRoundedIcon fontSize="large" />
          </IconButton>

          <Box sx={{ ml: "auto" }}>
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
                    bgcolor: "rgb(148 163 184)",
                    border: "2px solid rgb(226 232 240)"
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
                    bgcolor: "rgb(51 65 85)",
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
            borderLeft: "1px solid rgb(226 232 240)",
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
            }}
          >
            โปรไฟล์
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <IconButton sx={{ p: 0 }} onClick={() => setOpenProfile(false)}>
              <CloseRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: 1.5, py: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src="/images/admin-avatar.jpg"
              alt="Admin User"
              sx={{
                width: 44,
                height: 44,
                bgcolor: "rgb(15 23 42)",
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
                  label="Role: Admin"
                  sx={{
                    height: 24,
                    fontSize: 12,
                    bgcolor: "rgb(241 245 249)",
                    border: "1px solid rgb(226 232 240)",
                  }}
                />
                <Chip
                  size="small"
                  label="Status: Online"
                  sx={{
                    height: 24,
                    fontSize: 12,
                    bgcolor: "rgb(236 253 245)",
                    border: "1px solid rgb(167 243 208)",
                    color: "rgb(6 95 70)",
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Divider />

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
                bgcolor: "rgb(248 250 252)",
                borderColor: "rgb(148 163 184)",
              },
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgb(241 245 249)",
                border: "1px solid rgb(226 232 240)",
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
                bgcolor: "rgb(248 250 252)",
                borderColor: "rgb(148 163 184)",
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
                bgcolor: "rgb(241 245 249)",
                border: "1px solid rgb(226 232 240)",
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

        <Divider />

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
              "&:hover": {
                bgcolor: "rgb(185 28 28)",
              },
            }}
            onClick={() => {
              alert("TODO: logout");
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
