import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DtoTripLocation } from "../../../services/api/v1/location/dto";
import { getFormValuesFromDtoTrip } from "../filter/searchFilters/helpers";
import { useLocationService } from "../resultSearch/useSearch";
import { useLocalFormAdd } from "../resultSearch/useLocalFormAdd";

export function TripPage() {
  const { id } = useParams();
  const navitage = useNavigate();
  const locationId = id ? parseInt(id) : undefined;

  const service = useLocationService({
    locationId,
  });

  const formAdd = useLocalFormAdd();
  const { reset: formReset } = formAdd;

  React.useEffect(() => {
    if (service.location) {
      formReset(getFormValuesFromDtoTrip(service.location));
    }
  }, [service.location, formReset]);

  function navigateToSearch() {
    navitage("/home");
  }

  function handleSubmit(data: DtoTripLocation) {
    service.save(data, navigateToSearch, formAdd.setValidationsErrors);
  }
  function handleDelete() {
    service.deleteLocation(locationId);
    navigateToSearch();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          sx={{ margin: "30px 0px 20px 0px" }}
          variant="h4"
          gutterBottom
        >
          Gabitrip
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Controller
          control={formAdd.control}
          name="city"
          render={({ field, fieldState }) => (
            <TextField
              label={"Cidade"}
              {...field}
              fullWidth
              required
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          control={formAdd.control}
          name="country"
          render={({ field, fieldState }) => (
            <TextField
              label={"País"}
              {...field}
              fullWidth
              required
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          control={formAdd.control}
          name="hotelName"
          render={({ field, fieldState }) => (
            <TextField
              label={"Nome do Hotel"}
              {...field}
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          control={formAdd.control}
          name="hotelPhone"
          render={({ field, fieldState }) => (
            <TextField
              label={"Número do Hotel"}
              type="number"
              {...field}
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={formAdd.control}
          name="travelPlan"
          render={({ field, fieldState }) => (
            <TextField
              label={"Pontos turísticos"}
              {...field}
              fullWidth
              multiline
              rows={6}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <br />
      <br />
      <Grid item xs={1.5}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => formAdd.handleSubmit(handleSubmit)()}
        >
          Salvar
        </Button>
      </Grid>
      {locationId && (
        <Grid item xs={1.5}>
          <Button variant="text" color="error" onClick={() => handleDelete()}>
            Remover
          </Button>
        </Grid>
      )}

      <Grid item xs={1}>
        <Button variant="text" color="primary" onClick={navigateToSearch}>
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
}
