"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Drawer,
  Avatar,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";

type LeadStatus = "new" | "contacted" | "won" | "lost";

type Lead = {
  id: string;
  name: string;
  phone: string;
  channel: "line" | "facebook" | "whatsapp" | "phone";
  status: LeadStatus;
  createdAt: string;
  amountEstimate: number;
  summaryText: string;
  pickupPoint?: string;
  returnPoint?: string;
  pickupDate?: string;
  returnDate?: string;
  carName?: string;
  followUpAt?: string | null;
};

const SEED: Lead[] = [
  {
    id: "LD-2001",
    name: "Pachara",
    phone: "0999999999",
    channel: "line",
    status: "new",
    createdAt: "2026-03-03T10:15:00+07:00",
    amountEstimate: 12800,
    summaryText: "ต้องการเช่า BMW 3 วัน + คืนรถต่างสาขา ขอส่วนลด",
    pickupPoint: "สนามบินดอนเมือง (DMK)",
    returnPoint: "สาขากรุงเทพฯ (รัชดา)",
    pickupDate: "2026-03-05",
    returnDate: "2026-03-08",
    carName: "BMW 330e M Sport",
    followUpAt: null,
  },
  {
    id: "LD-2002",
    name: "Somchai",
    phone: "0888888888",
    channel: "facebook",
    status: "contacted",
    createdAt: "2026-03-02T18:40:00+07:00",
    amountEstimate: 5900,
    summaryText: "ถามเรื่องส่งรถถึงที่ + อยากทราบค่ามัดจำ",
    pickupPoint: "ส่งรถถึงที่ (นัดหมาย)",
    returnPoint: "ส่งรถถึงที่ (นัดหมาย)",
    pickupDate: "2026-03-06",
    returnDate: "2026-03-07",
    carName: "Toyota Yaris",
    followUpAt: "2026-03-04T10:00:00+07:00",
  },
  {
    id: "LD-2003",
    name: "Nok",
    phone: "0777777777",
    channel: "whatsapp",
    status: "won",
    createdAt: "2026-03-01T12:05:00+07:00",
    amountEstimate: 9200,
    summaryText: "ปิดการขายแล้ว นัดรับรถสาขากรุงเทพฯ",
    pickupPoint: "สาขากรุงเทพฯ (รัชดา)",
    returnPoint: "สาขากรุงเทพฯ (รัชดา)",
    pickupDate: "2026-03-04",
    returnDate: "2026-03-06",
    carName: "Honda City",
    followUpAt: null,
  },
  {
    id: "LD-2004",
    name: "Beam",
    phone: "0666666666",
    channel: "phone",
    status: "lost",
    createdAt: "2026-02-28T09:20:00+07:00",
    amountEstimate: 7800,
    summaryText: "ลูกค้าตัดสินใจไปเจ้าอื่น (ราคา)",
    pickupPoint: "สาขาสุพรรณบุรี (ในเมือง)",
    returnPoint: "สาขาสุพรรณบุรี (ในเมือง)",
    pickupDate: "2026-03-02",
    returnDate: "2026-03-04",
    carName: "BMW 320d M Sport",
    followUpAt: null,
  },
];

function formatTHB(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return (
    new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(v) +
    " บาท"
  );
}

function formatDateTimeTH(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function statusMeta(s: LeadStatus) {
  if (s === "new") return { label: "ใหม่", tone: "amber" as const };
  if (s === "contacted") return { label: "ติดต่อแล้ว", tone: "sky" as const };
  if (s === "won") return { label: "ปิดการขาย", tone: "emerald" as const };
  return { label: "ไม่สำเร็จ", tone: "rose" as const };
}

function statusChipSX(tone: ReturnType<typeof statusMeta>["tone"]) {
  if (tone === "amber") {
    return {
      border: "1px solid rgb(253 230 138)",
      bgcolor: "rgb(254 243 199)",
      color: "rgb(146 64 14)",
    };
  }
  if (tone === "sky") {
    return {
      border: "1px solid rgb(186 230 253)",
      bgcolor: "rgb(224 242 254)",
      color: "rgb(3 105 161)",
    };
  }
  if (tone === "emerald") {
    return {
      border: "1px solid rgb(167 243 208)",
      bgcolor: "rgb(209 250 229)",
      color: "rgb(6 95 70)",
    };
  }
  return {
    border: "1px solid rgb(254 202 202)",
    bgcolor: "rgb(254 226 226)",
    color: "rgb(153 27 27)",
  };
}

function channelLabel(c: Lead["channel"]) {
  if (c === "line") return "LINE";
  if (c === "facebook") return "Facebook";
  if (c === "whatsapp") return "WhatsApp";
  return "โทร";
}

function toTelHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function toChatHref(channel: Lead["channel"], lead: Lead) {
  const msg = encodeURIComponent(
    `สนใจจองรถ (Lead ${lead.id})\nชื่อ: ${lead.name}\nโทร: ${lead.phone}\nรถ: ${
      lead.carName ?? "-"
    }\nรับ: ${lead.pickupDate ?? "-"} (${lead.pickupPoint ?? "-"})\nคืน: ${
      lead.returnDate ?? "-"
    } (${lead.returnPoint ?? "-"})\nยอดประมาณ: ${formatTHB(
      lead.amountEstimate
    )}\nรายละเอียด: ${lead.summaryText}`
  );

  if (channel === "line") return `https://line.me/R/msg/text/?${msg}`;
  if (channel === "whatsapp") {
    const p = lead.phone.replace(/\D/g, "");
    return `https://wa.me/${p}?text=${msg}`;
  }
  if (channel === "facebook") return `https://www.facebook.com/messages/`;
  return toTelHref(lead.phone);
}

function buildSummaryText(lead: Lead) {
  return [
    `Lead ${lead.id}`,
    `ชื่อ: ${lead.name}`,
    `โทร: ${lead.phone}`,
    `ช่องทาง: ${channelLabel(lead.channel)}`,
    `สถานะ: ${statusMeta(lead.status).label}`,
    `รถ: ${lead.carName ?? "-"}`,
    `รับ: ${lead.pickupDate ?? "-"} (${lead.pickupPoint ?? "-"})`,
    `คืน: ${lead.returnDate ?? "-"} (${lead.returnPoint ?? "-"})`,
    `ยอดประมาณ: ${formatTHB(lead.amountEstimate)}`,
    `รายละเอียด: ${lead.summaryText}`,
  ].join("\n");
}

function followUpBadge(followUpAt?: string | null) {
  if (!followUpAt) return null;

  const due = new Date(followUpAt);
  const now = new Date();

  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);

  const startTomorrow = new Date(startToday);
  startTomorrow.setDate(startTomorrow.getDate() + 1);

  const startDayAfter = new Date(startTomorrow);
  startDayAfter.setDate(startDayAfter.getDate() + 1);

  if (due.getTime() < now.getTime())
    return { label: "เกินกำหนด", tone: "rose" as const };
  if (due >= startToday && due < startTomorrow)
    return { label: "ติดตามวันนี้", tone: "amber" as const };
  if (due >= startTomorrow && due < startDayAfter)
    return { label: "ติดตามพรุ่งนี้", tone: "sky" as const };
  return { label: "มีนัดติดตาม", tone: "slate" as const };
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box className="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr]">
      <Typography className="text-sm font-medium text-slate-500">
        {label}
      </Typography>
      <Box className="text-sm font-semibold text-slate-900">{value}</Box>
    </Box>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box className="rounded-2xl border border-slate-200 bg-white p-4">
      <Typography className="text-sm font-bold text-slate-900">
        {title}
      </Typography>
      <Divider className="my-3 border-slate-200!" />
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
}

export default function AdminLeadsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rows, setRows] = React.useState<Lead[]>(SEED);

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<LeadStatus | "all">("all");
  const [channel, setChannel] = React.useState<Lead["channel"] | "all">("all");

  const [openId, setOpenId] = React.useState<string | null>(null);
  const selected = React.useMemo(
    () => rows.find((r) => r.id === openId) ?? null,
    [rows, openId]
  );

  const [followUpLocal, setFollowUpLocal] = React.useState("");

  React.useEffect(() => {
    if (!selected?.followUpAt) {
      setFollowUpLocal("");
      return;
    }
    const d = new Date(selected.followUpAt);
    const pad = (n: number) => String(n).padStart(2, "0");
    setFollowUpLocal(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}`
    );
  }, [selected?.id, selected?.followUpAt]);

  const [snack, setSnack] = React.useState<{
    open: boolean;
    msg: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    msg: "",
    type: "success",
  });

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows
      .filter((r) => (status === "all" ? true : r.status === status))
      .filter((r) => (channel === "all" ? true : r.channel === channel))
      .filter((r) => {
        if (!qq) return true;
        return (
          r.id.toLowerCase().includes(qq) ||
          r.name.toLowerCase().includes(qq) ||
          r.phone.toLowerCase().includes(qq) ||
          r.summaryText.toLowerCase().includes(qq) ||
          (r.carName ?? "").toLowerCase().includes(qq)
        );
      })
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [rows, q, status, channel]);

  const kpi = React.useMemo(() => {
    const total = rows.length;
    const newCount = rows.filter((r) => r.status === "new").length;
    const contacted = rows.filter((r) => r.status === "contacted").length;
    const won = rows.filter((r) => r.status === "won").length;
    const lost = rows.filter((r) => r.status === "lost").length;
    return { total, newCount, contacted, won, lost };
  }, [rows]);

  const roundedFieldSX = {
    "& .MuiOutlinedInput-root": { borderRadius: "14px" },
  };

  function updateStatus(id: string, s: LeadStatus) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: s } : r)));
  }

  function updateLead(id: string, patch: Partial<Lead>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function copySummary(lead: Lead) {
    try {
      await navigator.clipboard.writeText(buildSummaryText(lead));
      setSnack({ open: true, msg: "คัดลอกข้อความสรุปแล้ว", type: "success" });
    } catch {
      setSnack({
        open: true,
        msg: "คัดลอกไม่สำเร็จ (เบราว์เซอร์บล็อก clipboard)",
        type: "error",
      });
    }
  }

  function saveFollowUpFromInput() {
    if (!selected) return;

    if (!followUpLocal) {
      updateLead(selected.id, { followUpAt: null });
      setSnack({ open: true, msg: "ล้างเวลาติดตามแล้ว", type: "info" });
      return;
    }

    const d = new Date(followUpLocal);
    if (Number.isNaN(d.getTime())) {
      setSnack({ open: true, msg: "รูปแบบเวลาไม่ถูกต้อง", type: "error" });
      return;
    }

    updateLead(selected.id, { followUpAt: d.toISOString() });
    setSnack({ open: true, msg: "บันทึกเวลาติดตามแล้ว", type: "success" });
  }

  function setFollowUpNowPlus(minutes: number) {
    if (!selected) return;
    const d = new Date();
    d.setMinutes(d.getMinutes() + minutes);
    updateLead(selected.id, { followUpAt: d.toISOString() });
    setSnack({ open: true, msg: "ตั้งเวลาติดตามแล้ว", type: "success" });
  }

  function setFollowUpTomorrow10() {
    if (!selected) return;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(10, 0, 0, 0);
    updateLead(selected.id, { followUpAt: d.toISOString() });
    setSnack({
      open: true,
      msg: "ตั้งเวลาติดตาม (พรุ่งนี้ 10:00) แล้ว",
      type: "success",
    });
  }

  function clearFollowUp() {
    if (!selected) return;
    updateLead(selected.id, { followUpAt: null });
    setSnack({ open: true, msg: "ล้างเวลาติดตามแล้ว", type: "info" });
  }

  return (
    <Box className="grid gap-4">
      <Box>
        <Typography
          variant="h6"
          className="text-xl font-extrabold text-slate-900"
        >
          จองผ่านแชท
        </Typography>
        <Typography className="text-sm text-slate-600">
          รวมลูกค้าที่ทักเข้ามา และติดตามสถานะการปิดการขายแบบรวดเร็ว
        </Typography>
      </Box>

      <Card
        elevation={0}
        className="rounded-2xl! border border-slate-200 bg-white"
      >
        <CardContent className="p-5">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            className="items-start sm:items-center justify-between"
          >
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                <ForumRoundedIcon fontSize="small" />
              </Box>

              <Box>
                <Typography className="text-sm font-bold text-slate-900">
                  สรุป Leads
                </Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  ทั้งหมด {kpi.total} • ใหม่ {kpi.newCount} • ติดตาม{" "}
                  {kpi.contacted} • ปิด {kpi.won} • ไม่สำเร็จ {kpi.lost}
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                bgcolor: "rgb(15 23 42)",
                boxShadow: "none",
                "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                borderRadius: 2,
              }}
              onClick={() =>
                setSnack({
                  open: true,
                  msg: "พร้อมต่อ API เพื่อดึง Lead จริง",
                  type: "info",
                })
              }
            >
              จัดการ Leads
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Box className="grid gap-4 sm:grid-cols-5">
        {[
          { label: "ทั้งหมด", value: kpi.total, tone: "slate" as const },
          { label: "ใหม่", value: kpi.newCount, tone: "amber" as const },
          { label: "ติดต่อแล้ว", value: kpi.contacted, tone: "sky" as const },
          { label: "ปิดการขาย", value: kpi.won, tone: "emerald" as const },
          { label: "ไม่สำเร็จ", value: kpi.lost, tone: "rose" as const },
        ].map((x) => (
          <Card
            key={x.label}
            elevation={0}
            className={`rounded-2xl! border ${
              x.tone === "slate"
                ? "border-slate-200 bg-white"
                : x.tone === "amber"
                ? "border-amber-200 bg-amber-50"
                : x.tone === "sky"
                ? "border-sky-200 bg-sky-50"
                : x.tone === "emerald"
                ? "border-emerald-200 bg-emerald-50"
                : "border-rose-200 bg-rose-50"
            }`}
          >
            <CardContent className="p-4">
              <Typography
                className={`text-xs ${
                  x.tone === "slate"
                    ? "text-slate-500"
                    : x.tone === "amber"
                    ? "text-amber-700"
                    : x.tone === "sky"
                    ? "text-sky-700"
                    : x.tone === "emerald"
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                {x.label}
              </Typography>
              <Typography
                className={`mt-1 text-2xl font-black ${
                  x.tone === "slate"
                    ? "text-slate-900"
                    : x.tone === "amber"
                    ? "text-amber-900"
                    : x.tone === "sky"
                    ? "text-sky-900"
                    : x.tone === "emerald"
                    ? "text-emerald-900"
                    : "text-rose-900"
                }`}
              >
                {x.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card
        elevation={0}
        className="rounded-2xl! border border-slate-200 bg-white"
      >
        <CardContent className="p-5">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            className="items-stretch md:items-center"
          >
            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหา Lead ID / ชื่อ / โทร / รถ / note..."
              fullWidth
              size="small"
              sx={roundedFieldSX}
              InputProps={{
                startAdornment: (
                  <Box className="mr-2 text-slate-500">
                    <SearchRoundedIcon fontSize="small" />
                  </Box>
                ),
              }}
            />

            <TextField
              select
              label="สถานะ"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus | "all")}
              size="small"
              sx={roundedFieldSX}
              className="min-w-40"
              InputProps={{
                startAdornment: (
                  <Box className="mr-2 text-slate-500">
                    <FilterAltRoundedIcon fontSize="small" />
                  </Box>
                ),
              }}
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="new">ใหม่</MenuItem>
              <MenuItem value="contacted">ติดต่อแล้ว</MenuItem>
              <MenuItem value="won">ปิดการขาย</MenuItem>
              <MenuItem value="lost">ไม่สำเร็จ</MenuItem>
            </TextField>

            <TextField
              select
              label="ช่องทาง"
              value={channel}
              onChange={(e) =>
                setChannel(e.target.value as Lead["channel"] | "all")
              }
              size="small"
              sx={roundedFieldSX}
              className="min-w-40"
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="line">LINE</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
              <MenuItem value="whatsapp">WhatsApp</MenuItem>
              <MenuItem value="phone">โทร</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <Card
        elevation={0}
        className="rounded-2xl! border border-slate-200 bg-white"
      >
        <CardContent className="p-0">
          <Box className="px-5 py-4 flex items-center justify-between">
            <Typography className="text-sm font-bold text-slate-900">
              Leads List
            </Typography>
            <Typography className="text-xs text-slate-500">
              {filtered.length} รายการ
            </Typography>
          </Box>
          <Divider className="border-slate-200!" />

          <Box className="divide-y divide-slate-200">
            {filtered.map((r) => {
              const sm = statusMeta(r.status);
              const fu = followUpBadge(r.followUpAt);

              return (
                <Box
                  key={r.id}
                  className="px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={2}
                    className="items-start lg:items-center justify-between"
                  >
                    <Box className="min-w-0">
                      <Stack
                        direction="row"
                        spacing={1}
                        className="items-center flex-wrap"
                      >
                        <Typography className="text-sm font-black text-slate-900">
                          {r.id}
                        </Typography>

                        <Chip
                          size="small"
                          label={sm.label}
                          sx={{
                            ...statusChipSX(sm.tone),
                            height: 22,
                            fontSize: 11,
                            fontWeight: 800,
                          }}
                        />

                        <Chip
                          size="small"
                          label={channelLabel(r.channel)}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={formatTHB(r.amountEstimate)}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={formatDateTimeTH(r.createdAt)}
                          variant="outlined"
                          sx={{ color: "rgb(100 116 139)" }}
                        />

                        {fu ? (
                          <Chip
                            size="small"
                            icon={<AccessTimeRoundedIcon fontSize="small" />}
                            label={fu.label}
                            variant="outlined"
                            sx={{
                              height: 22,
                              fontSize: 11,
                              fontWeight: 800,
                              ...(fu.tone === "slate"
                                ? {
                                    border: "1px solid rgb(226 232 240)",
                                    bgcolor: "rgb(248 250 252)",
                                    color: "rgb(51 65 85)",
                                  }
                                : statusChipSX(
                                    fu.tone === "amber"
                                      ? "amber"
                                      : fu.tone === "sky"
                                      ? "sky"
                                      : "rose"
                                  )),
                            }}
                          />
                        ) : null}
                      </Stack>

                      <Typography className="mt-1 text-sm font-semibold text-slate-800">
                        {r.name} • {r.phone} • {r.carName ?? "-"}
                      </Typography>
                      <Typography className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {r.summaryText}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      className="items-center flex-wrap"
                    >
                      <Tooltip title="โทร">
                        <IconButton component="a" href={toTelHref(r.phone)}>
                          <CallRoundedIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="เปิดแชท">
                        <IconButton
                          component="a"
                          href={toChatHref(r.channel, r)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ChatRoundedIcon />
                        </IconButton>
                      </Tooltip>

                      <TextField
                        select
                        size="small"
                        value={r.status}
                        onChange={(e) =>
                          updateStatus(r.id, e.target.value as LeadStatus)
                        }
                        sx={{
                          ...roundedFieldSX,
                          minWidth: 160,
                          "& .MuiInputBase-root": {
                            backgroundColor: "rgb(248 250 252)",
                          },
                        }}
                      >
                        <MenuItem value="new">ใหม่</MenuItem>
                        <MenuItem value="contacted">ติดต่อแล้ว</MenuItem>
                        <MenuItem value="won">ปิดการขาย</MenuItem>
                        <MenuItem value="lost">ไม่สำเร็จ</MenuItem>
                      </TextField>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setOpenId(r.id)}
                        endIcon={<OpenInNewRoundedIcon />}
                        sx={{
                          textTransform: "none",
                          bgcolor: "rgb(15 23 42)",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "rgb(2 6 23)",
                            boxShadow: "none",
                          },
                          borderRadius: 2,
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}

            {filtered.length === 0 ? (
              <Box className="px-5 py-10 text-center">
                <Typography className="text-sm font-semibold text-slate-900">
                  ไม่พบข้อมูล
                </Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  ลองปรับตัวกรอง หรือค้นหาใหม่
                </Typography>
              </Box>
            ) : null}
          </Box>
        </CardContent>
      </Card>

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={!!openId}
        onClose={() => setOpenId(null)}
        PaperProps={{
          sx: {
            width: isMobile ? "100%" : 700,
            height: isMobile ? "80%" : "100%",
          },
        }}
      >
        <Box className="p-4">
          <Stack
            direction="row"
            spacing={1.25}
            className="items-center justify-between"
          >
            <Stack
              direction="row"
              spacing={1.25}
              className="items-center min-w-0"
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: "rgb(248 250 252)",
                  border: "1px solid rgb(226 232 240)",
                  color: "rgb(15 23 42)",
                }}
              >
                <PersonRoundedIcon />
              </Avatar>

              <Box className="min-w-0">
                <Typography className="text-sm font-black text-slate-900">
                  {selected?.name ?? "-"}
                </Typography>
                <Typography className="text-xs text-slate-500">
                  {selected?.id ?? "-"} • {selected?.phone ?? "-"}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} className="items-center">
              {selected ? (
                <Chip
                  size="small"
                  label={statusMeta(selected.status).label}
                  sx={{
                    ...statusChipSX(statusMeta(selected.status).tone),
                    height: 24,
                    fontSize: 11,
                    fontWeight: 900,
                  }}
                />
              ) : null}

              <IconButton onClick={() => setOpenId(null)}>
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Divider className="my-4! border-slate-200!" />

          {selected ? (
            <Stack spacing={2}>
              <Box className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Box
                  className="relative bg-linear-to-br from-slate-900 to-slate-700"
                  sx={{ minHeight: 220 }}
                >
                  <Box className="grid h-55 w-full place-items-center text-slate-300">
                    <ForumRoundedIcon sx={{ fontSize: 56 }} />
                  </Box>

                  <Box
                    className="absolute inset-0"
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(15,23,42,0.82), rgba(15,23,42,0.18))",
                    }}
                  />

                  <Box className="absolute inset-x-0 top-0 p-4 text-white">
                    <Typography className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                      Lead Overview
                    </Typography>
                    <Typography className="mt-2 text-xl font-extrabold">
                      {selected.carName ?? "ยังไม่ได้ระบุรถ"}
                    </Typography>
                    <Typography className="mt-2 text-sm text-slate-200">
                      {selected.pickupDate ?? "-"} ถึง{" "}
                      {selected.returnDate ?? "-"}
                    </Typography>
                    <Typography className="mt-4 text-sm text-slate-300">
                      ยอดประมาณ
                    </Typography>
                    <Typography className="text-2xl font-extrabold">
                      {formatTHB(selected.amountEstimate)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <SectionCard title="Quick actions">
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<MarkEmailReadRoundedIcon />}
                    onClick={() => updateStatus(selected.id, "contacted")}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      borderRadius: 2.5,
                      borderColor: "rgb(226 232 240)",
                    }}
                  >
                    ติดตามแล้ว
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<CheckCircleRoundedIcon />}
                    onClick={() => updateStatus(selected.id, "won")}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      bgcolor: "rgb(15 23 42)",
                      boxShadow: "none",
                      borderRadius: 2.5,
                      "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                    }}
                  >
                    ปิดการขาย
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<CloseRoundedIcon />}
                    onClick={() => updateStatus(selected.id, "lost")}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      borderRadius: 2.5,
                      borderColor: "rgb(226 232 240)",
                    }}
                  >
                    ไม่สำเร็จ
                  </Button>
                </Stack>
              </SectionCard>

              <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <SectionCard title="ข้อมูลลูกค้า">
                  <InfoRow label="ชื่อ" value={selected.name} />
                  <InfoRow label="เบอร์โทร" value={selected.phone} />
                  <InfoRow
                    label="ช่องทาง"
                    value={channelLabel(selected.channel)}
                  />
                  <InfoRow
                    label="สถานะ"
                    value={
                      <Chip
                        size="small"
                        label={statusMeta(selected.status).label}
                        sx={statusChipSX(statusMeta(selected.status).tone)}
                      />
                    }
                  />
                </SectionCard>

                <SectionCard title="ข้อมูลการจอง">
                  <InfoRow label="รถ" value={selected.carName ?? "-"} />
                  <InfoRow
                    label="วันรับรถ"
                    value={selected.pickupDate ?? "-"}
                  />
                  <InfoRow
                    label="วันคืนรถ"
                    value={selected.returnDate ?? "-"}
                  />
                  <InfoRow
                    label="ยอดประมาณ"
                    value={formatTHB(selected.amountEstimate)}
                  />
                </SectionCard>

                <SectionCard title="สถานที่">
                  <InfoRow
                    label="จุดรับรถ"
                    value={selected.pickupPoint ?? "-"}
                  />
                  <InfoRow
                    label="จุดคืนรถ"
                    value={selected.returnPoint ?? "-"}
                  />
                  <InfoRow
                    label="สร้างเมื่อ"
                    value={formatDateTimeTH(selected.createdAt)}
                  />
                </SectionCard>

                <SectionCard title="สรุป lead">
                  <Stack spacing={2}>
                    <Box>
                      <Stack
                        direction="row"
                        className="items-center justify-between"
                      >
                        <Typography className="text-xs text-slate-500">
                          ข้อความสรุป
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ContentCopyRoundedIcon />}
                          onClick={() => copySummary(selected)}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            borderColor: "rgb(226 232 240)",
                          }}
                        >
                          คัดลอก
                        </Button>
                      </Stack>

                      <Typography className="mt-2 text-sm whitespace-pre-line text-slate-900">
                        {buildSummaryText(selected)}
                      </Typography>
                    </Box>
                  </Stack>
                </SectionCard>
              </Box>

              <SectionCard title="ตั้งเวลาติดตาม (Follow-up)">
                <Typography className="text-xs text-slate-500 flex items-center gap-1">
                  <ScheduleRoundedIcon fontSize="inherit" />
                  ตั้งวันและเวลาที่ต้องติดตามลูกค้ารายนี้
                </Typography>

                <TextField
                  type="datetime-local"
                  size="small"
                  value={followUpLocal}
                  onChange={(e) => setFollowUpLocal(e.target.value)}
                  sx={{ ...roundedFieldSX }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />

                <Stack direction="row" spacing={1} className="flex-wrap">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={saveFollowUpFromInput}
                    sx={{
                      textTransform: "none",
                      bgcolor: "rgb(15 23 42)",
                      boxShadow: "none",
                      borderRadius: 2,
                      "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                    }}
                  >
                    บันทึก
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setFollowUpNowPlus(60)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      borderColor: "rgb(226 232 240)",
                    }}
                  >
                    +1 ชม
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={setFollowUpTomorrow10}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      borderColor: "rgb(226 232 240)",
                    }}
                  >
                    พรุ่งนี้ 10:00
                  </Button>

                  <Button
                    size="small"
                    variant="text"
                    onClick={clearFollowUp}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      color: "rgb(100 116 139)",
                    }}
                  >
                    ล้าง
                  </Button>
                </Stack>
              </SectionCard>

              <SectionCard title="ติดต่อกลับ">
                <Stack spacing={1}>
                  <Button
                    component="a"
                    href={toChatHref(selected.channel, selected)}
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    startIcon={<ChatRoundedIcon />}
                    sx={{
                      textTransform: "none",
                      bgcolor: "rgb(15 23 42)",
                      boxShadow: "none",
                      borderRadius: 2.5,
                      "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                    }}
                  >
                    เปิดแชทพร้อมข้อความสรุป
                  </Button>

                  <Button
                    component="a"
                    href={toTelHref(selected.phone)}
                    variant="outlined"
                    startIcon={<CallRoundedIcon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2.5,
                      borderColor: "rgb(226 232 240)",
                    }}
                  >
                    โทรหาลูกค้า
                  </Button>
                </Stack>
              </SectionCard>
            </Stack>
          ) : null}
        </Box>
      </Drawer>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: 24 }}
      >
        <Alert
          severity={snack.type}
          variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: 3 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
