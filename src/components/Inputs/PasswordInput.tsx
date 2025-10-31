import { useState } from 'react';
import Input, { type InputProps } from '.';

export default function PasswordInput(
	props: Omit<InputProps, 'type'> & { type?: 'text' | 'password' }
) {
	const [inputType, setInputType] = useState<'text' | 'password'>(props.type || 'password');
	const icons = {
		left: props.icons?.left,
		right: (
			<button
				type="button"
				className="btn btn-ghost btn-xs btn-circle"
				onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
			>
				<span
					className={`${
						inputType === 'password'
							? 'icon-[heroicons--eye-slash]'
							: 'icon-[heroicons--eye]'
					} h-4 w-4`}
				></span>
			</button>
		),
	};
	return <Input {...props} type={inputType} icons={icons} />;
}
