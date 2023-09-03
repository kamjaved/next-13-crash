const { NextResponse } = require('next/server');
import courses from '../data.json';

export async function GET(request) {
	// request.url contain the hitted url with query

	const { searchParams } = new URL(request.url);
	/*  and to get perticular query for ex below URL consist 2 query name & level you have to use  "get" method from searchParams with query name
   http://localhost:3000/api/courses/search?name=react&level=intermediate.  */

	const query = searchParams.get('name');

	const filteredCourses = courses.filter((course) => {
		return course.title.toLowerCase().includes(query.toLowerCase());
	});
	return NextResponse.json(filteredCourses);
}
