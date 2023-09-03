import Repo from '@/app/components/Repo';
import RepoDirs from '@/app/components/RepoDirs';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import React, { Suspense } from 'react';

const RepoPage = ({ params: { name } }) => {
	return (
		<div className="card" ss>
			<Link href="/code/repos" className="btn btn-back">
				Back To Repositories
			</Link>

			<Suspense fallback={<div>Loading repo...</div>}>
				{/**inside fallback you can provide loader component */}
				<Repo name={name} />
			</Suspense>

			<Suspense
				fallback={
					<div>
						<LoadingPage />
					</div>
				}>
				<RepoDirs name={name} />
			</Suspense>
		</div>
	);
};

export default RepoPage;
