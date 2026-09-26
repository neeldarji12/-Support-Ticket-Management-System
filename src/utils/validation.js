export const validateTicketForm = (values) => {
  const errors = {};

  if (!values.subject || !values.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (values.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (values.subject.trim().length > 150) {
    errors.subject = 'Subject cannot exceed 150 characters';
  }

  if (!values.description || !values.description.trim()) {
    errors.description = 'Description is required';
  } else if (values.description.trim().length < 10) {
    errors.description = 'Please provide more details (minimum 10 characters)';
  }

  if (!values.priority) {
    errors.priority = 'Priority selection is required';
  } else if (!['Low', 'Medium', 'High'].includes(values.priority)) {
    errors.priority = 'Invalid priority selected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = 'Email address is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'Password must be at least 4 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
