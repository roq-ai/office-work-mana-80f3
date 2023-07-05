import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCalendar } from 'apiSdk/calendars';
import { Error } from 'components/error';
import { calendarValidationSchema } from 'validationSchema/calendars';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ProjectInterface } from 'interfaces/project';
import { getProjects } from 'apiSdk/projects';
import { CalendarInterface } from 'interfaces/calendar';

function CalendarCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CalendarInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCalendar(values);
      resetForm();
      router.push('/calendars');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CalendarInterface>({
    initialValues: {
      project_id: (router.query.project_id as string) ?? null,
    },
    validationSchema: calendarValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Calendar
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<ProjectInterface>
            formik={formik}
            name={'project_id'}
            label={'Select Project'}
            placeholder={'Select Project'}
            fetcher={getProjects}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'calendar',
    operation: AccessOperationEnum.CREATE,
  }),
)(CalendarCreatePage);
