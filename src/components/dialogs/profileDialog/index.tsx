// TODO: ux add #purpose this is for convinient when will fill in form #privacy how data is handle
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import {
  useUserProfileStore,
  UserProfile,
} from "@/src/store/userProfile.store";
import { useSnackbar } from "notistack";

const ProfileDialog: FC<{
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
}> = ({ open, onClose, onSaved }) => {
  const { profile, saveProfile, loadProfile } = useUserProfileStore();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<UserProfile>({
    fullname: "",
    phone: "",
    email: "",
    gender: "",
    otherGender: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    phone: "",
    email: "",
    gender: "",
    otherGender: "",
  });

  // Load existing profile on mount
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Update form when profile changes
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const validateForm = (): boolean => {
    const newErrors = {
      fullname: "",
      phone: "",
      email: "",
      gender: "",
      otherGender: "",
    };

    let isValid = true;

    // Validate fullname
    if (formData.fullname && formData.fullname.trim().length > 0) {
      if (formData.fullname.trim().length < 2) {
        newErrors.fullname = "กรุณากรอกชื่อ-นามสกุล (อย่างน้อย 2 ตัวอักษร)";
        isValid = false;
      }
    }

    // Validate phone (Thai format: 10 digits starting with 0)
    const phoneRegex = /^0\d{9}$/;
    if (formData.phone && formData.phone.trim().length > 0) {
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone =
          "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก เริ่มต้นด้วย 0)";
        isValid = false;
      }
    }

    // Validate email only if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && formData.email.trim().length > 0) {
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "กรุณากรอกอีเมล์ที่ถูกต้อง";
        isValid = false;
      }
    }

    // Validate gender only if provided
    if (formData.gender && formData.gender.trim().length > 0) {
      // If gender is Other and otherGender provided, validate length
      if (formData.gender === "Other") {
        if (formData.otherGender && formData.otherGender.trim().length > 0) {
          if (formData.otherGender.trim().length < 2) {
            newErrors.otherGender = "กรุณาระบุเพศ (อย่างน้อย 2 ตัวอักษร)";
            isValid = false;
          }
        }
      }
    } else if (formData.otherGender && formData.otherGender.trim().length > 0) {
      // If gender not provided but otherGender supplied, validate otherGender length
      if (formData.otherGender.trim().length < 2) {
        newErrors.otherGender = "กรุณาระบุเพศ (อย่างน้อย 2 ตัวอักษร)";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      saveProfile(formData);
      enqueueSnackbar("บันทึกข้อมูลสำเร็จ", { variant: "success" });

      if (onSaved) {
        onSaved();
      }

      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form to saved profile or empty
    if (profile) {
      setFormData(profile);
    } else {
      setFormData({
        fullname: "",
        phone: "",
        email: "",
        gender: "",
        otherGender: "",
      });
    }
    setErrors({
      fullname: "",
      phone: "",
      email: "",
      gender: "",
      otherGender: "",
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "rgba(18,18,18,0.98)",
          color: "rgba(255,255,255,0.87)",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize="1.5rem" fontWeight="bold" color="inherit">
          ข้อมูลผู้สังเกตการณ์
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ paddingTop: 1 }}>
        <Stack spacing={2} marginTop={1}>
          <TextField
            label="ชื่อ-นามสกุล"
            fullWidth
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            error={!!errors.fullname}
            helperText={errors.fullname}
            variant="filled"
            InputProps={{
              sx: { backgroundColor: "rgba(255,255,255,0.03)", color: "inherit" },
            }}
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
          />

          <TextField
            label="เบอร์โทรศัพท์"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="0812345678"
            variant="filled"
            InputProps={{
              sx: { backgroundColor: "rgba(255,255,255,0.03)", color: "inherit" },
            }}
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
          />

          <FormControl fullWidth error={!!errors.gender} variant="filled">
            <InputLabel sx={{ color: "rgba(255,255,255,0.6)" }}>เพศ</InputLabel>
            <Select
              value={formData.gender}
              label="เพศ"
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              sx={{ backgroundColor: "rgba(255,255,255,0.03)", color: "inherit" }}
            >
              <MenuItem value="หญิง">หญิง</MenuItem>
              <MenuItem value="ชาย">ชาย</MenuItem>
              <MenuItem value="LGBTQIAN+">LGBTQIAN+</MenuItem>
              <MenuItem value="ไม่ต้องการระบุ">ไม่ต้องการระบุ</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.gender && (
              <Typography variant="caption" color="error" marginLeft={1.75}>
                {errors.gender}
              </Typography>
            )}
          </FormControl>

          {formData.gender === "Other" && (
            <TextField
              label="โปรดระบุเพศ"
              fullWidth
              value={formData.otherGender || ""}
              onChange={(e) => setFormData({ ...formData, otherGender: e.target.value })}
              error={!!errors.otherGender}
              helperText={errors.otherGender}
              variant="filled"
              InputProps={{
                sx: { backgroundColor: "rgba(255,255,255,0.03)", color: "inherit" },
              }}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
            />
          )}
          <TextField
            label="อีเมล์"
            fullWidth
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email || "ยินดีให้ WeWatch ติดต่อกลับเพื่อสอบถามข้อมูลเพิ่มเติม"}
            placeholder="name@example.com"
            variant="filled"
            InputProps={{
              sx: { backgroundColor: "rgba(255,255,255,0.03)", color: "inherit" },
            }}
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          onClick={handleCancel}
          sx={{
            borderRadius: "20px",
            minWidth: "100px",
            color: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          ยกเลิก
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "20px",
            minWidth: "100px",
            color: "white",
            backgroundColor: "#1976d2",
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          บันทึก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
