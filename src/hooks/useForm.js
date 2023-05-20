import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	const isFormValid = useMemo(() => {
		for (const formField of Object.keys(formValidation)) {
			if (formValidation[formField] !== null) return false;
		}
		return true;
	}, [formValidation]);

	useEffect(() => {
		createValidators();
	}, [formState]);

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const createValidators = () => {
		const formCheckValues = {};

		for (const formField of Object.keys(formValidations)) {
			const [validationFunction, errorMessage] =
				formValidations[formField];

			formCheckValues[`${formField}Valid`] = validationFunction(
				formState[formField]
			)
				? null
				: errorMessage;
		}
		setFormValidation(formCheckValues);
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	};
};
