import Link from 'next/link';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

async function fetchRepos() {
	const response = await fetch(
		'https://api.github.com/users/bradtraversy/repos',

		/* with this you are assuring after 60 second the data will be refetched. this is useful
     when data are changeing often */
		{
			next: {
				revalidate: 60,
			},
		}
	);

	await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

	const repos = await response.json();
	return repos;
}

const ReposPage = async () => {
	const repos = await fetchRepos();

	return (
		<div className="repos-container">
			<h2>Repositories</h2>
			<ul className="repo-list">
				{repos.map((repo) => (
					<li key={repo.id}>
						<Link href={`/code/repos/${repo.name}`}>
							<h3>{repo.name}</h3>
							<p>{repo.description}</p>
							<div className="repo-details">
								<span>
									<FaStar color="orange" /> {repo.stargazers_count}
								</span>
								<span>
									<FaCodeBranch color="green" /> {repo.forks_count}
								</span>
								<span>
									<FaEye color="red" /> {repo.watchers_count}
								</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
export default ReposPage;
