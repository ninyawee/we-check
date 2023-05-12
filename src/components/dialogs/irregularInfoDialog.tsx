import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { FC } from "react";

const IrregularInfoDialog: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  return <Dialog open={open}>
    <DialogContent>
      <Stack direction="column" justifyContent={"space-between"} maxHeight={"80%"}>
        <Stack direction="column">
          <Typography>ความผิดปกติ</Typography>
          <Typography>อุทัยธานี เขต 1 หน่วย 3</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>การคุกคาม (09:40)</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>การคุกคาม (09:40)</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>การคุกคาม (09:40)</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>การคุกคาม (09:40)</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>การคุกคาม (09:40)</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>การคุกคาม (09:40)</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
        </Stack>

      </Stack>
    </DialogContent>
    <DialogActions>
      <Stack direction="column">
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ margin: "1rem 1.5rem", padding: "1rem 0.5rem" }}>
          พาฉันไปที่หน่วยเลือกตั้งนี้
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{ margin: "1rem 1.5rem", padding: "1rem 0.5rem" }}
          onClick={onClose}>
          ปิดหน้าต่าง
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
}

export default IrregularInfoDialog
