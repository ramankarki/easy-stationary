import InputField from '../../components/InputField';

const AuthFormElements = ({ fields, TYPE }) =>
  Object.keys(fields).map((fieldName) => (
    <InputField
      key={fieldName}
      TYPE={TYPE}
      labelName={fieldName}
      dbProp={fields[fieldName].dbProp}
    />
  ));

export default AuthFormElements;
