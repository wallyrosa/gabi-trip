import { ResultSearch } from "./resultSearch";
import { Typography, Grid } from "@mui/material";
import { SearchFilters } from "./filter/searchFilters/inde";
import { useTravelService } from "./usetravelService";
import { useNavigate } from "react-router-dom";

export interface SearchTripProps {
  children?: any;
}

export function SearchPage(props: SearchTripProps) {
  const navigate = useNavigate();
  const service = useTravelService();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            GabiTrip
          </Typography>
        </Grid>
      </Grid>

      <SearchFilters onSubmit={(values) => console.log("values: ", values)} />

      <ResultSearch
        items={service.location}
        onSelect={(item) => navigate(`trip/${item.id}`)}
      />
    </div>
  );
}
