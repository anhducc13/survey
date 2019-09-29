// Created by thanhpd on 9/24/2019
// @flow

import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Form, Input, Select } from 'antd';

const { Option } = Select;

type PropsT = {
  label: string,
  name: string,
  value: string,
  reset: Function,
  onChange: Function,
  errors: [string],
  setErrors: Function,
  pristine: boolean,
  validating: boolean,
  validate: Function,
  formSubmitted: boolean,
  required: boolean,
  extra: Object,
  type: 'text' | 'checkbox',
};

export const InputEvent = {
  ON_BLUR: 0,
  ON_CHANGE: 1,
};

export const useField = (
  name,
  form,
  {
    defaultValue,
    validations = [],
    whenValidate = [InputEvent.ON_CHANGE],
  } = {},
  extra = {},
) => {
  const [value, setValue] = useState(defaultValue);
  const [errors, setErrors] = useState([]);
  const [pristine, setPristine] = useState(true);
  const [validating, setValidating] = useState(false);
  const validateCounter = useRef(0);

  const reset = () => {
    setValue(defaultValue);
    setPristine(true);
    setErrors([]);
  };

  const validate = async () => {
    // eslint-disable-next-line no-plusplus
    const validateIteration = ++validateCounter.current;
    setValidating(true);
    const formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name)),
    );
    errorMessages = errorMessages.filter(errorMsg => !!errorMsg);
    if (validateIteration === validateCounter.current) {
      // this is the most recent invocation
      setErrors(errorMessages);
      setValidating(false);
    }
    return errorMessages.length === 0;
  };

  useEffect(() => {
    if (pristine) return; // Avoid validate on mount
    if (whenValidate.includes(InputEvent.ON_CHANGE)) {
      form.validateFields([name]);
    }
  }, [value]);

  const onChange = v => {
    if (pristine) {
      setPristine(false);
    }
    setValue(v);
  };
  const onBlur = () => {
    if (whenValidate.includes(InputEvent.ON_BLUR)) {
      form.validateFields([name]);
    }
  };
  const field = {
    name,
    value,
    errors,
    setErrors,
    pristine,
    onChange,
    onBlur,
    validate,
    reset,
    validating,
    extra,
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fields = [];

  const reset = () => {
    fields.map(f => {
      f.reset();
      return f;
    });
  };
  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (fieldNames instanceof Array) {
      fieldsToValidate = fields.filter(field =>
        fieldNames.includes(field.name),
      );
    } else {
      // if fieldNames not provided, validate all fields
      fieldsToValidate = fields;
    }
    const fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate()),
    );
    return fieldsValid.every(isValid => isValid === true);
  };

  const getFormData = () => {
    return fields.reduce(
      (formData, f) => ({ ...formData, [f.name]: f.value }),
      {},
    );
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true); // User has attempted to submit form at least once
      const formValid = await validateFields();
      const returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.every(f => f.errors.length === 0),
    addField: field => fields.push(field),
    getFormData,
    validateFields,
    submitted,
    reset,
    submitting,
  };
};

export const Field = ({
  label,
  required,
  name,
  value,
  onChange,
  errors,
  pristine,
  validating,
  validate,
  formSubmitted,
  type,
  extra,
}: PropsT) => {
  const showErrors = (!pristine || formSubmitted) && !!errors.length;
  const validateStatus = validating
    ? 'validating'
    : showErrors
    ? 'error'
    : null;
  switch (type) {
    case 'checkbox': {
      const { itemProps, checkboxProps } = extra;
      return (
        <Form.Item {...itemProps}>
          <Checkbox
            {...checkboxProps}
            onChange={e => onChange(e.target.checked)}
            checked={value}
          >
            {label}
          </Checkbox>
        </Form.Item>
      );
    }
    case 'select': {
      const { itemProps, selectProps, options } = extra;
      return (
        <Form.Item {...itemProps} label={label}>
          <Select id={name} value={value} onChange={onChange} {...selectProps}>
            {options.map(({ title, value: optionValue }) => {
              return (
                <Option key={optionValue} value={optionValue}>
                  {title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    }
    default:
      // eslint-disable-next-line no-case-declarations
      const { itemProps, inputProps } = extra;
      return (
        <Form.Item
          label={label}
          required={required}
          help={showErrors ? errors[0] : null}
          validateStatus={validateStatus}
          {...itemProps}
        >
          <Input
            id={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={() => !pristine && validate()}
            {...inputProps}
          />
        </Form.Item>
      );
  }
};
