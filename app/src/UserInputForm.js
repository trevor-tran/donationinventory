import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as yup from 'yup';
import {

  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const validationSchema = yup.object({
  donor: yup
    .string("Enter donor's name")
    .matches(/^[a-zA-Z]+$/, "Please enter a valid name")
    .required("Donor's name is required"),
  amount: yup
    .number("Enter donation amount")
    .min(1)
    .required('Donation amount is required'),
});

/**
 * Add/Update Donation form.
 * Inputs are validated where nesscessary
 */
export default function UserInputForm(props) {
  const URL = "http://localhost:8080/donation";

  const formik = useFormik({
    initialValues: {
      id: props.values?.id || null,
      donor: props.values?.donor || '',
      type: props.values?.type || 'Money',
      amount: props.values?.amount || '',
      date: props.values?.date ? dayjs(props.values?.date) : dayjs()
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = { ...values, date: dayjs(values.date).format("YYYY-MM-DD") };
      const response = await axios.post(URL, data);
      props.onSave(response.data);
    }
  });
  return (
    <form className={"d-flex justify-content-center align-items-center" + (props.dialog ? " flex-column mr-auto" : "")} onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        className="m-3"
        id="donor"
        name="donor"
        label="Donor"
        value={formik.values.donor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.donor && Boolean(formik.errors.donor)}
        helperText={formik.touched.donor && formik.errors.donor}
      />
      <FormControl className="m-3" fullWidth>
        <InputLabel id="type-of-donation-label">Type of Donation</InputLabel>
        <Select
          labelId="type-of-donation-label"
          id="type-of-donation-select"
          value={formik.values.type}
          name="type"
          label="Type of Donation"
          onChange={formik.handleChange}
        >
          <MenuItem value="Money">Money</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        className="m-3"
        id="amount"
        name="amount"
        label="Amount"
        type="number"
        min={1}
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        InputProps={{
          startAdornment: <InputAdornment position="start">{formik.values.type === "Money" ? "$" : "lb"}</InputAdornment>,
          inputProps: { min: 0
        }
        }}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
      />
      <div className="m-3 w-100">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date of Donation"
          name="date"
          value={formik.values.date}
          onChange={date => formik.setFieldValue("date", date, false)}
          maxDate={dayjs()}
        />
      </LocalizationProvider>
      </div>
      <div style={{textAlign: "center"}}>
      <Button color="primary" variant="contained" type="submit"> Save </Button>
      </div>
    </form>
  )
}
