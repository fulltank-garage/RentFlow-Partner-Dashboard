"use client";

import Link from "next/link";
import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

export default function AdminSupportPage() {
    return (
        <Box className="grid gap-4">
            <Box>
                <Typography variant="h6" className="text-xl font-extrabold text-slate-900">ซัพพอร์ต</Typography>
                <Typography className="text-sm text-slate-600">
                    หน้านี้ยังไม่เปิดใช้งาน — คุณสามารถทำเป็นระบบ Ticket/แชท/ฟอร์มติดต่อได้ภายหลัง
                </Typography>
            </Box>

            <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
                <CardContent className="p-5">
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-start sm:items-center justify-between">
                        <Stack direction="row" spacing={1.25} className="items-center">
                            <Box className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                                <SupportAgentRoundedIcon fontSize="small" />
                            </Box>
                            <Box>
                                <Typography className="text-sm font-bold text-slate-900">ยังไม่มีข้อมูลซัพพอร์ต</Typography>
                                <Typography className="mt-1 text-xs text-slate-500">
                                    แนะนำเริ่มจาก “รายการข้อความติดต่อ” หรือ “Ticket”
                                </Typography>
                            </Box>
                        </Stack>

                        <Button
                            component={Link}
                            href="/admin/settings"
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: "none",
                                bgcolor: "rgb(15 23 42)",
                                boxShadow: "none",
                                "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                                borderRadius: 2,
                            }}
                        >
                            ไปตั้งค่า
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}