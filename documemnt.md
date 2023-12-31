##### Source: [Youutbe NextJS-13 Crash Course Traversy](https://www.youtube.com/watch?v=Y6KDk5iyrYE&t=122s&ab_channel=TraversyMedia 'Youutbe NextJS-13 Crash Course Traversy')

##### Blog: [Blog Post Nextjs13 ](https://www.traversymedia.com/blog/next-js-13-crash-course 'Blog Post Nextjs13 ')

**1-** Page title can be change from here and you cna also add some keywords and desc which can help to improve SEO.

```javascript
export const metadata = {
	title: 'NextJS 13 Course',
	description: 'Generated by create next app',
	keywords:
		'web development, web design, javascript, react, node, angular, vue, html, css',
};
```

<br/>

**2-** `layout.jsx` or `layout.js` is used to set Page Layout if you want to create your oiwn specific layout then you can create by going into some directory like for demo i created inside `about` dir

<br/>

**3-** In Nextjs 13 you can import google font directly into `layout.js` and applied to whole body rather than importing into any css file in traditional way

```javascript
// importing font
Import { Poppins } from 'next/font/google';

// specfiying subsests and weights
const poppins = Poppins({
	weight: ['100', '300', '400', '600'],
	subsets: ['latin'],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
           <!-- font applied here-->
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
```

<br/>

**4-** By default when you create any component in Nextjs 13 it will treated as RCS (React Server Component) to make it client component you have to use 'use client'; at top of the component. **Remember:** if you log `console` in RSC it will log into terminal windows not on browser windows as it is server component.

```javascript
'use client';  // you have to write in top of the file
import Link from 'next/link';
import { useState } from 'react';

export deafult Header = () => {
	return (
		<header className="header">
		)
}
```

**Advantages of RSC:**

-  Load faster - Don't have to wait for the JavaScript to load
-  Smaller client bundle size
-  SEO friendly
-  Access to resources the client can't access
-  Hide sensitive data from the client
-  More secure against XSS attacks
-  Improved developer experience

**Disadvantage**:

-  Not as interactive
-  No component state. We can not use the useState hook.
-  No component lifecycle methods. We can not use the useEffect hook.

<br/>

**5-** By default you can create a `loading.js` file in the app directory and on same level as `layout.js `this special file `loading.js` will help you to create meaningful loader in your UI.
no neeed to import anywhere just create you file and it will automatically show the loading on UI.

**Remember:** this will work only for RSC.not for client pages or component for client component or pages you have to manually import & handle the Loader.

for more detail [click here](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming 'click here')

[![Directory Level](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-special-file.png&w=1920&q=75&dpl=dpl_4HJV8aqrHUUR6oi4EEj5ndJ7UpsS 'Directory Level')](http://https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-special-file.png&w=1920&q=75&dpl=dpl_4HJV8aqrHUUR6oi4EEj5ndJ7UpsS 'Directory Level')

<br/>

**6-** **Suspense & Streaming**: in our codebase `code/[name]/page.jsx` you will find we have using or say created a Suspense Boundries

```javascript

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
```

**Streaming** allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client. This enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered.
to handle all of this streaming we use `<Suspnese>`

**`<Suspense>`** works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.

What the above code is doing when its loads it have the `<Repo>` data. but for `<RepoDirs>` is again calling ans async action which causing delay if we not use suspense boundries then even if our `<Repo>` components is ready it can't be displayed bcz `<RepoDirs>` is loading so we wrapped all this on Suspense now you will see only the content which is not loaded i.e `<RepoDirs>` are showing loaders.

<br/>

**7-** **Fetching & Caching**: in our codebase `code/repos/page.jsx` you will find we created object inside `fetch` method which is not looking right. dont worry NexJS extends the native `fetch Web API` to allow you to configure the caching and revalidating behavior for each fetch request on the server. React extends fetch to automatically memoize fetch requests while rendering a React component tree.

[Learn more about caching & revalidating ](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating 'Learn more about caching & revalidating ')

```javascript
async function fetchRepos() {
	const response = await fetch(
		'https://api.github.com/users/bradtraversy/repos',

		/* with this you are assuring after 60 second the data will be refetched. this is useful when data are changeing often */
		{
			next: {
				revalidate: 60,
			},
		}
	);

```

<br/>

**8-** **Route Handler API**:In Nextjs 13 you will find api folder inside `app` or sometimes maybe on `pages` folder. any folder you crate inside `api` dir it will automatically create route handler for this it work very similar like page route handler inside app dir like `app/about`

for fethcing data we used data.json file where some courses data is present and `NextResponse` is used to get data as response

```javascript
const { NextResponse } = require('next/server');
import courses from './data.json';

export async function GET(request) {
	return NextResponse.json(courses);
}
```

**For Query Prams**: we create a folder called search in the `api/courses` folder and create a new file called `route.js`.

we are using the below URL as example it have 2 query `name` & `level`:

`http://localhost:3000/api/courses/search?name=react&level=intermediate`

So to get particular query like `name` you have to use "get" method from searchParams with query name

```javascript
const { NextResponse } = require('next/server');
import courses from '../data.json';

export async function GET(request) {
	// request.url contain exact hitted url
	const { searchParams } = new URL(request.url);

	const query = searchParams.get('name');
	const filteredCourses = courses.filter((course) =>
		course.title.toLowerCase().includes(query.toLowerCase())
	);

	return NextResponse.json(filteredCourses);
}
```
