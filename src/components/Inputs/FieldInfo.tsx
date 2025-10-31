import type { AnyFieldApi } from '@tanstack/react-form';

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<span className=" flex flex-col items-start w-full">
					{field.state.meta.errors.map((err) => (
						<span key={err.message} className="label text-error">
							{err.message}.
						</span>
					))}
				</span>
			) : null}
			{field.state.meta.isValidating ? <span className="w-full">Validating...</span> : null}
		</>
	);
}
