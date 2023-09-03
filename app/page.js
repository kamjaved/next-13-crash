'use client';

import Link from 'next/link';
import Courses from './components/Courses';
import { useEffect, useState } from 'react';
import LoadingPage from './loading';
import CourseSearch from './components/CourseSearch';

const HomePage = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourses = async () => {
			const res = await fetch('/api/courses');
			const data = await res.json();
			setCourses(data);
			setLoading(false);
		};

		fetchCourses();
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div>
			<h1>Welocme to Traversy Media</h1>
			<CourseSearch getSearchResults={(result) => setCourses(result)} />
			<Courses courses={courses} />
		</div>
	);
};

export default HomePage;
