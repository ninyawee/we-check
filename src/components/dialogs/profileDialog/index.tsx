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
    contract: false,
    gender: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    phone: "",
    contract: "",
    gender: "",
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
      contract: "",
      gender: "",
    };

    let isValid = true;

    // Validate fullname
    if (!formData.fullname || formData.fullname.trim().length < 2) {
      newErrors.fullname = "กรุณากรอกชื่อ-นามสกุล (อย่างน้อย 2 ตัวอักษร)";
      isValid = false;
    }

    // Validate phone (Thai format: 10 digits starting with 0)
    const phoneRegex = /^0\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone =
        "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก เริ่มต้นด้วย 0)";
      isValid = false;
    }

    // Validate contract
    if (!formData.contract) {
      newErrors.contract = "กรุณายอมรับเงื่อนไข";
      isValid = false;
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = "กรุณาเลือกเพศ";
      isValid = false;
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
        contract: false,
        gender: "",
      });
    }
    setErrors({
      fullname: "",
      phone: "",
      contract: "",
      gender: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography fontSize="1.5rem" fontWeight="bold" color="primary">
          ข้อมูลผู้สังเกตการณ์
        </Typography>
      </DialogTitle>

      <DialogContent>
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
            required
          />

          <TextField
            label="เบอร์โทรศัพท์"
            fullWidth
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="0812345678"
            required
          />

          <FormControl fullWidth error={!!errors.gender} required>
            <InputLabel>เพศ</InputLabel>
            <Select
              value={formData.gender}
              label="เพศ"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
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

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.contract}
                onChange={(e) =>
                  setFormData({ ...formData, contract: e.target.checked })
                }
              />
            }
            label="ยินดีให้ WeWatch ติดต่อกลับเพื่อสอบถามข้อมูลเพิ่มเติม"
          />
          {errors.contract && (
            <Typography variant="caption" color="error" marginLeft={1.75}>
              {errors.contract}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          onClick={handleCancel}
          sx={{
            borderRadius: "20px",
            minWidth: "100px",
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
          }}
        >
          บันทึก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
