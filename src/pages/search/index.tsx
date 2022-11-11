import { ResultSearch } from "./resultSearch";
import { Typography, Grid, Button } from "@mui/material";
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
        <Grid item xs={11}>
          <Typography
            sx={{ margin: "30px 0px 20px 0px" }}
            variant="h4"
            gutterBottom
          >
            GabiTrip
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => navigate('trip')} sx={{ width: "100%", margin: "30px 0px 20px 0px" }}>
            Adicionar
          </Button>
        </Grid>
      </Grid>

      <SearchFilters onSubmit={(values) => service.search(values)} />

      <ResultSearch
        items={service.locations}
        onSelect={(item) => navigate(`trip/${item.id}`)}
      />
    </div>
  );
}
