import { Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useLocalForm } from "./useLocalForm/index";
import { LocalFormValues } from "./useLocalForm/types";

export interface SearchFiltersProps {
  onSubmit(values: LocalFormValues): void;
}

export function SearchFilters(props: SearchFiltersProps) {
  const form = useLocalForm();

  return (
    // <form onSubmit={form.handleSubmit(props.onSubmit)}>
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={5.5}>
        <Controller
          control={form.control}
          name={"city"}
          render={({ field, fieldState }) => (
            <TextField
              sx={{ margin: "30px 0px 20px 0px" }}
              fullWidth
              label={"Cidade"}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={5.5}>
        <Controller
          control={form.control}
          name={"country"}
          render={({ field, fieldState }) => (
            <TextField
              sx={{ margin: "30px 0px 20px 0px" }}
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label={"País"}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          sx={{ width: "100%", height: "100%" }}
          variant="contained"
          // type="submit"
          onClick={() => form.handleSubmit(props.onSubmit)()}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
    // </form>
  );
}
