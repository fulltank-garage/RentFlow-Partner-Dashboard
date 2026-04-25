"use client";

import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { storefrontService } from "@/src/services/storefront/storefront.service";
import type { StorefrontBlock } from "@/src/services/storefront/storefront.types";

const emptyBlock: StorefrontBlock = {
  type: "feature",
  title: "",
  subtitle: "",
  description: "",
  buttonLabel: "",
  href: "",
};

export default function Page() {
  const [blocks, setBlocks] = React.useState<StorefrontBlock[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;
    storefrontService
      .getHomePage()
      .then((page) => {
        if (!cancelled) setBlocks(page.blocks?.length ? page.blocks : []);
      })
      .catch(() => {
        if (!cancelled) setBlocks([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function updateBlock(index: number, patch: Partial<StorefrontBlock>) {
    setBlocks((current) =>
      current.map((block, blockIndex) =>
        blockIndex === index ? { ...block, ...patch } : block
      )
    );
  }

  async function save() {
    setSaving(true);
    try {
      await storefrontService.saveHomePage({
        blocks: blocks.map((block, index) => ({
          ...block,
          id: block.id || `block-${index + 1}`,
        })),
      });
      setMessage("บันทึกหน้าเว็บเรียบร้อยแล้ว");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "บันทึกหน้าเว็บไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box className="grid gap-6">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} className="items-start justify-between">
        <Box>
          <Typography className="text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            จัดหน้าเว็บร้าน
          </Typography>
          <Typography className="mt-2 text-base text-slate-500 md:text-lg">
            เพิ่มบล็อกข้อความ โปรโมชัน และปุ่มเรียกดูข้อมูลบนหน้าแรกของร้าน
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={save}
          disabled={saving}
          className="h-12 rounded-full! bg-slate-950! px-8! text-base! font-bold!"
        >
          {saving ? "กำลังบันทึก" : "บันทึกหน้าเว็บ"}
        </Button>
      </Stack>

      <Card elevation={0} className="partner-card rounded-[34px]!">
        <CardContent className="grid gap-5">
          {loading ? (
            <Box className="flex min-h-[220px] items-center justify-center">
              <CircularProgress />
            </Box>
          ) : blocks.length === 0 ? (
            <Box className="rounded-[28px] bg-slate-50 p-8 text-center">
              <Typography className="font-bold text-slate-950">ยังไม่มีบล็อกหน้าเว็บ</Typography>
              <Typography className="mt-1 text-sm text-slate-500">
                กดเพิ่มบล็อกเพื่อเริ่มจัดหน้าร้านของคุณ
              </Typography>
            </Box>
          ) : (
            blocks.map((block, index) => (
              <Box key={block.id || index} className="grid gap-4">
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    select
                    label="รูปแบบ"
                    value={block.type || "feature"}
                    onChange={(event) =>
                      updateBlock(index, { type: event.target.value as StorefrontBlock["type"] })
                    }
                    fullWidth
                  >
                    <MenuItem value="feature">ข้อมูลเด่น</MenuItem>
                    <MenuItem value="announcement">ประกาศ</MenuItem>
                    <MenuItem value="cta">ปุ่มนำทาง</MenuItem>
                    <MenuItem value="text">ข้อความ</MenuItem>
                  </TextField>
                  <TextField
                    label="หัวข้อ"
                    value={block.title || ""}
                    onChange={(event) => updateBlock(index, { title: event.target.value })}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label="คำอธิบาย"
                  value={block.description || ""}
                  onChange={(event) => updateBlock(index, { description: event.target.value })}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    label="ข้อความปุ่ม"
                    value={block.buttonLabel || ""}
                    onChange={(event) => updateBlock(index, { buttonLabel: event.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="ลิงก์ปุ่ม"
                    value={block.href || ""}
                    onChange={(event) => updateBlock(index, { href: event.target.value })}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setBlocks((current) => current.filter((_, blockIndex) => blockIndex !== index))
                    }
                    className="rounded-full!"
                  >
                    ลบบล็อก
                  </Button>
                </Stack>
                {index < blocks.length - 1 ? <Divider /> : null}
              </Box>
            ))
          )}
          <Button
            variant="outlined"
            onClick={() => setBlocks((current) => [...current, { ...emptyBlock }])}
            className="h-12 rounded-full! text-base! font-bold!"
          >
            เพิ่มบล็อก
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2200}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={message.includes("ไม่สำเร็จ") ? "error" : "success"}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}
