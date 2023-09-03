const { NextResponse } = require('next/server');
import courses from './data.json';

export async function GET(request) {
	return NextResponse.json(courses);
}

export async function POST(request) {
	const { title, desc, level, link } = await request.json();

	const newCourse = {
		id: Date.now(),
		title,
		desc,
		level,
		link,
	};

	courses.push(newCourse);

	return NextResponse.json({ message: 'Course Created' });
}
