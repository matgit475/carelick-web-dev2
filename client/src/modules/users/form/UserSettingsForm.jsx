import React from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Form as BootstrapForm } from "react-bootstrap";
import Username from "../../../shared/components/forms/Inputs/PlainText/Username";
import Email from "../../../shared/components/forms/Inputs/PlainText/Email";
import PersonalInformation from "../../../shared/components/forms/PersonalInformation";
import PasswordChange from "../../../shared/components/forms/PasswordChange";
import usePermissions, { PERMISSIONS } from "../usePermissions";
import SuccessAlert from "../../../shared/components/alerts/SuccessAlert";
import DangerAlert from "../../../shared/components/alerts/DangerAlert";
import { useAuth } from "../../../modules/auth/AuthProvider";
import { getUserSettingsById, saveUserSettingsById } from "../userApi";
import useFetch from "../../../shared/hooks/useFetch";
import { validationSchema as createValidationSchema } from "./validationSchema";
export default function UserSettingsForm({ id }) {
  const { data: user } = useFetch(() => getUserSettingsById(id));
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [showPasswordFields, setShowPasswordFields] = React.useState(false);
  const validationSchema = React.useCallback(
    () => createValidationSchema(showPasswordFields),
    [showPasswordFields],
  );
  function handleSubmit(values, { setSubmitting }) {
    setError(null);
    saveUserSettingsById(id, values)
      .then((response) => {
        setSuccess(response.data.message);
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const { canUpdateUsers } = usePermissions();
  const { clearMessages } = useAuth();

  React.useEffect(() => {
    clearMessages();
  }, []);

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, values }) => (
        <Form noValidate>
          <DangerAlert message={error} />
          <SuccessAlert message={success} onClose={() => setSuccess(null)} />
          <ListGroup>
            <ListGroup.Item className="p-4 pt-4">
              <h5 className="fw-bold mb-1">Account Information</h5>
              <p className="text-muted mb-3">View your basic account details</p>
              <Username value={values?.username} />
              <Email value={values?.email} />
              <BootstrapForm.Group className="p-2">
                <Row className="align-items-center">
                  <Col xs={4} md={4}>
                    <BootstrapForm.Label className="mb-0 fw-bold">
                      User Group
                    </BootstrapForm.Label>
                  </Col>
                  <Col xs={4} md={4}>
                    <BootstrapForm.Select
                      name="group_name"
                      value={values?.group_name || ""}
                      onChange={handleChange}
                      disabled={!canUpdateUsers}
                    >
                      <option value="">Select user group</option>
                      <option value="admin">Admin</option>
                      <option value="subadmin">Sub Admin</option>
                      <option value="members">Member</option>
                      <option value="guest">Guest</option>
                    </BootstrapForm.Select>
                  </Col>
                </Row>
              </BootstrapForm.Group>
            </ListGroup.Item>
            <ListGroup.Item className="p-4">
              <PersonalInformation disabled={!canUpdateUsers} />
            </ListGroup.Item>
            {canUpdateUsers && (
              <ListGroup.Item className="p-4">
                <PasswordChange
                  showPasswordFields={showPasswordFields}
                  setShowPasswordFields={setShowPasswordFields}
                />
              </ListGroup.Item>
            )}
          </ListGroup>
          <div className="d-flex justify-content-end gap-2 mt-2">
            {canUpdateUsers && (
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
