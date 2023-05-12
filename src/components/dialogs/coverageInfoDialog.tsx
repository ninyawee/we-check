import { Button, Dialog, DialogActions, DialogContent, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const CoverageInfoDialog: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  return <Dialog open={open}>
    <DialogContent>
      <Stack direction="column" justifyContent={"space-between"} maxHeight={"80%"}>
        <Typography>33%</Typography>
        <Typography>ครอบคลุมทั่วประเทศ</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Stack direction="column">
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

export default CoverageInfoDialog
