# Canvas Gradepeek 

### A helpful chrome extension that gives you quick updates and shortcuts to *most commonly used* Canvas pages.

# Current Features

- Enrolled courses and link to course page
- To-do list with upcoming required submissions excluding Zoom (not featured on actual Canvas website)
- Time till the assignment is due with color coding
- Grade display with color coding
- *not tested very well* Works with any school using Canvas LMS, either self-hosted or Instructure

# Running Gradepeek

To run and build Gradepeek on your own, you must have [Node.js](https://nodejs.org/en/) installed, as well as the Chrome browser. 

1. Clone the repository - `git clone https://github.com/ulrokx/gradepeek.git`
2. Run `npm install` and let everything install
3. To build, run `npm run build`. The resulting folder will be in `dist/webext-prod`
4. To access your Canvas data, you must go to `Account > Settings > Approved Integrations > +New Access Token`
5. Take your key and enter it along with the base URL of your school's canvas site.
6. Save time and frustration :)

# Future
- Add landing page upon installation pre-enrollment to set up extension
- Add upcoming classes and zoom meetings for your schedule
- Support for Firefox
- *other schools that may not work with current api requests*


