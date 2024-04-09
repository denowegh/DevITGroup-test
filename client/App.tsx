import React, { useEffect, useState } from 'react';

interface Response {
	index: number;
	status: number;
}

const RequestSender: React.FC = () => {
	const [concurrency, setConcurrency] = useState<string>('');
	const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
	const [responses, setResponses] = useState<Response[]>([]);

	const handleStart = async (): Promise<void> => {
		setButtonDisabled(true);
		setResponses([]);
		const maxConcurrency: number = parseInt(concurrency);
		const maxRequestsPerSecond: number = parseInt(concurrency);
		const delay: number = 1000 / maxRequestsPerSecond;
		const requests: Promise<Response>[] = [];

		for (let i = 1; i <= 1000; i++) {
			const request: Promise<Response> = fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ index: i }),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(response => ({ index: i, status: response.status }));

			requests.push(request);

			if (requests.length >= maxConcurrency) {
				const res = await Promise.all(requests);
				setResponses(s => [...s, ...res]);
				requests.length = 0;
			}

			await new Promise(resolve => setTimeout(resolve, delay));
		}

		await Promise.all(requests);

		setButtonDisabled(false);
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setter: React.Dispatch<React.SetStateAction<string>>
	): void => {
		const { value } = event.target;
		setter(value);
	};

	return (
		<div>
			<label>
				Concurrency Limit:
				<input
					type='number'
					min='0'
					max='100'
					value={concurrency}
					onChange={e => handleInputChange(e, setConcurrency)}
					required
				/>
			</label>
			<br />
			<button disabled={buttonDisabled} onClick={handleStart}>
				Start
			</button>
			<br />
			<ul>
				{responses.map((response: Response, index: number) => (
					<li key={index}>
						Request {response.index} - {response.status}
					</li>
				))}
			</ul>
		</div>
	);
};

export default RequestSender;
