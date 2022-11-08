import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DtoTripLocation } from "../../../services/api/v1/location/dto";

export interface TripResultProps {
  items?: DtoTripLocation[] | undefined;
  onSelect: (item: DtoTripLocation) => void;
}

export function ResultSearch(props: TripResultProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cidade</TableCell>
            <TableCell>País</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items?.map((location, index) => (
            <TableRow
              key={location.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => {
                  props.onSelect(location);
                }}
              >
                {location.city}
              </TableCell>
              <TableCell align="left">{location.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
