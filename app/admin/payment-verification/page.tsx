"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Stack,
  Drawer,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Switch,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";

import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";

type Status = "pending" | "approved" | "rejected";
type DrawerMode = "detail" | "status" | null;

type ExpectedBankAccount = {
  bankName: string;
  accountName: string;
  accountNo: string;
};

type SlipBankAccount = {
  bankName?: string;
  accountName?: string;
  accountNo?: string;
};

type Row = {
  id: string;
  bookingId: string;
  customer: string;
  bookingAmount: number;
  paidAmount: number;
  status: Status;
  slipUrl?: string;
  paidAt?: string;
  referenceNo?: string;
  bankName?: string;
  note?: string;
  reviewerNote?: string;
  expectedAccount: ExpectedBankAccount;
  slipAccount?: SlipBankAccount;
};

function formatTHB(n: number) {
  return (
    new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n) +
    " บาท"
  );
}

function statusLabel(s: Status) {
  if (s === "approved") return "อนุมัติแล้ว";
  if (s === "rejected") return "ไม่ผ่าน";
  return "รอตรวจ";
}

function statusChipSX(s: Status) {
  if (s === "approved") {
    return {
      border: "1px solid rgb(167 243 208)",
      bgcolor: "rgb(209 250 229)",
      color: "rgb(6 95 70)",
    };
  }
  if (s === "rejected") {
    return {
      border: "1px solid rgb(254 202 202)",
      bgcolor: "rgb(254 226 226)",
      color: "rgb(153 27 27)",
    };
  }
  return {
    border: "1px solid rgb(253 230 138)",
    bgcolor: "rgb(254 243 199)",
    color: "rgb(146 64 14)",
  };
}

function compareAccount(expected: ExpectedBankAccount, slip?: SlipBankAccount) {
  if (!slip) {
    return {
      matched: false,
      bankMatched: false,
      accountNameMatched: false,
      accountNoMatched: false,
    };
  }

  const normalize = (s?: string) => (s ?? "").trim().toLowerCase();

  const bankMatched = normalize(expected.bankName) === normalize(slip.bankName);
  const accountNameMatched =
    normalize(expected.accountName) === normalize(slip.accountName);
  const accountNoMatched =
    normalize(expected.accountNo) === normalize(slip.accountNo);

  return {
    matched: bankMatched && accountNameMatched && accountNoMatched,
    bankMatched,
    accountNameMatched,
    accountNoMatched,
  };
}

function MatchChip({
  ok,
  okLabel = "ตรงกัน",
  badLabel = "ไม่ตรงกัน",
}: {
  ok: boolean;
  okLabel?: string;
  badLabel?: string;
}) {
  return (
    <Chip
      size="small"
      label={ok ? okLabel : badLabel}
      sx={
        ok
          ? {
              border: "1px solid rgb(167 243 208)",
              bgcolor: "rgb(209 250 229)",
              color: "rgb(6 95 70)",
              fontWeight: 800,
            }
          : {
              border: "1px solid rgb(254 202 202)",
              bgcolor: "rgb(254 226 226)",
              color: "rgb(153 27 27)",
              fontWeight: 800,
            }
      }
    />
  );
}

function StatusChip({ s }: { s: Status }) {
  return (
    <Chip
      size="small"
      icon={
        s === "approved" ? (
          <CheckCircleRoundedIcon fontSize="small" />
        ) : s === "rejected" ? (
          <CancelRoundedIcon fontSize="small" />
        ) : (
          <HourglassTopRoundedIcon fontSize="small" />
        )
      }
      label={statusLabel(s)}
      variant="outlined"
      sx={{
        ...statusChipSX(s),
        height: 22,
        fontSize: 11,
        fontWeight: 900,
      }}
    />
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr]">
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
      <Typography className="text-sm font-extrabold text-slate-900">
        {title}
      </Typography>
      <Divider className="my-3 border-slate-200!" />
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
}

export default function PaymentVerificationPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rows, setRows] = React.useState<Row[]>([
    {
      id: "1",
      bookingId: "BK-1004",
      customer: "Pachara",
      bookingAmount: 1590,
      paidAmount: 1590,
      status: "pending",
      paidAt: "2026-03-04 13:25",
      referenceNo: "TRX-998871",
      bankName: "SCB",
      note: "ลูกค้าแนบสลิปผ่านหน้าเว็บ",
      reviewerNote: "",
      slipUrl: "/cosySec1.webp",
      expectedAccount: {
        bankName: "SCB",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "123-4-56789-0",
      },
      slipAccount: {
        bankName: "SCB",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "123-4-56789-0",
      },
    },
    {
      id: "2",
      bookingId: "BK-1006",
      customer: "Somchai",
      bookingAmount: 2980,
      paidAmount: 2980,
      status: "approved",
      paidAt: "2026-03-05 09:10",
      referenceNo: "TRX-998872",
      bankName: "KBank",
      note: "ตรวจสอบยอดตรงแล้ว",
      reviewerNote: "ยอดตรงกับรายการจอง",
      slipUrl: "/cosySec1.webp",
      expectedAccount: {
        bankName: "KBank",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "222-3-45678-9",
      },
      slipAccount: {
        bankName: "KBank",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "222-3-45678-9",
      },
    },
    {
      id: "3",
      bookingId: "BK-1007",
      customer: "Nok",
      bookingAmount: 2190,
      paidAmount: 2000,
      status: "rejected",
      paidAt: "2026-03-06 18:42",
      referenceNo: "TRX-998873",
      bankName: "BBL",
      note: "ยอดไม่ตรงกับใบจอง",
      reviewerNote: "ยอดโอนต่ำกว่ายอดที่ต้องชำระ",
      slipUrl: "/cosySec1.webp",
      expectedAccount: {
        bankName: "SCB",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "123-4-56789-0",
      },
      slipAccount: {
        bankName: "BBL",
        accountName: "ชื่อบัญชีอื่น",
        accountNo: "999-9-99999-9",
      },
    },
  ]);

  const [drawerMode, setDrawerMode] = React.useState<DrawerMode>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);
  const [nextStatus, setNextStatus] = React.useState<Status>("pending");
  const [pendingOnly, setPendingOnly] = React.useState(false);
  const [reviewerNoteInput, setReviewerNoteInput] = React.useState("");
  const [zoomOpen, setZoomOpen] = React.useState(false);

  const [snack, setSnack] = React.useState<{
    open: boolean;
    msg: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    msg: "",
    type: "success",
  });

  const selectedRow = React.useMemo(
    () => rows.find((r) => r.id === selectedRowId) ?? null,
    [rows, selectedRowId]
  );

  const filteredRows = React.useMemo(() => {
    if (pendingOnly) return rows.filter((r) => r.status === "pending");
    return rows;
  }, [rows, pendingOnly]);

  function updateStatus(id: string, status: Status, reviewerNote?: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              reviewerNote:
                reviewerNote !== undefined ? reviewerNote : r.reviewerNote,
            }
          : r
      )
    );
  }

  const kpi = React.useMemo(() => {
    const total = rows.length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const approved = rows.filter((r) => r.status === "approved").length;
    const rejected = rows.filter((r) => r.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [rows]);

  const amountDelta = React.useMemo(() => {
    if (!selectedRow) return 0;
    return selectedRow.paidAmount - selectedRow.bookingAmount;
  }, [selectedRow]);

  const amountMatched = amountDelta === 0;

  const accountCompare = React.useMemo(() => {
    if (!selectedRow) {
      return {
        matched: false,
        bankMatched: false,
        accountNameMatched: false,
        accountNoMatched: false,
      };
    }
    return compareAccount(selectedRow.expectedAccount, selectedRow.slipAccount);
  }, [selectedRow]);

  const openDetailDrawer = (row: Row) => {
    setSelectedRowId(row.id);
    setReviewerNoteInput(row.reviewerNote ?? "");
    setDrawerMode("detail");
  };

  const openStatusDrawer = (row: Row) => {
    setSelectedRowId(row.id);
    setNextStatus(row.status);
    setReviewerNoteInput(row.reviewerNote ?? "");
    setDrawerMode("status");
  };

  const closeDrawer = () => {
    setDrawerMode(null);
  };

  const handleDrawerExited = () => {
    setSelectedRowId(null);
    setNextStatus("pending");
    setReviewerNoteInput("");
  };

  const saveVerificationStatus = () => {
    if (!selectedRow) return;

    if (nextStatus === "approved" && !amountMatched) {
      setSnack({
        open: true,
        msg: "ยอดที่โอนไม่ตรงกับยอดที่ต้องชำระ กรุณาตรวจสอบก่อนอนุมัติ",
        type: "error",
      });
      return;
    }

    if (nextStatus === "approved" && !accountCompare.matched) {
      setSnack({
        open: true,
        msg: "บัญชีปลายทางจากสลิปไม่ตรงกับบัญชีรับเงินของระบบ กรุณาตรวจสอบก่อนอนุมัติ",
        type: "error",
      });
      return;
    }

    if (nextStatus === "rejected" && !reviewerNoteInput.trim()) {
      setSnack({
        open: true,
        msg: "กรุณากรอกหมายเหตุผู้ตรวจสอบเมื่อเลือกสถานะไม่ผ่าน",
        type: "error",
      });
      return;
    }

    updateStatus(selectedRow.id, nextStatus, reviewerNoteInput.trim());
    setDrawerMode(null);
    setSnack({
      open: true,
      msg: `อัปเดตสถานะเป็น "${statusLabel(nextStatus)}" เรียบร้อย`,
      type: "success",
    });
  };

  const quickActions: Array<{
    label: string;
    status: Status;
    variant: "contained" | "outlined";
    icon: React.ReactNode;
    sx: object;
  }> = [
    {
      label: "อนุมัติ",
      status: "approved",
      variant: "contained",
      icon: <CheckCircleRoundedIcon />,
      sx: {
        bgcolor: "rgb(22 163 74)",
        boxShadow: "none",
        "&:hover": { bgcolor: "rgb(21 128 61)", boxShadow: "none" },
      },
    },
    {
      label: "รอตรวจ",
      status: "pending",
      variant: "outlined",
      icon: <HourglassTopRoundedIcon />,
      sx: {
        borderColor: "rgb(253 224 71)",
        color: "rgb(146 64 14)",
        "&:hover": {
          borderColor: "rgb(234 179 8)",
          bgcolor: "rgb(254 249 195)",
        },
      },
    },
    {
      label: "ไม่ผ่าน",
      status: "rejected",
      variant: "outlined",
      icon: <CancelRoundedIcon />,
      sx: {
        borderColor: "rgb(252 165 165)",
        color: "rgb(185 28 28)",
        "&:hover": {
          borderColor: "rgb(248 113 113)",
          bgcolor: "rgb(254 242 242)",
        },
      },
    },
  ];

  return (
    <>
      <Box className="grid gap-4">
        <Box>
          <Typography
            variant="h6"
            className="text-xl font-extrabold text-slate-900"
          >
            ตรวจสลิป / ยืนยันชำระ
          </Typography>
          <Typography className="text-sm text-slate-600">
            ตรวจสอบรายการโอน แนบสลิป และอัปเดตสถานะให้การจอง
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
                  <FactCheckRoundedIcon fontSize="small" />
                </Box>

                <Box>
                  <Typography className="text-sm font-bold text-slate-900">
                    ทั้งหมด {kpi.total} • รอตรวจ {kpi.pending} • ผ่าน{" "}
                    {kpi.approved} • ไม่ผ่าน {kpi.rejected}
                  </Typography>
                  <Typography className="mt-1 text-xs text-slate-500">
                    แนะนำ: ตรวจยอด ชื่อผู้โอน เวลาโอน และบัญชีปลายทาง ก่อนกด
                    “อนุมัติ”
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                className="items-center flex-wrap"
              >
                <Stack direction="row" spacing={1} className="items-center">
                  <Typography className="text-xs font-medium text-slate-500">
                    แสดงเฉพาะรอตรวจ
                  </Typography>
                  <Switch
                    size="small"
                    checked={pendingOnly}
                    onChange={(e) => setPendingOnly(e.target.checked)}
                  />
                </Stack>

                <Chip
                  label={
                    kpi.pending > 0 ? `PENDING ${kpi.pending}` : "ALL CLEAR"
                  }
                  variant="outlined"
                  sx={{
                    border: "1px solid rgb(226 232 240)",
                    bgcolor: "rgb(248 250 252)",
                    color: "rgb(51 65 85)",
                    fontWeight: 900,
                  }}
                />
              </Stack>
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
                รายการตรวจสอบการชำระเงิน
              </Typography>
              <Typography className="text-xs text-slate-500">
                {filteredRows.length} รายการ
              </Typography>
            </Box>

            <Divider className="border-slate-200!" />

            <Box className="divide-y divide-slate-200">
              {filteredRows.map((r) => {
                const rowAccountCompare = compareAccount(
                  r.expectedAccount,
                  r.slipAccount
                );
                return (
                  <Box
                    key={r.id}
                    className="px-5 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      className="items-start md:items-center justify-between"
                    >
                      <Box className="min-w-0">
                        <Stack
                          direction="row"
                          spacing={1}
                          className="items-center flex-wrap"
                        >
                          <Typography className="text-sm font-black text-slate-900">
                            {r.bookingId}
                          </Typography>

                          <StatusChip s={r.status} />

                          <Chip
                            size="small"
                            label={formatTHB(r.paidAmount)}
                            variant="outlined"
                            sx={{ height: 22, fontSize: 11 }}
                          />

                          {r.paidAmount !== r.bookingAmount ? (
                            <Chip
                              size="small"
                              label="ยอดไม่ตรง"
                              sx={{
                                height: 22,
                                fontSize: 11,
                                border: "1px solid rgb(254 202 202)",
                                bgcolor: "rgb(254 226 226)",
                                color: "rgb(153 27 27)",
                                fontWeight: 800,
                              }}
                            />
                          ) : null}

                          {!rowAccountCompare.matched ? (
                            <Chip
                              size="small"
                              label="บัญชีไม่ตรง"
                              sx={{
                                height: 22,
                                fontSize: 11,
                                border: "1px solid rgb(254 202 202)",
                                bgcolor: "rgb(254 226 226)",
                                color: "rgb(153 27 27)",
                                fontWeight: 800,
                              }}
                            />
                          ) : null}
                        </Stack>

                        <Typography className="mt-1 text-sm text-slate-700">
                          ลูกค้า: {r.customer}
                        </Typography>

                        <Typography className="mt-1 text-xs text-slate-500">
                          อ้างอิง: {r.referenceNo ?? "-"} • เวลาโอน:{" "}
                          {r.paidAt ?? "-"}
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={1}
                        className="items-center flex-wrap"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openDetailDrawer(r)}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            borderColor: "rgb(226 232 240)",
                          }}
                        >
                          รายละเอียด
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => openStatusDrawer(r)}
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
                          อัปเดตสถานะ
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}

              {filteredRows.length === 0 ? (
                <Box className="px-5 py-10 text-center">
                  <Typography className="text-sm font-semibold text-slate-900">
                    ไม่มีรายการที่ตรงกับเงื่อนไข
                  </Typography>
                  <Typography className="mt-1 text-xs text-slate-500">
                    เมื่อมีลูกค้าแนบสลิป ระบบจะเพิ่มรายการในหน้านี้อัตโนมัติ
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={drawerMode !== null}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true,
          onTransitionExited: handleDrawerExited,
        }}
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
              <Box className="min-w-0">
                <Typography className="text-sm font-black text-slate-900">
                  {drawerMode === "detail"
                    ? "รายละเอียดการตรวจสลิป"
                    : "อัปเดตสถานะการตรวจสอบ"}
                </Typography>
                <Typography className="text-xs text-slate-500">
                  {selectedRow
                    ? `${selectedRow.bookingId} • ${selectedRow.customer}`
                    : "-"}
                </Typography>
              </Box>
            </Stack>

            <IconButton onClick={closeDrawer}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Divider className="my-4! border-slate-200!" />

          {drawerMode === "detail" && selectedRow ? (
            <Stack spacing={2}>
              <Box className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Box
                  className="relative bg-linear-to-br from-slate-900 to-slate-700"
                  sx={{ minHeight: 220 }}
                >
                  <Box className="grid h-55 w-full place-items-center text-slate-300">
                    <PaymentsRoundedIcon sx={{ fontSize: 56 }} />
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
                      Verification Overview
                    </Typography>
                    <Typography className="mt-2 text-xl font-extrabold">
                      {selectedRow.bookingId}
                    </Typography>
                    <Typography className="mt-2 text-sm text-slate-200">
                      ลูกค้า {selectedRow.customer}
                    </Typography>
                    <Typography className="mt-4 text-sm text-slate-300">
                      ยอดที่โอน
                    </Typography>
                    <Typography className="text-2xl font-extrabold">
                      {formatTHB(selectedRow.paidAmount)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <SectionCard title="ข้อมูลธุรกรรม">
                  <InfoRow label="Booking ID" value={selectedRow.bookingId} />
                  <InfoRow label="ลูกค้า" value={selectedRow.customer} />
                  <InfoRow
                    label="ยอดที่ต้องชำระ"
                    value={formatTHB(selectedRow.bookingAmount)}
                  />
                  <InfoRow
                    label="ยอดที่โอน"
                    value={formatTHB(selectedRow.paidAmount)}
                  />
                  <InfoRow
                    label="สถานะ"
                    value={<StatusChip s={selectedRow.status} />}
                  />
                </SectionCard>

                <SectionCard title="เปรียบเทียบยอด">
                  <InfoRow
                    label="ผลตรวจยอด"
                    value={
                      amountMatched ? (
                        <MatchChip
                          ok={true}
                          okLabel="ยอดตรงกัน"
                          badLabel="ยอดไม่ตรง"
                        />
                      ) : (
                        <MatchChip
                          ok={false}
                          okLabel="ยอดตรงกัน"
                          badLabel={`ต่าง ${formatTHB(Math.abs(amountDelta))}`}
                        />
                      )
                    }
                  />
                  <InfoRow
                    label="ส่วนต่าง"
                    value={
                      amountDelta === 0
                        ? formatTHB(0)
                        : amountDelta > 0
                        ? `โอนเกิน ${formatTHB(amountDelta)}`
                        : `โอนขาด ${formatTHB(Math.abs(amountDelta))}`
                    }
                  />
                </SectionCard>

                <SectionCard title="บัญชีที่ระบบคาดหวัง">
                  <InfoRow
                    label="ธนาคาร"
                    value={selectedRow.expectedAccount.bankName}
                  />
                  <InfoRow
                    label="ชื่อบัญชี"
                    value={selectedRow.expectedAccount.accountName}
                  />
                  <InfoRow
                    label="เลขบัญชี"
                    value={selectedRow.expectedAccount.accountNo}
                  />
                </SectionCard>

                <SectionCard title="ข้อมูลบัญชีจากสลิป">
                  <InfoRow
                    label="ธนาคารปลายทาง"
                    value={selectedRow.slipAccount?.bankName ?? "-"}
                  />
                  <InfoRow
                    label="ชื่อบัญชีปลายทาง"
                    value={selectedRow.slipAccount?.accountName ?? "-"}
                  />
                  <InfoRow
                    label="เลขบัญชีปลายทาง"
                    value={selectedRow.slipAccount?.accountNo ?? "-"}
                  />

                  <Divider className="border-slate-200!" />

                  <InfoRow
                    label="ธนาคาร"
                    value={<MatchChip ok={accountCompare.bankMatched} />}
                  />
                  <InfoRow
                    label="ชื่อบัญชี"
                    value={<MatchChip ok={accountCompare.accountNameMatched} />}
                  />
                  <InfoRow
                    label="เลขบัญชี"
                    value={<MatchChip ok={accountCompare.accountNoMatched} />}
                  />
                  <InfoRow
                    label="สรุป"
                    value={
                      <MatchChip
                        ok={accountCompare.matched}
                        okLabel="บัญชีตรงกัน"
                        badLabel="บัญชีไม่ตรงกัน"
                      />
                    }
                  />
                </SectionCard>

                <SectionCard title="ข้อมูลอ้างอิง">
                  <InfoRow
                    label="เลขอ้างอิง"
                    value={selectedRow.referenceNo ?? "-"}
                  />
                  <InfoRow label="เวลาโอน" value={selectedRow.paidAt ?? "-"} />
                  <InfoRow
                    label="ธนาคารต้นทาง"
                    value={selectedRow.bankName ?? "-"}
                  />
                </SectionCard>

                <SectionCard title="หมายเหตุ">
                  <Typography className="text-sm leading-6 text-slate-700">
                    {selectedRow.note?.trim()
                      ? selectedRow.note
                      : "ยังไม่มีหมายเหตุเพิ่มเติม"}
                  </Typography>

                  <Divider className="border-slate-200!" />

                  <Box>
                    <Typography className="text-xs font-medium text-slate-500">
                      หมายเหตุผู้ตรวจสอบ
                    </Typography>
                    <Typography className="mt-1 text-sm leading-6 text-slate-700">
                      {selectedRow.reviewerNote?.trim()
                        ? selectedRow.reviewerNote
                        : "ยังไม่มีหมายเหตุจากผู้ตรวจสอบ"}
                    </Typography>
                  </Box>
                </SectionCard>

                <SectionCard title="สลิปการชำระเงิน">
                  {selectedRow.slipUrl ? (
                    <Stack spacing={2}>
                      <Box className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <Box
                          component="img"
                          src={selectedRow.slipUrl}
                          alt={`slip-${selectedRow.bookingId}`}
                          sx={{
                            width: "100%",
                            height: 260,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Box>

                      <Button
                        variant="outlined"
                        startIcon={<ZoomInRoundedIcon />}
                        onClick={() => setZoomOpen(true)}
                        sx={{
                          textTransform: "none",
                          borderColor: "rgb(226 232 240)",
                          borderRadius: 2.5,
                        }}
                      >
                        ซูมรูปสลิป
                      </Button>
                    </Stack>
                  ) : (
                    <Box className="grid min-h-45 place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                      <Stack spacing={1} className="items-center">
                        <ImageRoundedIcon />
                        <Typography className="text-sm">
                          ยังไม่มีรูปสลิป
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                </SectionCard>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                className="pt-0.5"
              >
                <Button
                  fullWidth
                  size="medium"
                  variant="outlined"
                  onClick={closeDrawer}
                  sx={{
                    textTransform: "none",
                    borderColor: "rgb(226 232 240)",
                    color: "rgb(15 23 42)",
                    borderRadius: 2.5,
                  }}
                >
                  ปิดหน้าต่าง
                </Button>

                <Button
                  fullWidth
                  size="medium"
                  variant="outlined"
                  startIcon={<OpenInNewRoundedIcon />}
                  onClick={() =>
                    setSnack({
                      open: true,
                      msg: `พร้อมเชื่อมไปหน้า booking ${selectedRow.bookingId} แล้ว`,
                      type: "info",
                    })
                  }
                  sx={{
                    textTransform: "none",
                    borderColor: "rgb(226 232 240)",
                    color: "rgb(15 23 42)",
                    borderRadius: 2.5,
                  }}
                >
                  เปิด Booking ที่เกี่ยวข้อง
                </Button>

                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  onClick={() => setDrawerMode("status")}
                  sx={{
                    textTransform: "none",
                    bgcolor: "rgb(15 23 42)",
                    boxShadow: "none",
                    borderRadius: 2.5,
                    "&:hover": {
                      bgcolor: "rgb(2 6 23)",
                      boxShadow: "none",
                    },
                  }}
                >
                  อัปเดตสถานะ
                </Button>
              </Stack>
            </Stack>
          ) : null}

          {drawerMode === "status" && selectedRow ? (
            <Stack spacing={2}>
              <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                <Stack direction="row" spacing={1} className="items-center">
                  <Typography className="text-sm font-bold text-slate-900">
                    สถานะปัจจุบัน
                  </Typography>
                  <StatusChip s={selectedRow.status} />
                </Stack>
              </Box>

              <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  className="items-start sm:items-center justify-between"
                >
                  <Typography className="text-sm font-bold text-slate-900">
                    เลือกสถานะใหม่
                  </Typography>

                  <Stack direction="row" spacing={1} className="items-center">
                    <Typography className="text-xs text-slate-500">
                      จะบันทึกเป็น
                    </Typography>
                    <StatusChip s={nextStatus} />
                  </Stack>
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.2}
                  className="mt-4"
                >
                  {quickActions.map((action) => {
                    const isActive = nextStatus === action.status;

                    return (
                      <Button
                        key={action.status}
                        variant={isActive ? "contained" : action.variant}
                        startIcon={action.icon}
                        onClick={() => setNextStatus(action.status)}
                        sx={{
                          flex: 1,
                          textTransform: "none",
                          borderRadius: 2.5,
                          ...(isActive
                            ? {
                                bgcolor: "rgb(15 23 42)",
                                color: "white",
                                boxShadow: "none",
                                "&:hover": {
                                  bgcolor: "rgb(2 6 23)",
                                  boxShadow: "none",
                                },
                              }
                            : action.sx),
                        }}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
                </Stack>
              </Box>

              <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                <Stack spacing={2}>
                  <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <Stack spacing={1}>
                      <Typography className="text-xs font-medium text-slate-500">
                        เปรียบเทียบก่อนบันทึก
                      </Typography>
                      <InfoRow
                        label="ยอดที่ต้องชำระ"
                        value={formatTHB(selectedRow.bookingAmount)}
                      />
                      <InfoRow
                        label="ยอดที่โอน"
                        value={formatTHB(selectedRow.paidAmount)}
                      />
                      <InfoRow
                        label="ผลตรวจยอด"
                        value={
                          <MatchChip
                            ok={amountMatched}
                            okLabel="ยอดตรงกัน"
                            badLabel="ยอดไม่ตรง"
                          />
                        }
                      />
                      <InfoRow
                        label="ผลตรวจบัญชี"
                        value={
                          <MatchChip
                            ok={accountCompare.matched}
                            okLabel="บัญชีตรงกัน"
                            badLabel="บัญชีไม่ตรงกัน"
                          />
                        }
                      />
                    </Stack>
                  </Box>

                  <TextField
                    multiline
                    minRows={4}
                    fullWidth
                    label="หมายเหตุผู้ตรวจสอบ"
                    value={reviewerNoteInput}
                    onChange={(e) => setReviewerNoteInput(e.target.value)}
                    placeholder="เช่น ยอดตรงกับรายการ / เวลาชำระถูกต้อง / บัญชีปลายทางไม่ตรง / ยอดไม่ตรง"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} className="pt-0.5">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={closeDrawer}
                  sx={{
                    textTransform: "none",
                    borderColor: "rgb(226 232 240)",
                    color: "rgb(15 23 42)",
                    borderRadius: 2.5,
                  }}
                >
                  ยกเลิก
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={saveVerificationStatus}
                  sx={{
                    textTransform: "none",
                    bgcolor: "rgb(15 23 42)",
                    boxShadow: "none",
                    borderRadius: 2.5,
                    "&:hover": {
                      bgcolor: "rgb(2 6 23)",
                      boxShadow: "none",
                    },
                  }}
                >
                  บันทึกสถานะ
                </Button>
              </Stack>
            </Stack>
          ) : null}
        </Box>
      </Drawer>

      <Dialog
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "black",
          },
        }}
      >
        <DialogContent sx={{ p: 0, bgcolor: "black" }}>
          {selectedRow?.slipUrl ? (
            <Box
              component="img"
              src={selectedRow.slipUrl}
              alt={`zoom-slip-${selectedRow.bookingId}`}
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: "85vh",
                objectFit: "contain",
                bgcolor: "black",
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>

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
    </>
  );
}
