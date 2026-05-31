import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Message, Header } from 'semantic-ui-react';
import { SignupSchema } from '../../../validation-schemas/auth';
import { useMutation } from 'react-query';
import { signup } from '../../../services/auth';
import { authStore } from '../../../store/authStore';
import Input from '../../../components/ui/Input';
import { Sprout } from 'lucide-react';

const Signup: FC = () => {
	const { logIn } = authStore((store) => store);
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SignupSchema as any),
		mode: 'onBlur',
	});

	const { mutate: signupMutate, isLoading: isLoadingSignup, isError: isErrorSignup } = useMutation(signup);

	const handleChange = (e: any) => {
		e.persist();
		setValue(e.target.name, e.target.value);
		trigger(e.target.name);
	};

	const onSubmit = (values: any) => {
		signupMutate(values, {
			onSuccess: (data) => {
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
						Join Habitry
					</Header>
					<p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
						Create an account to start tracking your goals
					</p>
				</div>

				<Form onSubmit={handleSubmit(onSubmit)} size="large">
					<Input
						label="Username"
						placeholder="Choose a username"
						name="username"
						onBlur={handleChange}
						icon="user"
						iconPosition="left"
						error={errors.username}
					/>
					<Input
						label="Full Name"
						placeholder="Enter your full name"
						name="fullName"
						onBlur={handleChange}
						icon="id card"
						iconPosition="left"
						error={errors.fullName}
					/>
					<Input
						label="Password"
						placeholder="Create a password"
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
						loading={isLoadingSignup}
						content="Sign Up"
						className="btn-primary"
						style={{ marginTop: '24px', padding: '15px' }}
					/>

					{isErrorSignup && (
						<Message
							icon="warning circle"
							negative
							header="Registration Failed"
							content="Username already exists. Please choose another."
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
					Already have an account?{' '}
					<span
						className="auth-link"
						onClick={() => navigate('/signin')}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === 'Enter' && navigate('/signin')}
					>
						Sign in instead
					</span>
				</div>
			</div>
		</div>
	);
};

export default Signup;
