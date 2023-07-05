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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCalendarById, updateCalendarById } from 'apiSdk/calendars';
import { Error } from 'components/error';
import { calendarValidationSchema } from 'validationSchema/calendars';
import { CalendarInterface } from 'interfaces/calendar';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ProjectInterface } from 'interfaces/project';
import { getProjects } from 'apiSdk/projects';

function CalendarEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CalendarInterface>(
    () => (id ? `/calendars/${id}` : null),
    () => getCalendarById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CalendarInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCalendarById(id, values);
      mutate(updated);
      resetForm();
      router.push('/calendars');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CalendarInterface>({
    initialValues: data,
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
            Edit Calendar
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(CalendarEditPage);
