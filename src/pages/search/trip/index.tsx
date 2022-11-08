import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DtoTripLocation } from "../../../services/api/v1/location/dto";
import { getFormValuesFromDtoTrip } from "../filter/searchFilters/helpers";
import { useLocalForm } from "../filter/searchFilters/useLocalForm";
import { useLocationService } from "../resultSearch/useSearch";

export function TripPage() {
  const { id } = useParams();
  const navitage = useNavigate();
  const locationId = id ? parseInt(id) : undefined;

  const service = useLocationService({
    locationId,
  });

  const form = useLocalForm();
  const { reset: formReset } = form;

  React.useEffect(() => {
    if (service.location) {
      formReset(getFormValuesFromDtoTrip(service.location));
    }
  }, [service.location, formReset]);

  function navigateToSearch() {
    navitage("/home");
  }

  function handleSubmit(data: DtoTripLocation) {
    service.save(data, navigateToSearch, form.setValidationsErrors);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Gabitrip</Typography>
      </Grid>
      <Grid item xs={6}>
        <Controller
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          name="nameHotel"
          render={({ field, fieldState }) => (
            <TextField
              label={"Nome do Hotel"}
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
          control={form.control}
          name="PhoneHotel"
          render={({ field, fieldState }) => (
            <TextField
              label={"Número do Hotel"}
              {...field}
              fullWidth
              required
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={form.control}
          name="touristSpots"
          render={({ field, fieldState }) => (
            <TextField
              label={"País"}
              {...field}
              fullWidth
              multiline
              rows={6}
              required
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <br />
      <br />
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => form.handleSubmit(handleSubmit)()}
        >
          Salvar
        </Button>{" "}
        <Button variant="text" color="primary" onClick={navigateToSearch}>
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
}
