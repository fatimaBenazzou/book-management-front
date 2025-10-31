import FieldInfo from './FieldInfo';
import type { AnyFieldApi } from '@tanstack/react-form';
function InputIcon({ icon }: { icon?: string | React.ReactNode }) {
	if (!icon) return null;
	if (typeof icon === 'string') {
		return <span className={`w-4 h-4 ${icon}`}></span>;
	}
	return icon;
}
export interface InputProps {
	field: AnyFieldApi;
	placeholder?: string;
	label: string;
	type: string;
	icons?: {
		left?: string | React.ReactNode;
		right?: string | React.ReactNode;
	};
}
export default function Input({
	field,
	placeholder,
	label,
	type,
	icons = { left: undefined, right: undefined },
}: InputProps) {
	return (
		<fieldset className="fieldset w-full">
			<legend className="fieldset-legend">{label}</legend>
			<label className="input w-full">
				<InputIcon icon={icons.left} />
				<input
					type={type}
					className="grow"
					placeholder={placeholder}
					name={field.name}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					value={field.state.value}
					required
				/>
				<InputIcon icon={icons.right} />
			</label>
			<FieldInfo field={field} />
		</fieldset>
	);
}
