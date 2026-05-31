import { FC } from 'react';
import { Button, Form, Message, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SigninSchema } from '../../../validation-schemas/auth';
import Input from '../../../components/ui/Input';
import { authStore } from '../../../store/authStore';
import { signin } from '../../../services/auth';
import { useMutation } from 'react-query';
import { Sprout } from 'lucide-react';

const Signin: FC = () => {
	const { logIn } = authStore((store) => store);
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SigninSchema as any),
		mode: 'onBlur',
	});

	const { mutate: signinMutate, isLoading: isLoadingSignin, isError: isErrorSignin } = useMutation(signin);

	const handleChange = (e: any) => {
		e.persist();
		setValue(e.target.name, e.target.value);
		trigger(e.target.name);
	};

	const onSubmit = (values: any) => {
		signinMutate(values, {
			onSuccess(data: any) {
				logIn({
					...data.user,
					token: data.token,
					exp: data.exp,
					userId: data.user._id,
				});
				reset();
				navigate('/home');
			},
		});
	};

	return (
		<div className="auth-page">
			<div className="auth-card animate-fade-up">
				<div style={{ textAlign: 'center', marginBottom: '36px' }}>
					<div className="nav-brand-mark" style={{ margin: '0 auto 20px', width: 48, height: 48, borderRadius: 14 }}>
						<Sprout size={24} strokeWidth={2.5} />
					</div>
					<Header as="h2" className="font-display" style={{ margin: 0, fontSize: '1.75rem' }}>
						Welcome back
					</Header>
					<p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
						Sign in to continue your journey
					</p>
				</div>

				<Form onSubmit={handleSubmit(onSubmit)} size="large">
					<Input
						label="Username"
						placeholder="Enter your username"
						name="username"
						onBlur={handleChange}
						icon="user"
						iconPosition="left"
						error={errors.username}
					/>
					<Input
						label="Password"
						placeholder="Enter your password"
						name="password"
						type="password"
						onBlur={handleChange}
						icon="lock"
						iconPosition="left"
						error={errors.password}
					/>

					<Button
						primary
						fluid
						size="large"
						type="submit"
						loading={isLoadingSignin}
						content="Sign In"
						className="btn-primary"
						style={{ marginTop: '24px', padding: '15px' }}
					/>

					{isErrorSignin && (
						<Message
							icon="warning circle"
							negative
							header="Authentication Failed"
							content="Invalid username or password. Please try again."
							size="small"
							style={{ marginTop: '20px' }}
						/>
					)}
				</Form>

				<div
					style={{
						marginTop: '28px',
						paddingTop: '24px',
						borderTop: '1px solid var(--border-color)',
						textAlign: 'center',
						color: 'var(--text-secondary)',
						fontSize: '0.95rem',
					}}
				>
					Don't have an account?{' '}
					<span
						className="auth-link"
						onClick={() => navigate('/signup')}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === 'Enter' && navigate('/signup')}
					>
						Create an account
					</span>
				</div>
			</div>
		</div>
	);
};

export default Signin;
