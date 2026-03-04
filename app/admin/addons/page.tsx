"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Switch,
  IconButton,
  Button,
  Stack,
  TextField,
  MenuItem,
  Chip,
  Tooltip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

type PricingType = "perDay" | "perTrip";

type Addon = {
  id: string;
  title: string;
  price: number;
  pricingType: PricingType;
  inventoryTrack: boolean;
  stock: number | null;
  active: boolean;
};

function pricingLabel(t: PricingType) {
  return t === "perDay" ? "ต่อวัน" : "ต่อครั้ง";
}

function formatTHB(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(v) + " บาท";
}

export default function AdminAddonsPage() {
  const [addons, setAddons] = React.useState<Addon[]>([
    {
      id: "A1",
      title: "คาร์ซีทเด็ก",
      price: 150,
      pricingType: "perDay",
      inventoryTrack: true,
      stock: 5,
      active: true,
    },
    {
      id: "A2",
      title: "คืนต่างสาขา",
      price: 500,
      pricingType: "perTrip",
      inventoryTrack: false,
      stock: null,
      active: true,
    },
  ]);

  function updateAddon(id: string, patch: Partial<Addon>) {
    setAddons((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function removeAddon(id: string) {
    setAddons((prev) => prev.filter((a) => a.id !== id));
  }

  function addAddon() {
    const nextId = `A${addons.length + 1}`;
    setAddons((prev) => [
      {
        id: nextId,
        title: "บริการใหม่",
        price: 0,
        pricingType: "perDay",
        inventoryTrack: false,
        stock: null,
        active: true,
      },
      ...prev,
    ]);
  }

  const activeCount = addons.filter((a) => a.active).length;

  const roundedFieldSX = {
    "& .MuiOutlinedInput-root": { borderRadius: "14px" },
  };

  return (
    <Box className="grid gap-4">
      {/* ✅ Header = เหมือน Support */}
      <Box>
        <Typography variant="h6" className="text-xl font-extrabold text-slate-900">
          บริการเสริม
        </Typography>
        <Typography className="text-sm text-slate-600">
          ตั้งราคา • เลือกว่าจะตัดสต็อกหรือไม่ • เปิด/ปิดการใช้งานแต่ละรายการ
        </Typography>
      </Box>

      {/* ✅ Summary Card = เหมือน Support */}
      <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
        <CardContent className="p-5">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            className="items-start sm:items-center justify-between"
          >
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                <ExtensionRoundedIcon fontSize="small" />
              </Box>

              <Box>
                <Typography className="text-sm font-bold text-slate-900">
                  ทั้งหมด {addons.length} รายการ • เปิดใช้งาน {activeCount} รายการ
                </Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  แนะนำ: เปิด “ตัดสต็อก” เฉพาะบริการที่มีจำนวนจำกัด เช่น คาร์ซีทเด็ก
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={addAddon}
                variant="contained"
                size="small"
                startIcon={<AddRoundedIcon />}
                sx={{
                  textTransform: "none",
                  bgcolor: "rgb(15 23 42)",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                  borderRadius: 2,
                }}
              >
                เพิ่มบริการเสริม
              </Button>

              <Button
                component={Link}
                href="/admin/settings"
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderColor: "rgb(226 232 240)",
                }}
              >
                ตั้งค่า
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* ✅ List Card = โทนเดียวกัน + row hover */}
      <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
        <CardContent className="p-0">
          {/* header row */}
          <Box className="px-5 py-4 flex items-center justify-between">
            <Typography className="text-sm font-bold text-slate-900">
              รายการบริการเสริม
            </Typography>
            <Typography className="text-xs text-slate-500">
              {addons.length} รายการ
            </Typography>
          </Box>

          <Divider className="border-slate-200!" />

          {addons.map((a, idx) => {
            const isTrack = a.inventoryTrack;
            const isActive = a.active;

            return (
              <Box key={a.id} className="hover:bg-slate-50 transition-colors">
                <Box className="p-5 grid gap-4 md:grid-cols-12 items-start">
                  {/* Left: Title + meta */}
                  <Box className="md:col-span-4">
                    <Stack direction="row" spacing={1} className="items-center flex-wrap">
                      <Typography className="text-sm font-bold text-slate-900">
                        {a.title}
                      </Typography>

                      <Chip
                        size="small"
                        label={isActive ? "Active" : "Inactive"}
                        sx={{
                          height: 22,
                          fontSize: 11,
                          bgcolor: isActive ? "rgb(226 232 240)" : "rgb(241 245 249)",
                          border: "1px solid rgb(226 232 240)",
                          color: "rgb(30 41 59)",
                          fontWeight: 800,
                        }}
                      />

                      <Chip
                        size="small"
                        label={formatTHB(a.price)}
                        variant="outlined"
                        sx={{ height: 22, fontSize: 11 }}
                      />
                    </Stack>

                    <Typography className="text-xs text-slate-500 mt-1">
                      ID: {a.id} • คิดราคาแบบ {pricingLabel(a.pricingType)}
                      {isTrack ? " • ตัดสต็อก" : " • ไม่ตัดสต็อก"}
                    </Typography>
                  </Box>

                  {/* Fields */}
                  <Box className="md:col-span-3">
                    <TextField
                      label="ชื่อบริการ"
                      value={a.title}
                      onChange={(e) => updateAddon(a.id, { title: e.target.value })}
                      size="small"
                      fullWidth
                      sx={roundedFieldSX}
                    />
                  </Box>

                  <Box className="md:col-span-2">
                    <TextField
                      label="ราคา"
                      type="number"
                      value={a.price}
                      onChange={(e) => updateAddon(a.id, { price: Number(e.target.value) })}
                      size="small"
                      fullWidth
                      sx={roundedFieldSX}
                      inputProps={{ min: 0 }}
                    />
                  </Box>

                  <Box className="md:col-span-2">
                    <TextField
                      select
                      label="คิดราคาแบบ"
                      value={a.pricingType}
                      onChange={(e) =>
                        updateAddon(a.id, { pricingType: e.target.value as PricingType })
                      }
                      size="small"
                      fullWidth
                      sx={roundedFieldSX}
                    >
                      <MenuItem value="perDay">ต่อวัน</MenuItem>
                      <MenuItem value="perTrip">ต่อครั้ง</MenuItem>
                    </TextField>
                  </Box>

                  {/* Actions */}
                  <Box className="md:col-span-1">
                    <Stack direction="row" spacing={0.5} className="justify-end items-center">
                      <Tooltip title={isActive ? "ปิดการใช้งาน" : "เปิดการใช้งาน"}>
                        <Box className="flex items-center">
                          <Switch
                            checked={isActive}
                            onChange={(e) => updateAddon(a.id, { active: e.target.checked })}
                            size="small"
                          />
                        </Box>
                      </Tooltip>

                      <Tooltip title="ลบรายการ">
                        <IconButton
                          color="error"
                          onClick={() => removeAddon(a.id)}
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  {/* Inventory section */}
                  <Box className="md:col-span-12">
                    <Divider className="border-slate-200!" />

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      className="items-start sm:items-center justify-between mt-4"
                    >
                      <Stack direction="row" spacing={1} className="items-center flex-wrap">
                        <Typography className="text-sm font-semibold text-slate-900">
                          ตัดสต็อก (Inventory Track)
                        </Typography>

                        <Switch
                          checked={isTrack}
                          onChange={(e) =>
                            updateAddon(a.id, {
                              inventoryTrack: e.target.checked,
                              stock: e.target.checked ? a.stock ?? 0 : null,
                            })
                          }
                          size="small"
                        />

                        {!isTrack ? (
                          <Chip size="small" label="ไม่ตัดสต็อก" variant="outlined" />
                        ) : (
                          <Chip size="small" label="ตัดสต็อก" variant="outlined" />
                        )}
                      </Stack>

                      {isTrack ? (
                        <TextField
                          label="Stock"
                          type="number"
                          value={a.stock ?? 0}
                          onChange={(e) => updateAddon(a.id, { stock: Number(e.target.value) })}
                          size="small"
                          sx={{ width: { xs: "100%", sm: 240 }, ...roundedFieldSX }}
                          inputProps={{ min: 0 }}
                        />
                      ) : (
                        <Typography className="text-xs text-slate-500">
                          เมื่อปิดตัดสต็อก ระบบจะไม่เช็คจำนวนคงเหลือสำหรับบริการนี้
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>

                {idx !== addons.length - 1 && <Divider className="border-slate-200!" />}
              </Box>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
}